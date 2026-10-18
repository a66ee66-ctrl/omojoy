"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Heart, Loader2, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serviceOptions, site, type ServiceValue } from "@/config/site";
import {
  enquirySchema,
  firstErrors,
  type EnquiryField,
  type EnquiryInput,
  type EnquiryResponse,
} from "@/lib/enquiry-schema";
import { getLook, isLookSlug } from "@/content/portfolio";
import { useMoodboard } from "@/lib/moodboard";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const empty: EnquiryInput = {
  name: "",
  email: "",
  phone: "",
  services: [],
  date: "",
  message: "",
  looks: [],
};

const errorCopy: Record<string, string> = {
  not_configured: "Online enquiries aren’t available just yet.",
  rate_limited:
    "You’ve sent several enquiries in a short time. Please wait a few minutes and try again.",
  send_failed:
    "Your message couldn’t be delivered just now. Please try again in a moment.",
  network:
    "We couldn’t reach the server. Please check your connection and try again.",
  bad_request:
    "Something went wrong with your submission. Please refresh the page and try again.",
};

const fieldClass =
  "h-12 rounded-none border-0 border-b border-espresso/25 bg-transparent px-0 text-[1rem] shadow-none transition-colors placeholder:text-taupe/70 focus-visible:border-b-rose-deep focus-visible:ring-0 aria-invalid:border-b-destructive aria-invalid:ring-0 md:text-[1rem]";

const serviceValues = serviceOptions.map((s) => s.value) as string[];

