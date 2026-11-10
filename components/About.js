"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { STATS } from "@/data/site";
import { EASE, Eyebrow, Reveal, toBn } from "./ui";

const STATEMENT =
  "হালাল রুজি আর নিরাপদ খাদ্যই হলো ইবাদত কবুল ও পরকালীন শান্তির মূল চাবিকাঠি। এই দ্বীনি চেতনা থেকেই ১৮০ বিঘা জায়গাজুড়ে আমরা গড়ে তুলেছি প্রবাসী এগ্রো রিসোর্ট।";

/* স্ক্রল করলে শব্দগুলো একে একে উজ্জ্বল হয় */
function ScrubText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="font-display text-[1.75rem] font-semibold leading-[1.3] sm:text-4xl lg:text-[3.2rem] lg:leading-[1.2]">
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} progress={scrollYProgress} range={[start, end]} word={w} accent={/১৮০|প্রবাসী|এগ্রো|রিসোর্ট।/.test(w)} />;
      })}
    </p>
  );
}

function Word({ progress, range, word, accent }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${accent ? "text-lime" : ""}`}>
      {word}
    </motion.span>
  );
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {toBn(n)}
      {suffix}
    </span>
  );
}

export default function About() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>আমাদের পরিচয়</Eyebrow>
        <div className="mt-8 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <ScrubText text={STATEMENT} />
            <Reveal delay={0.1} className="mt-8 max-w-xl text-lg leading-relaxed text-cream/65">
              এটি শুধু কোনো সাধারণ রিসোর্ট নয়, বরং হালাল ও নিরাপদ জীবনযাত্রার এক আধুনিক মডেল। যেখানে সুদের ছায়া নেই — আছে মাটির সাথে সম্পর্ক,
              প্রকৃতির সান্নিধ্য আর হালাল উপার্জনের প্রশান্তি।
            </Reveal>
          </div>

          <div ref={imgRef} className="relative h-[460px] sm:h-[560px]">
            <motion.div style={{ y: y1 }} className="absolute left-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[2rem]">
              <img src="/images/duck-sunset.webp" alt="প্রবাসী এগ্রো রিসোর্টের হাঁস পালন প্রকল্প, আজমিরীগঞ্জ" className="size-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div
              style={{ y: y2, rotate }}
              className="absolute bottom-0 right-0 h-[52%] w-[58%] overflow-hidden rounded-[2rem] border-4 border-ink shadow-2xl"
            >
              <img src="/images/duck-team.webp" alt="প্রকল্প এলাকায় প্রবাসী এগ্রো টিম" className="size-full object-cover" loading="lazy" />
            </motion.div>
            <div className="absolute right-[6%] top-[6%] grid size-28 place-items-center sm:size-32">
              <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
                <defs>
                  <path id="circ" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
                </defs>
                <text className="fill-cream font-display text-[10px] tracking-[0.2em]">
                  <textPath href="#circ">হালাল • নিরাপদ • বরকতময় • সবুজ • </textPath>
                </text>
              </svg>
              <img src="/images/logo.png" alt="" className="size-14 rounded-full bg-white p-0.5 sm:size-16" />
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`border-b border-white/10 py-8 pr-4 lg:border-b-0 ${i % 2 === 0 ? "border-r lg:border-r" : "pl-5 lg:border-r"} ${
                i > 0 ? "lg:pl-8" : ""
              } ${i === 3 ? "lg:border-r-0" : ""}`}
            >
              <p className="font-display text-5xl font-bold text-lime sm:text-6xl lg:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-cream/60 sm:text-base">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
