"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { OFFICE, SOCIAL } from "@/data/site";
import { Button, Eyebrow, Icon, Reveal, WordReveal } from "./ui";

export default function Project() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // স্ক্রলে ছবির "পর্দা" খুলে যায়
  const clip = useTransform(scrollYProgress, [0, 0.45], ["inset(18% 12% 18% 12% round 2rem)", "inset(0% 0% 0% 0% round 2rem)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <section id="project" ref={ref} className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>আমাদের প্রজেক্ট</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] sm:text-6xl">
              <WordReveal text="হবিগঞ্জের সবুজে আপনার হালাল অংশীদারিত্ব" />
            </h2>
          </div>
          <Reveal className="text-cream/65 lg:pb-2">
            আপনার কষ্টের উপার্জন কোথায় বিনিয়োগ করবেন — এই প্রশ্নটা কি প্রায়ই ভাবায়? আজমিরীগঞ্জে আমাদের সবুজ প্রকল্পের অংশীদার হওয়ার এটাই সেরা সময়।
          </Reveal>
        </div>

        <motion.div style={{ clipPath: clip }} className="relative mt-14 h-[60vh] min-h-[380px] overflow-hidden sm:h-[80vh]">
          <motion.img
            style={{ scale }}
            src="/images/pond-sunset.webp"
            alt="প্রবাসী এগ্রো রিসোর্টের প্রকল্প এলাকা, শিবপাশা, আজমিরীগঞ্জ"
            loading="lazy"
            className="size-full object-cover object-[50%_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
            <div>
              <p className="flex items-center gap-2 text-sm text-lime">
                <Icon name="pin" className="size-4" /> প্রজেক্ট লোকেশন
              </p>
              <p className="mt-2 font-display text-3xl font-bold sm:text-5xl">{OFFICE.project}</p>
            </div>
            <Button href={SOCIAL.facebookResort} target="_blank" rel="noopener noreferrer" variant="ghost">
              প্রজেক্টের আপডেট দেখুন
            </Button>
          </div>
        </motion.div>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {[
            { icon: "shield", t: "সুদমুক্ত", d: "যেখানে সুদের ছায়া নেই — পুরো মডেলটি হালাল ধারণার ওপর।" },
            { icon: "leaf", t: "প্রকৃতির সান্নিধ্য", d: "মাটির সাথে সম্পর্ক আর সবুজ পরিবেশে নিরাপদ খাদ্য উৎপাদন।" },
            { icon: "office", t: "স্বচ্ছ যোগাযোগ", d: "পুরানা পল্টনে প্রধান কার্যালয় — সরাসরি এসে জেনে নিন।" },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-lime/40">
              <Icon name={f.icon} className="size-7 text-lime" />
              <p className="mt-5 font-display text-xl font-semibold">{f.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{f.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
