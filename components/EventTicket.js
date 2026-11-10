"use client";

import { motion } from "framer-motion";
import { VENUE } from "@/data/site";
import Countdown from "./Countdown";
import { EASE, Icon } from "./ui";

/* মেলার তারিখ ও স্থান — ঘুরন্ত আলোর বর্ডারসহ টিকিট কার্ড */
export default function EventTicket({ delay = 0 }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 50, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      aria-label="মেলার তারিখ ও স্থান"
      className="glow-border w-full rounded-[1.75rem]"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink/85 backdrop-blur-2xl">
        {/* উপরের অংশ — তারিখ */}
        <div className="relative p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-lime/20 blur-3xl" />
          <div className="relative flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink" />
                <span className="relative inline-flex size-1.5 rounded-full bg-ink" />
              </span>
              ৩ দিনব্যাপী একক মেলা
            </span>
            <span className="text-[11px] tracking-[0.25em] text-cream/40">২০২৬</span>
          </div>

          <p className="relative mt-5 flex items-center gap-2 text-sm text-cream/55">
            <Icon name="calendar" className="size-4 text-lime" /> তারিখ
          </p>
          <div className="relative mt-1 flex items-end gap-3">
            <p className="font-display text-6xl font-bold leading-none text-lime sm:text-7xl">১৭-১৯</p>
            <div className="pb-1 leading-tight">
              <p className="font-display text-2xl font-bold">নভেম্বর</p>
              <p className="text-xs text-cream/55">মঙ্গল · বুধ · বৃহস্পতি</p>
            </div>
          </div>
          <div className="relative mt-4 grid grid-cols-3 gap-2">
            {["১৭", "১৮", "১৯"].map((d, i) => (
              <span key={d} className="rounded-xl border border-white/10 bg-white/[0.04] py-2 text-center">
                <span className="block font-display text-xl font-bold">{d}</span>
                <span className="block text-[11px] text-cream/50">দিন {["১", "২", "৩"][i]}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ছিদ্র করা ভাঁজ */}
        <div className="relative flex h-6 items-center">
          <span className="absolute -left-3 size-6 rounded-full bg-ink" />
          <span className="perforation mx-5 h-1 flex-1" />
          <span className="absolute -right-3 size-6 rounded-full bg-ink" />
        </div>

        {/* নিচের অংশ — স্থান */}
        <div className="p-5 pt-3 sm:p-6 sm:pt-3">
          <p className="flex items-center gap-2 text-sm text-cream/55">
            <Icon name="pin" className="size-4 text-lime" /> স্থান
          </p>
          <p className="mt-1 font-display text-2xl font-bold leading-tight sm:text-[1.7rem]">
            <span className="hl">{VENUE.name}</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-cream/75">৩২২/এ, দক্ষিণ যাত্রাবাড়ী (থানার পাশে), ঢাকা</p>

          <div className="mt-5">
            <p className="mb-2 text-xs text-cream/45">মেলা শুরু হতে বাকি</p>
            <Countdown compact />
          </div>

          <a
            href="#register"
            className="group mt-5 flex items-center justify-between rounded-2xl bg-lime px-5 py-3.5 font-display text-lg font-semibold text-ink transition-transform active:scale-[0.98]"
          >
            আসন সংরক্ষণ করুন
            <span className="grid size-9 place-items-center rounded-full bg-ink text-lime transition-transform duration-500 group-hover:rotate-45">
              <Icon name="arrow" className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </motion.aside>
  );
}
