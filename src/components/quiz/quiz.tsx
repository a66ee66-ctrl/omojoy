"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  RotateCcw,
} from "lucide-react";

import { LookCard } from "@/components/looks/look-card";
import { buttonVariants } from "@/components/ui/button";
import type { ServiceValue } from "@/config/site";
import { collectionName, getCollection } from "@/content/collections";
import {
  byId,
  looks,
  type CollectionSlug,
  type Look,
  type Mood,
  type Occasion,
} from "@/content/portfolio";
import { looksEnquiryMailto } from "@/lib/mailto";
import { moodboard, useMoodboard } from "@/lib/moodboard";
import { cn } from "@/lib/utils";

type Option<T extends string> = {
  value: T;
  label: string;
  hint: string;
  look: Look;
};

const occasions: Option<Occasion>[] = [
  {
    value: "wedding",
    label: "A wedding",
    hint: "Bridal & bridal party",
    look: byId("pearl-updo"),
  },
  {
    value: "celebration",
    label: "A celebration",
    hint: "Birthdays, proposals & parties",
    look: byId("forty"),
  },
  {
    value: "maternity",
    label: "A baby on the way",
    hint: "Maternity & family",
    look: byId("maternity-butterfly"),
  },
  {
    value: "portrait",
    label: "Just because",
    hint: "A portrait session for me",
    look: byId("glass-block"),
  },
];

const moods: Option<Mood>[] = [
  {
    value: "soft",
    label: "Soft & natural",
    hint: "Radiant, fresh, effortless",
    look: byId("soft-glam"),
  },
  {
    value: "glam",
    label: "Radiant glam",
    hint: "Sculpted, luminous, polished",
    look: byId("golden-glam"),
  },
  {
    value: "bold",
    label: "Bold & dramatic",
    hint: "Colour, contrast, presence",
    look: byId("classic-red"),
  },
  {
    value: "heritage",
    label: "Rooted in heritage",
    hint: "Gele, coral & gold",
    look: byId("gold-gele-coral"),
  },
  {
    value: "timeless",
    label: "Classic & timeless",
    hint: "Elegant, monochrome, refined",
    look: byId("marble"),
  },
];

const crafts: Option<ServiceValue>[] = [
  {
    value: "makeup",
    label: "Makeup",
    hint: "Your look, perfected",
    look: byId("rose-shimmer"),
  },
  {
    value: "hair",
    label: "Hair styling",
    hint: "Your crown, shaped",
    look: byId("copper-curls"),
  },
  {
    value: "photography",
    label: "Photography",
    hint: "Your moment, kept",
    look: byId("the-proposal"),
  },
];

const collectionFor: Record<Occasion | Mood, CollectionSlug> = {
  wedding: "bridal",
  celebration: "milestones",
  maternity: "maternity",
  portrait: "studio",
  heritage: "heritage",
  glam: "glam",
  bold: "glam",
  soft: "crowned",
  timeless: "studio",
};

function curate(o: Occasion, m: Mood, c: ServiceValue[]) {
  return looks
    .map((l) => ({
      l,
      score:
        (l.occasions.includes(o) ? 4 : 0) +
        (l.moods.includes(m) ? 3 : 0) +
        l.categories.filter((cat) => c.includes(cat)).length * 2,
    }))
    .filter((x) => x.score >= 4)
    .sort((a, b) => b.score - a.score || a.l.no - b.l.no)
    .slice(0, 9)
    .map((x) => x.l);
}

