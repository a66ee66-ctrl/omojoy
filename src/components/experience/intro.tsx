/**
 * First-visit curtain: the wordmark rises, then the curtain lifts to reveal the page.
 * Pure CSS; an inline script in <head> adds `intro-seen` to skip it for the rest of
 * the session and for visitors who prefer reduced motion.
 */
export function Intro() {
  const word = "Artistry"
  return (
    <div aria-hidden className="intro pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-espresso text-ivory">
      <div className="flex items-baseline gap-4 overflow-hidden">
        <span className="intro-joyful font-sans text-[0.75rem] font-semibold tracking-[0.5em] uppercase">Joyful</span>
        <span className="font-serif text-[clamp(3rem,9vw,7rem)] leading-none italic">
          {word.split("").map((ch, i) => (
            <span key={i} className="intro-letter inline-block" style={{ "--i": i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      </div>
      <span className="intro-line absolute bottom-[18%] left-1/2 h-px w-24 -translate-x-1/2 bg-champagne" />
    </div>
  )
}

export const introScript = `try{var d=document.documentElement;d.classList.add('js-reveal');if(sessionStorage.getItem('ja-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-seen')}else{sessionStorage.setItem('ja-intro','1')}}catch(e){document.documentElement.classList.add('intro-seen')}`
