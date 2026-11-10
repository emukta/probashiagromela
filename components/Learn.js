"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LEARN } from "@/data/site";
import { Eyebrow, Icon, Reveal, WordReveal } from "./ui";

/* স্ক্রল করলে কার্ডগুলো একটার ওপর আরেকটা জমে (sticky stack) */
function StackCard({ item, i, total, progress }) {
  const target = 1 - (total - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, target]);
  const imgScale = useTransform(progress, [i / total, (i + 1) / total], [1.25, 1]);

  return (
    <div className="sticky top-24 flex h-[78vh] min-h-[520px] items-start justify-center sm:top-28">
      <motion.article
        style={{ scale, top: `${i * 22}px` }}
        className="relative grid h-[92%] w-full origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-moss md:grid-cols-[1fr_1.1fr]"
      >
        <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10">
          <div>
            <span className="font-display text-7xl font-bold text-lime/90 sm:text-8xl">{item.no}</span>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{item.title}</h3>
          </div>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">{item.text}</p>
        </div>
        <div className="relative hidden overflow-hidden md:block">
          <motion.img style={{ scale: imgScale }} src={item.image} alt={item.title} loading="lazy" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-moss via-transparent to-transparent" />
        </div>
        <img src={item.image} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 size-full object-cover opacity-25 md:hidden" />
      </motion.article>
    </div>
  );
}

export default function Learn() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative px-5 pb-16 pt-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>মেলায় যা জানতে পারবেন</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] sm:text-6xl">
              <WordReveal text={"নিরাপদ খাদ্য আর হালাল\u00A0আয় — এক ছাদের নিচে"} highlight={[3]} />
            </h2>
          </div>
          <Reveal className="max-w-sm text-cream/60">
            <p className="flex gap-3">
              <Icon name="leaf" className="mt-1 size-5 shrink-0 text-lime" />
              সম্পূর্ণ প্রজেক্টের ধারণা সরাসরি আপনাদের সামনে তুলে ধরতেই আমাদের এই মেলার আয়োজন।
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-12">
          {LEARN.map((item, i) => (
            <StackCard key={item.no} item={item} i={i} total={LEARN.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
