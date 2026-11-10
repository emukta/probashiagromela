"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VIDEOS } from "@/data/site";
import { EASE, Eyebrow, Icon, Reveal, WordReveal } from "./ui";

function PlayIcon({ className = "size-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  );
}

/* ভিডিও কার্ড — প্রথম ফ্রেম থাম্বনেইল, ডেস্কটপে হোভার করলে নিঃশব্দে প্রিভিউ চলে */
function VideoCard({ v, i, featured, onOpen }) {
  const ref = useRef(null);

  const preview = (play) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    if (play) el.play().catch(() => {});
    else {
      el.pause();
      el.currentTime = 1;
    }
  };

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(i)}
      onPointerEnter={() => preview(true)}
      onPointerLeave={() => preview(false)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
      className={`group relative block w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-moss text-left ${
        featured ? "aspect-[4/5] sm:aspect-[16/11] lg:row-span-2 lg:aspect-auto lg:h-full" : "aspect-[16/10]"
      }`}
      aria-label={`${v.title} — ভিডিও চালান`}
    >
      <video
        ref={ref}
        src={`${v.src}#t=1`}
        muted
        playsInline
        loop
        preload="metadata"
        className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/10" />

      <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-ink/50 px-3 py-1 text-xs text-cream/80 backdrop-blur-md">
        {v.tag}
      </span>

      <span className="absolute inset-0 grid place-items-center">
        <span className="relative grid place-items-center">
          <span className="absolute size-20 animate-ping rounded-full bg-lime/30 [animation-duration:2.4s] sm:size-24" />
          <span
            className={`relative grid place-items-center rounded-full bg-lime text-ink shadow-[0_0_60px] shadow-lime/40 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 ${
              featured ? "size-20 sm:size-24" : "size-16"
            }`}
          >
            <PlayIcon className={featured ? "ml-1 size-8" : "ml-1 size-6"} />
          </span>
        </span>
      </span>

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
        <span className={`font-display font-bold leading-tight ${featured ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>{v.title}</span>
        <Icon name="arrow" className="size-6 shrink-0 text-lime transition-transform duration-500 group-hover:rotate-45" />
      </span>
    </motion.button>
  );
}

export default function Videos() {
  const [active, setActive] = useState(null);
  const open = active !== null;

  useEffect(() => {
    const l = window.__lenis;
    if (open) l?.stop();
    else l?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="videos" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>ভিডিও</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] sm:text-6xl">
              <WordReveal text={"প্রবাসী এগ্রো এন্ড রিসোর্ট"} highlight={[2]} />
            </h2>
          </div>
          <Reveal className="max-w-sm text-cream/65">মেলার আগে এক নজরে জেনে নিন আমাদের প্রকল্প আর লক্ষ্য — তারপর সরাসরি চলে আসুন মেলায়।</Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.55fr_1fr] lg:grid-rows-2">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.src} v={v} i={i} featured={i === 0} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-3 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={VIDEOS[active].title}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <video
                key={VIDEOS[active].src}
                src={VIDEOS[active].src}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="max-h-[80vh] w-full rounded-2xl bg-black object-contain shadow-2xl"
              />
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="font-display text-lg font-semibold sm:text-xl">{VIDEOS[active].title}</p>
                <div className="flex gap-2">
                  {VIDEOS.map((v, i) => (
                    <button
                      key={v.src}
                      onClick={() => setActive(i)}
                      aria-label={v.title}
                      className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-lime" : "w-2 bg-white/30 hover:bg-white/60"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            <button
              onClick={() => setActive(null)}
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
