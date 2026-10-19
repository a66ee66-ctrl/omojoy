import { serviceOptions, site, type ServiceValue } from "@/config/site";
import { getLook } from "@/content/portfolio";

/** A `mailto:` link to the studio, with an optional pre-filled subject and body. */
export function mailto({
  subject,
  body,
}: { subject?: string; body?: string } = {}) {
  const to = site.contact.email ?? "";
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${to}${query ? `?${query}` : ""}`;
}

const serviceLabel = (v: string) =>
  serviceOptions.find((s) => s.value === v)?.label ?? v;

/** Enquiry mailto for one or more services, e.g. from a service page or "book a session" CTA. */
export function serviceEnquiryMailto(values: ServiceValue[] | ServiceValue) {
  const list = Array.isArray(values) ? values : [values];
  const subject = `Enquiry: ${list.map(serviceLabel).join(" & ")}`;
  const body = `Hi ${site.owner},\n\nI'd love to enquire about ${list.map(serviceLabel).join(" and ").toLowerCase()}.\n\n[Tell us about your occasion, preferred date and anything else we should know]\n\nThanks!`;
  return mailto({ subject, body });
}

/** Enquiry mailto for a set of portfolio looks (one look, a moodboard, or quiz results). */
export function looksEnquiryMailto(
  slugs: string[],
  subject = "Enquiry: Looks I love",
) {
  const lines = slugs
    .map((slug) => getLook(slug))
    .filter((l) => l !== undefined)
    .map((l) => `- ${l.title}: ${site.url}/portfolio/${l.slug}`);
  const body =
    `Hi ${site.owner},\n\nI'd love to enquire about the following look${slugs.length === 1 ? "" : "s"}:\n\n${lines.join("\n")}` +
    `\n\n[Tell us about your occasion, preferred date and anything else we should know]\n\nThanks!`;
  return mailto({ subject, body });
}