export function Quiz() {
  const params = useSearchParams();
  const initial = {
    o: occasions.find((x) => x.value === params.get("o"))?.value,
    m: moods.find((x) => x.value === params.get("m"))?.value,
    c: (params.get("c") ?? "")
      .split(",")
      .filter((v): v is ServiceValue => crafts.some((x) => x.value === v)),
  };
  const complete = !!(initial.o && initial.m && initial.c.length);
  const [step, setStep] = useState(complete ? 3 : 0);
  const [occasion, setOccasion] = useState<Occasion | undefined>(initial.o);
  const [mood, setMood] = useState<Mood | undefined>(initial.m);
  const [craft, setCraft] = useState<ServiceValue[]>(initial.c);
  const saved = useMoodboard();
  const top = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () =>
      occasion && mood && craft.length ? curate(occasion, mood, craft) : [],
    [occasion, mood, craft],
  );

  const go = (next: number) => {
    setStep(next);
    if (next === 3 && occasion && mood) {
      // Make the edit shareable and bookmarkable without a navigation.
      history.replaceState(
        null,
        "",
        `/find-your-look?o=${occasion}&m=${mood}&c=${craft.join(",")}`,
      );
    }
    top.current?.scrollIntoView({ block: "start" });
  };

  const restart = () => {
    setOccasion(undefined);
    setMood(undefined);
    setCraft([]);
    history.replaceState(null, "", "/find-your-look");
    go(0);
  };

  if (step === 3 && occasion && mood) {
    const allSaved = results.every((l) => saved.includes(l.slug));
    const suggestion = getCollection(
      collectionFor[mood === "heritage" ? mood : occasion],
    );
    const moodLabel = moods.find((x) => x.value === mood)!.label;
    const occasionLabel = occasions
      .find((x) => x.value === occasion)!
      .label.toLowerCase();
    return (
      <div
        ref={top}
        className="scroll-mt-28 animate-in duration-700 fade-in-0 slide-in-from-bottom-4"
      >
        <p className="eyebrow text-rose-deep">Your edit</p>
        <h2 className="display mt-6 text-[clamp(2.6rem,6vw,5.4rem)]">
          {moodLabel}, <em className="text-rose-deep">for {occasionLabel}.</em>
        </h2>
        <p className="mt-6 max-w-xl leading-[1.8] text-cocoa">
          {results.length} looks from the archive, chosen for your occasion and
          your style. Save the ones you love, or send them with an enquiry.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => moodboard.add(results.map((l) => l.slug))}
            disabled={allSaved}
            className={buttonVariants({ variant: "brand", size: "cta" })}
          >
            {allSaved ? <Check aria-hidden /> : <Heart aria-hidden />}
            {allSaved
              ? "All saved to your moodboard"
              : "Save all to my moodboard"}
          </button>
          <a
            href={looksEnquiryMailto(
              results.map((l) => l.slug),
              `Enquiry: ${moodLabel} looks for ${occasionLabel}`,
            )}
            className={buttonVariants({
              variant: "brand-outline",
              size: "cta",
            })}
          >
            Enquire with these looks <ArrowUpRight aria-hidden />
          </a>
          <button
            type="button"
            onClick={restart}
            className="inline-flex h-12 items-center gap-2 px-4 text-[0.72rem] font-semibold tracking-[0.2em] text-taupe uppercase hover:text-espresso"
          >
            <RotateCcw aria-hidden className="size-4" /> Start again
          </button>
        </div>

        <ul className="mt-14 columns-2 gap-3 sm:gap-5 md:columns-3">
          {results.map((look, i) => (
            <li
              key={look.slug}
              className="mb-3 break-inside-avoid animate-in fill-mode-both duration-700 fade-in-0 slide-in-from-bottom-4 sm:mb-5"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <LookCard look={look} />
            </li>
          ))}
        </ul>

        {suggestion && (
          <Link
            href={`/collections/${suggestion.slug}`}
            className="group mt-16 flex items-center justify-between gap-6 border-y border-border py-8"
          >
            <span>
              <span className="eyebrow text-taupe">Keep exploring</span>
              <span className="mt-2 block font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight group-hover:text-rose-deep">
                The {collectionName(suggestion)} collection
              </span>
            </span>
            <ArrowRight
              aria-hidden
              className="size-6 shrink-0 transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        )}
      </div>
    );
  }

  const questions = [
    { title: "What are you *celebrating?*", options: occasions, multi: false },
    {
      title: "Which mood feels most *like you?*",
      options: moods,
      multi: false,
    },
    { title: "What would you love *help with?*", options: crafts, multi: true },
  ] as const;
  const q = questions[step];
  const selected = (v: string) =>
    step === 0
      ? occasion === v
      : step === 1
        ? mood === v
        : craft.includes(v as ServiceValue);
  const canContinue =
    step === 0 ? !!occasion : step === 1 ? !!mood : craft.length > 0;

  const choose = (v: string) => {
    if (step === 0) {
      setOccasion(v as Occasion);
      setTimeout(() => go(1), 280);
    } else if (step === 1) {
      setMood(v as Mood);
      setTimeout(() => go(2), 280);
    } else {
      setCraft((c) =>
        c.includes(v as ServiceValue)
          ? c.filter((x) => x !== v)
          : [...c, v as ServiceValue],
      );
    }
  };

  return (
    <div ref={top} className="scroll-mt-28">
      <div className="flex items-center justify-between gap-6">
        <p
          className="font-serif text-[1.2rem] italic text-rose-deep"
          aria-live="polite"
        >
          Question {step + 1} <span className="text-taupe">of 3</span>
        </p>
        <div className="flex h-px w-40 bg-border" aria-hidden>
          <span
            className="h-px bg-rose-deep transition-all duration-700 ease-editorial"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <fieldset
        key={step}
        className="mt-10 animate-in duration-700 fade-in-0 slide-in-from-right-6"
      >
        <legend className="display text-[clamp(2.4rem,5.6vw,5rem)]">
          {q.title.split(/(\*[^*]+\*)/).map((part, i) =>
            part.startsWith("*") ? (
              <em key={i} className="text-rose-deep">
                {part.slice(1, -1)}
              </em>
            ) : (
              part
            ),
          )}
        </legend>
        {q.multi && (
          <p className="mt-4 text-[0.9rem] text-taupe">
            Choose as many as you like.
          </p>
        )}

        <div
          role={q.multi ? "group" : "radiogroup"}
          className={cn(
            "mt-12 grid gap-4 sm:gap-5",
            q.options.length === 5
              ? "grid-cols-2 lg:grid-cols-5"
              : q.options.length === 4
                ? "grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-3",
          )}
        >
          {q.options.map((opt) => {
            const on = selected(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                role={q.multi ? "checkbox" : "radio"}
                aria-checked={on}
                onClick={() => choose(opt.value)}
                className={cn(
                  "group relative text-left transition-all duration-500 ease-editorial",
                  on ? "-translate-y-1" : "hover:-translate-y-1",
                )}
              >
                <span
                  className={cn(
                    "relative block aspect-[4/5] overflow-hidden bg-sand ring-offset-4 ring-offset-ivory transition-shadow duration-500",
                    on && "ring-2 ring-rose-deep",
                  )}
                >
                  <Image
                    src={opt.look.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-[1.06]"
                  />
                  <span
                    className={cn(
                      "absolute top-3 right-3 grid size-8 place-items-center rounded-full border transition-all duration-500",
                      on
                        ? "border-rose-deep bg-rose-deep text-ivory"
                        : "border-ivory/80 bg-espresso/20 text-transparent",
                    )}
                  >
                    <Check aria-hidden className="size-4" />
                  </span>
                </span>
                <span className="mt-4 block font-serif text-[1.55rem] leading-tight">
                  {opt.label}
                </span>
                <span className="mt-1 block text-[0.82rem] text-taupe">
                  {opt.hint}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-8">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className="inline-flex h-12 items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] uppercase disabled:invisible"
        >
          <ArrowLeft aria-hidden className="size-4" /> Back
        </button>
        <button
          type="button"
          onClick={() => go(step + 1)}
          disabled={!canContinue}
          className={buttonVariants({ variant: "brand", size: "cta" })}
        >
          {step === 2 ? "See my edit" : "Continue"} <ArrowRight aria-hidden />
        </button>
      </div>
    </div>
  );
}
