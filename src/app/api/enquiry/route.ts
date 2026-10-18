import { serviceOptions, site } from "@/config/site";
import { getLook } from "@/content/portfolio";
import {
  enquirySchema,
  firstErrors,
  type Enquiry,
  type EnquiryResponse,
} from "@/lib/enquiry-schema";

const MAX_BODY_BYTES = 10_000;
const MIN_FILL_MS = 3_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60_000 };

// Best-effort, per-instance limiter. For multi-instance deployments, back this with
// a shared store (e.g. Upstash/Redis) or the hosting platform's firewall rules.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

const json = (body: EnquiryResponse, status = 200) =>
  Response.json(body, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false, error: "bad_request" }, 403);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES)
    return json({ ok: false, error: "bad_request" }, 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Spam protection: hidden honeypot field and minimum time-to-complete.
  // Bots receive a normal-looking response so they don't adapt; nothing is sent.
  const startedAt = Number(body.startedAt);
  if (body.website || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "validation",
        fieldErrors: firstErrors(parsed.error),
      },
      422,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL || site.contact.email;
  if (!apiKey || !from || !to) {
    console.error(
      "[enquiry] Email delivery is not configured: set RESEND_API_KEY, ENQUIRY_FROM_EMAIL and ENQUIRY_TO_EMAIL.",
    );
    return json({ ok: false, error: "not_configured" }, 503);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: parsed.data.email,
      subject: `New enquiry: ${serviceList(parsed.data)} — ${parsed.data.name}`,
      text: renderText(parsed.data),
      html: renderHtml(parsed.data),
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch((error: unknown) => {
    console.error("[enquiry] Email request failed:", error);
    return null;
  });

  if (!res?.ok) {
    if (res)
      console.error(
        "[enquiry] Email provider error:",
        res.status,
        await res.text(),
      );
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}

const serviceList = (e: Enquiry) =>
  e.services
    .map((v) => serviceOptions.find((s) => s.value === v)?.label ?? v)
    .join(", ");

function rows(e: Enquiry): [string, string][] {
  return [
    ["Name", e.name],
    ["Email", e.email],
    ["Phone", e.phone || "—"],
    ["Services", serviceList(e)],
    ["Preferred date", e.date || "—"],
  ];
}

const lookLinks = (e: Enquiry) =>
  e.looks.map((slug) => ({
    title: getLook(slug)?.title ?? slug,
    url: `${site.url}/portfolio/${slug}`,
  }));

const renderText = (e: Enquiry) =>
  `${rows(e)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}\n\nMessage:\n${e.message}\n` +
  (e.looks.length
    ? `\nLooks they love:\n${lookLinks(e)
        .map((l) => `- ${l.title}: ${l.url}`)
        .join("\n")}\n`
    : "");

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

const renderHtml = (e: Enquiry) => `
<div style="font-family:Georgia,serif;color:#2b211c;max-width:560px">
  <h2 style="font-weight:normal;font-style:italic">New enquiry from the website</h2>
  <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">
    ${rows(e)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 0;border-bottom:1px solid #e4d6c3;color:#6b5a4f;width:140px">${k}</td><td style="padding:8px 0;border-bottom:1px solid #e4d6c3">${escape(v)}</td></tr>`,
      )
      .join("")}
  </table>
  <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;margin-top:20px">${escape(e.message)}</p>
  ${
    e.looks.length
      ? `<p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6b5a4f;margin-top:24px">Looks they love</p><ul style="font-family:Arial,sans-serif;font-size:14px;line-height:1.8;padding-left:18px">${lookLinks(
          e,
        )
          .map(
            (l) =>
              `<li><a href="${escape(l.url)}" style="color:#8f5f54">${escape(l.title)}</a></li>`,
          )
          .join("")}</ul>`
      : ""
  }
  <p style="font-family:Arial,sans-serif;font-size:12px;color:#6b5a4f">Reply to this email to respond directly to ${escape(e.name)}.</p>
</div>`;
