"use client";

import { usePathname } from "next/navigation";

/** The footer's closing invitation, hidden on the contact page where it would repeat the page heading. */
export function FooterInvite({ children }: { children: React.ReactNode }) {
  return usePathname() === "/contact" ? null : <>{children}</>;
}
