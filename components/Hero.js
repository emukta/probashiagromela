"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PHONES } from "@/data/site";
import EventTicket from "./EventTicket";
import { Button, EASE, Icon, WordReveal } from "./ui";

const D = 1.75; // প্রিলোডার শেষ হওয়ার পর অ্যানিমেশন শুরু

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      {/* পটভূমির ছবি — প্যারালাক্স */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <motion.img
          src="/images/award-plaque.webp"
          alt="প্রবাসী এগ্রো রিসোর্টের অনুষ্ঠানে সম্মাননা প্রদান"
          className="size-full object-cover object-[65%_30%]"
          initial={{ scale: 1.3, filter: "blur(14px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, ease: EASE, delay: D - 0.4 }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/60 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
      {/* সূক্ষ্ম গ্রিড — আধুনিক ইভেন্ট লুক */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,241,230,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,230,.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.35fr_1fr] lg:gap-14 lg:pb-20"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: D }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 backdrop-blur-md"
          >
            <span className="flex -space-x-2">
              {["/images/qari-portrait.webp", "/images/md-poster.webp"].map((s) => (
                <img key={s} src={s} alt="" className="size-8 rounded-full border-2 border-ink object-cover" />
              ))}
            </span>
            <span className="text-sm text-cream/75">প্রবাসী এগ্রো রিসোর্ট আয়োজিত</span>
          </motion.div>

          <h1 className="font-display font-bold leading-[1.02] tracking-tight">
            <span className="block text-2xl font-medium text-cream/75 sm:text-3xl lg:text-4xl">
              <WordReveal text="৩ দিনব্যাপী বিশেষ" immediate delay={D + 0.05} />
            </span>
            <span className="mt-1 block text-[20vw] leading-[0.95] sm:text-[8.5rem] lg:text-[9.5rem] xl:text-[10.5rem]">
              <WordReveal text="একক মেলা" immediate delay={D + 0.15} stagger={0.1} />
            </span>
          </h1>

          <p className="mt-5 max-w-2xl font-display text-2xl font-semibold leading-snug sm:text-3xl lg:text-[2.4rem] lg:leading-[1.15]">
            <WordReveal
              text={"হালাল উপার্জন ও শতভাগ নিরাপদ খাদ্যের নিশ্চয়তায়"}
              immediate
              delay={D + 0.35}
              stagger={0.05}
              highlight={[4]}
            />
          </p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: D + 0.7 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            ১৮০ বিঘা জায়গাজুড়ে গড়ে ওঠা হালাল ও নিরাপদ জীবনযাত্রার আধুনিক মডেল — সরাসরি দেখতে ও বুঝতে মেলায় চলে আসুন।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: D + 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#register">রেজিস্ট্রেশন করুন</Button>
            <Button href={`tel:${PHONES[0].tel}`} variant="ghost" icon="phone">
              কল করুন
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: D + 1.1 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/60"
          >
            {["সুদমুক্ত বিনিয়োগ", "শতভাগ নিরাপদ খাদ্য", "প্রথম ২০ জনের বিশেষ উপহার"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Icon name="shield" className="size-4 text-lime" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <EventTicket delay={D + 0.6} />
        </div>
      </motion.div>
    </section>
  );
}
