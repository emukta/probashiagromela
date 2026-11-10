"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PHONES, SITE } from "@/data/site";
import { Button, Icon, WordReveal } from "./ui";

export default function FinalCta() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "5%"]);

  return (
    <section ref={ref} className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-10 select-none space-y-2 font-display text-[16vw] font-extrabold leading-none opacity-[0.06] sm:text-[11vw]">
        <motion.p style={{ x: x1 }} className="whitespace-nowrap">হালাল উপার্জন • নিরাপদ খাদ্য •</motion.p>
        <motion.p style={{ x: x2 }} className="whitespace-nowrap">সুদমুক্ত জীবন • বরকতময় আয় •</motion.p>
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.img
          src="/images/logo.png"
          alt=""
          className="mx-auto size-20 rounded-full bg-white p-0.5"
          initial={{ rotate: -180, scale: 0 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        />
        <h2 className="mt-8 font-display text-5xl font-bold leading-[1.05] sm:text-7xl lg:text-8xl">
          <WordReveal text="আমি আসছি," />
          <br />
          <WordReveal text={"আপনি আসছেন তো?"} delay={0.2} highlight={[1]} />
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-cream/65">
          🌿 {SITE.slogan} 🌿 — পরিবার ও বন্ধুদের নিয়ে চলে আসুন। হালাল বিনিয়োগের পথচলায় আমরা আছি আপনার পাশে।
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="#register">রেজিস্ট্রেশন করুন</Button>
          {PHONES.map((p) => (
            <Button key={p.tel} href={`tel:${p.tel}`} variant="ghost" icon="phone">
              {p.label}
            </Button>
          ))}
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-cream/45">
          <Icon name="gift" className="size-4 text-lime" /> সুযোগ শুধু প্রথম ২০ জনের জন্য
        </p>
      </div>
    </section>
  );
}
