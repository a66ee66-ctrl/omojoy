import { cacheLife } from "next/cache";

import { looks } from "@/content/portfolio";

const TIME_ZONE = "America/Los_Angeles";

/** Deterministic shuffle so consecutive days show contrasting looks. */
function seededOrder(seed: number) {
  const order = looks.map((_, i) => i);
  let s = seed;
  for (let i = order.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Today's featured look, changing at midnight in Beaverton, Oregon.
 * Cached for an hour so the page stays static between changes.
 */
export async function getLookOfTheDay() {
  "use cache";
  cacheLife("hours");

  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const day = Math.floor(Date.parse(`${parts}T00:00:00Z`) / 86_400_000);
  const cycle = Math.floor(day / looks.length);
  const look = looks[seededOrder(cycle + 7)[day % looks.length]];
  const label = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, weekday: "long", month: "long", day: "numeric" }).format(now);

  return { look, label, day };
}
