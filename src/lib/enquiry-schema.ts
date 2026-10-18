import { z } from "zod";

import { serviceOptions } from "@/config/site";
import { isLookSlug } from "@/content/portfolio";

const serviceValues = serviceOptions.map((s) => s.value) as [
  string,
  ...string[],
];

/** Shared by the enquiry form (client) and the /api/enquiry route (server). */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Please keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .max(200)
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(30, "Please check your phone number.")
    .refine(
      (v) => v === "" || /^[+\d\s().-]{7,}$/.test(v),
      "Please enter a valid phone number, or leave it blank.",
    )
    .optional()
    .default(""),
  services: z
    .array(z.enum(serviceValues))
    .min(1, "Please choose at least one service.")
    .max(serviceValues.length),
  date: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v),
      "Please choose a valid date.",
    )
    .refine((v) => {
      if (v === "") return true;
      // Allow one day of leeway for time-zone differences between client and server.
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return new Date(`${v}T23:59:59`) >= yesterday;
    }, "Please choose a date in the future.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(3000, "Please keep your message under 3,000 characters."),
  /** Looks from the portfolio the client loves (from their moodboard or a look page). */
  looks: z
    .array(z.string().refine(isLookSlug, "Unknown look."))
    .max(24, "Please attach up to 24 looks.")
    .optional()
    .default([]),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
export type EnquiryField = keyof EnquiryInput;

export type EnquiryResponse =
  | { ok: true }
  | {
      ok: false;
      error: "validation";
      fieldErrors: Partial<Record<EnquiryField, string>>;
    }
  | {
      ok: false;
      error: "not_configured" | "rate_limited" | "send_failed" | "bad_request";
    };

export function firstErrors(
  error: z.ZodError,
): Partial<Record<EnquiryField, string>> {
  const out: Partial<Record<EnquiryField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as EnquiryField;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