/** Pre-fill from links such as /contact?service=makeup,hair&look=golden-glam */
function initialValues(params: URLSearchParams): EnquiryInput {
  const list = (key: string) =>
    (params.get(key) ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return {
    ...empty,
    services: list("service").filter((s): s is ServiceValue =>
      serviceValues.includes(s),
    ),
    looks: [...new Set([...list("look"), ...list("looks")])]
      .filter(isLookSlug)
      .slice(0, 24),
  };
}

export function EnquiryForm() {
  const params = useSearchParams();
  const saved = useMoodboard();
  const [values, setValues] = useState<EnquiryInput>(() =>
    initialValues(params),
  );
  const [errors, setErrors] = useState<Partial<Record<EnquiryField, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = <K extends EnquiryField>(key: K, value: EnquiryInput[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) {
      const result = enquirySchema.safeParse(next);
      setErrors(result.success ? {} : firstErrors(result.error));
    }
  };

  const toggleService = (value: ServiceValue, checked: boolean) => {
    const current = values.services ?? [];
    update(
      "services",
      checked ? [...current, value] : current.filter((s) => s !== value),
    );
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    setServerError(null);

    const result = enquirySchema.safeParse(values);
    if (!result.success) {
      const errs = firstErrors(result.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[data-field="${first}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    const honeypot = (
      formRef.current?.elements.namedItem("website") as HTMLInputElement | null
    )?.value;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          website: honeypot,
          startedAt: startedAt.current,
        }),
      });
      const data = (await res
        .json()
        .catch(() => ({ ok: false, error: "send_failed" }))) as EnquiryResponse;
      if (data.ok) {
        setStatus("success");
        setValues(empty);
        setAttempted(false);
        setErrors({});
        return;
      }
      if (data.error === "validation") setErrors(data.fieldErrors);
      setServerError(
        data.error === "validation"
          ? "Please check the highlighted fields."
          : errorCopy[data.error],
      );
      setStatus("error");
    } catch {
      setServerError(errorCopy.network);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[32rem] flex-col items-start justify-center border border-border bg-cream/60 p-8 outline-none sm:p-12"
      >
        <span className="grid size-14 place-items-center rounded-full border border-rose-deep text-rose-deep">
          <Check aria-hidden className="size-6" />
        </span>
        <h3 className="display mt-8 text-[2.6rem]">
          Thank you —{" "}
          <em className="text-rose-deep">your enquiry is on its way.</em>
        </h3>
        <p className="mt-5 max-w-md leading-[1.8] text-cocoa">
          {site.owner} will be in touch by email as soon as possible. In the
          meantime, you can see the latest work on Instagram.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              startedAt.current = Date.now();
              setStatus("idle");
            }}
            className={buttonVariants({
              variant: "brand-outline",
              size: "cta",
            })}
          >
            Send another enquiry
          </button>
          <a
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "brand", size: "cta" })}
          >
            View Instagram
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";
  const describedBy = (f: EnquiryField, extra?: string) =>
    [errors[f] ? `${f}-error` : null, extra].filter(Boolean).join(" ") ||
    undefined;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="form-note"
      className="space-y-10"
    >
      <div className="grid gap-10 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <Input
            id="name"
            data-field="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            aria-required
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="Email address" error={errors.email}>
          <Input
            id="email"
            data-field="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            aria-required
            className={fieldClass}
          />
        </Field>
        <Field id="phone" label="Phone number" optional error={errors.phone}>
          <Input
            id="phone"
            data-field="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={fieldClass}
          />
        </Field>
        <Field id="date" label="Preferred date" optional error={errors.date}>
          <Input
            id="date"
            data-field="date"
            name="date"
            type="date"
            // Set on interaction (not render) so a prerendered page never carries a stale date.
            onFocus={(e) => (e.currentTarget.min = localToday())}
            onPointerDown={(e) => (e.currentTarget.min = localToday())}
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={describedBy("date")}
            className={cn(
              fieldClass,
              "[&::-webkit-calendar-picker-indicator]:opacity-60",
            )}
          />
        </Field>
      </div>

      <fieldset
        aria-describedby={describedBy("services", "services-hint")}
        aria-invalid={!!errors.services}
      >
        <legend className="eyebrow text-[0.66rem] text-espresso">
          Service required
        </legend>
        <p id="services-hint" className="mt-2 text-[0.82rem] text-taupe">
          Choose one or more.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {serviceOptions.map((s, i) => {
            const checked = values.services?.includes(s.value) ?? false;
            return (
              <label
                key={s.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border px-4 py-4 text-[0.95rem] transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rose-deep",
                  checked
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-espresso/20 hover:border-espresso/60",
                  errors.services && !checked && "border-destructive/60",
                )}
              >
                <Checkbox
                  data-field={i === 0 ? "services" : undefined}
                  name="services"
                  value={s.value}
                  checked={checked}
                  onCheckedChange={(c) => toggleService(s.value, c)}
                  className={cn(
                    "rounded-none",
                    checked &&
                      "border-ivory bg-ivory text-espresso data-checked:border-ivory data-checked:bg-ivory data-checked:text-espresso",
                  )}
                />
                {s.label}
              </label>
            );
          })}
        </div>
        <FieldError id="services-error" message={errors.services} />
      </fieldset>

      <LooksPicker
        looks={values.looks ?? []}
        saved={saved}
        onChange={(looks) => update("looks", looks)}
        error={errors.looks}
      />

      <Field id="message" label="Message" error={errors.message}>
        <Textarea
          id="message"
          data-field="message"
          name="message"
          rows={5}
          placeholder="Tell us about your occasion, the look you have in mind and anything else we should know."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          aria-required
          className={cn(fieldClass, "min-h-32 resize-y py-3 leading-relaxed")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {serverError && (
        <div
          role="alert"
          className="border-l-2 border-destructive bg-destructive/5 px-5 py-4 text-[0.92rem] leading-relaxed"
        >
          <p className="font-medium text-destructive">{serverError}</p>
          {(site.contact.email || site.contact.phone) && (
            <p className="mt-1 text-cocoa">
              You can also reach {site.owner} directly
              {site.contact.email && (
                <>
                  {" "}
                  at{" "}
                  <a
                    className="underline underline-offset-4"
                    href={`mailto:${site.contact.email}`}
                  >
                    {site.contact.email}
                  </a>
                </>
              )}
              {site.contact.phone && (
                <>
                  {site.contact.email ? " or " : " on "}
                  <a
                    className="underline underline-offset-4"
                    href={`tel:${site.contact.phoneHref}`}
                  >
                    {site.contact.phone}
                  </a>
                </>
              )}
              .
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p
          id="form-note"
          className="max-w-sm text-[0.8rem] leading-relaxed text-taupe"
        >
          Your details are used only to respond to your enquiry. Sending an
          enquiry doesn’t confirm a booking.
        </p>
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className={cn(
            buttonVariants({ variant: "brand", size: "cta" }),
            "min-w-56 disabled:opacity-80",
          )}
        >
          {submitting ? (
            <>
              <Loader2 aria-hidden className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRight
                aria-hidden
                className="transition-transform duration-500 group-hover/button:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/** Looks attached to the enquiry, with a one-tap option to add the visitor's moodboard. */
function LooksPicker({
  looks,
  saved,
  onChange,
  error,
}: {
  looks: string[];
  saved: string[];
  onChange: (looks: string[]) => void;
  error?: string;
}) {
  const unattached = saved.filter((s) => !looks.includes(s));
  if (looks.length === 0 && saved.length === 0) return null;

  return (
    <div>
      <p className="eyebrow text-[0.66rem] text-espresso">Looks you love</p>
      <p className="mt-2 text-[0.82rem] text-taupe">
        {looks.length
          ? "These looks will be shared with your enquiry."
          : "Share your saved looks to help us understand your style."}
      </p>
      {looks.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-3">
          {looks.map((slug) => {
            const look = getLook(slug);
            if (!look) return null;
            return (
              <li key={slug} className="group relative">
                <div className="relative size-20 overflow-hidden bg-sand">
                  <Image
                    src={look.image}
                    alt={look.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onChange(looks.filter((l) => l !== slug))}
                  aria-label={`Remove “${look.title}” from your enquiry`}
                  className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-espresso text-ivory"
                >
                  <X aria-hidden className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {unattached.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([...looks, ...unattached].slice(0, 24))}
          className="mt-5 inline-flex h-11 items-center gap-2.5 rounded-full border border-espresso/25 px-5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-colors hover:border-espresso"
        >
          <Heart aria-hidden className="size-4 fill-rose-deep text-rose-deep" />
          {looks.length
            ? `Add ${unattached.length} more from my moodboard`
            : `Attach my moodboard (${unattached.length})`}
        </button>
      )}
      <FieldError id="looks-error" message={error} />
    </div>
  );
}

function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: EnquiryField;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label
        htmlFor={id}
        className="eyebrow gap-2 text-[0.66rem] text-espresso"
      >
        {label}
        {optional && (
          <span className="font-sans text-[0.62rem] font-normal tracking-normal text-taupe normal-case">
            (optional)
          </span>
        )}
      </Label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p
      id={id}
      className={cn(
        "text-[0.82rem] text-destructive",
        message ? "mt-2" : "sr-only",
      )}
      aria-live="polite"
    >
      {message}
    </p>
  );
}
