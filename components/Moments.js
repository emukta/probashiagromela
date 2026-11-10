"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MOMENTS } from "@/data/site";
import { EASE, Eyebrow, Icon, WordReveal, toBn } from "./ui";

export default function Moments() {
  const [idx, setIdx] = useState(null);
  const open = idx !== null;

  const go = useCallback((d) => setIdx((i) => (i === null ? i : (i + d + MOMENTS.length) % MOMENTS.length)), []);

  useEffect(() => {
    const l = window.__lenis;
    if (open) l?.stop();
    else l?.start();
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <section className="relative bg-forest px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Eyebrow>মুহূর্তগুলো</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] sm:text-6xl">
            <WordReveal text="প্রবাসী পরিবারের পথচলার কিছু ছবি" />
          </h2>
        </div>

        <div className="mt-14 columns-2 gap-3 sm:gap-5 lg:columns-3">
          {MOMENTS.map((m, i) => (
            <motion.button
              key={m.src}
              onClick={() => setIdx(i)}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
              className="group relative mb-3 block w-full overflow-hidden rounded-2xl text-left sm:mb-5 sm:rounded-3xl"
              aria-label={`${m.caption} — বড় করে দেখুন`}
            >
              <motion.img
                layoutId={`m-${i}`}
                src={m.src}
                alt={m.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-display text-base font-semibold sm:text-lg">{m.caption}</span>
                <Icon name="plus" className="size-5 text-lime" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIdx(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              key={idx}
              layoutId={`m-${idx}`}
              src={MOMENTS[idx].src}
              alt={MOMENTS[idx].caption}
              className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
              transition={{ duration: 0.6, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                if (info.offset.x > 80) go(-1);
              }}
            />
            <p className="mt-5 font-display text-lg">
              {MOMENTS[idx].caption}
              <span className="ml-3 text-sm text-cream/50">
                {toBn(idx + 1)} / {toBn(MOMENTS.length)}
              </span>
            </p>
            <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => go(-1)} aria-label="আগের ছবি" className="grid size-12 place-items-center rounded-full border border-white/15 hover:border-lime">
                <Icon name="arrow" className="size-5 -rotate-[135deg]" />
              </button>
              <button onClick={() => go(1)} aria-label="পরের ছবি" className="grid size-12 place-items-center rounded-full border border-white/15 hover:border-lime">
                <Icon name="arrow" className="size-5 rotate-45" />
              </button>
            </div>
            <button
              onClick={() => setIdx(null)}
              aria-label="বন্ধ করুন"
              className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 hover:bg-lime hover:text-ink"
            >
              <Icon name="close" className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
