"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SPEAKERS } from "@/data/site";
import { EASE, Eyebrow, Icon, WordReveal } from "./ui";

/* মাউস অনুযায়ী হালকা 3D tilt কার্ড */
function SpeakerCard({ s, i }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 15 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
      style={{ perspective: 1200 }}
      className={i === 1 ? "md:mt-24" : ""}
    >
      <motion.a
        ref={ref}
        href={s.link}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative block overflow-hidden rounded-[2rem] bg-moss"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={s.image}
            alt={s.name}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-all duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:opacity-0"
          />
          <img
            src={s.hover}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 size-full scale-110 object-cover opacity-0 transition-all duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-100 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-ink/60 px-3 py-1 text-xs text-cream/80 backdrop-blur-md">
            {i === 0 ? "চেয়ারম্যান" : "ব্যবস্থাপনা পরিচালক"}
          </span>
          <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:rotate-45">
            <Icon name="arrow" className="size-5" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8" style={{ transform: "translateZ(40px)" }}>
          <p className="text-sm text-lime">{s.prefix}</p>
          <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">{s.name}</h3>
          <p className="mt-1 text-sm text-white sm:text-base">{s.role}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">{s.bio}</p>
        </div>
      </motion.a>
    </motion.article>
  );
}

export default function Speakers() {
  return (
    <section id="speakers" className="relative bg-paper px-5 py-24 text-ink sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow light>উপস্থিত থাকবেন</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              <WordReveal text="আমাদের সম্মানিত" />
              <br />
              <span className="text-pine/45">
                <WordReveal text="অতিথিবৃন্দ" delay={0.15} />
              </span>
            </h2>
            <p className="mt-6 max-w-md text-ink/60">
              মেলায় সরাসরি উপস্থিত থেকে প্রকল্পের ধারণা তুলে ধরবেন প্রবাসী এগ্রো রিসোর্টের নেতৃত্ব। আপনার প্রশ্নের উত্তর পাবেন সামনাসামনি।
            </p>
          </div>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {SPEAKERS.map((s, i) => (
            <SpeakerCard key={s.name} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
