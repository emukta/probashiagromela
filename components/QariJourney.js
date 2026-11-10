"use client";

import { useEffect, useRef, useState } from "react";
import { QARI_GALLERY, SOCIAL } from "@/data/site";
import { Eyebrow, Icon, Reveal, WordReveal, toBn } from "./ui";

/*
  স্ক্রল আটকে রাখে না — সাধারণ স্ক্রলের মধ্যেই থাকে।
  মোবাইলে সোয়াইপ, ডেস্কটপে তীর বাটন / ট্র্যাকপ্যাড দিয়ে পাশে সরানো যায়।
*/
export default function QariJourney() {
  const track = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft < max - 8);
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir) => {
    const el = track.current;
    const card = el?.querySelector("figure");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>চেয়ারম্যানের পথচলা</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              <WordReveal text="কুরআনের খেদমতে আন্তর্জাতিক মঞ্চে" highlight={[0]} />
            </h2>
            <Reveal delay={0.1} className="mt-6 max-w-xl text-cream/65">
              আন্তর্জাতিক কারী ও বহু বিশ্বজয়ী হাফেজের ওস্তাদ শায়েখ কারী নাজমুল হাসান — যাঁর তত্ত্বাবধানে হালাল ও দ্বীনি চেতনায় গড়ে উঠেছে প্রবাসী এগ্রো রিসোর্ট।
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex items-center gap-3">
            <a
              href={SOCIAL.facebookQari}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm transition-colors hover:border-lime hover:text-lime"
            >
              <Icon name="facebook" className="size-4" /> ফেসবুক পেইজ
            </a>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={!canPrev}
              aria-label="আগের ছবি"
              className="grid size-12 place-items-center rounded-full border border-white/15 transition-all hover:border-lime hover:text-lime disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-cream"
            >
              <Icon name="arrow" className="size-5 -rotate-[135deg]" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={!canNext}
              aria-label="পরের ছবি"
              className="grid size-12 place-items-center rounded-full bg-lime text-ink transition-opacity disabled:opacity-30"
            >
              <Icon name="arrow" className="size-5 rotate-45" />
            </button>
          </Reveal>
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8 xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        style={{ scrollPaddingInline: "1.25rem" }}
      >
        {QARI_GALLERY.map((g, i) => (
          <figure
            key={g.src}
            className="group relative h-[420px] w-[80vw] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-moss sm:h-[460px] sm:w-[420px] lg:w-[460px]"
          >
            <img
              src={g.src}
              alt={g.caption}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <span className="font-display text-xl font-semibold leading-snug">{g.caption}</span>
              <span className="font-display text-3xl font-bold text-lime/80">{toBn(String(i + 1).padStart(2, "0"))}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <div className="h-px w-full max-w-xs bg-white/10">
          <div className="h-full bg-lime transition-[width] duration-300" style={{ width: `${20 + progress * 80}%` }} />
        </div>
      </div>
    </section>
  );
}
