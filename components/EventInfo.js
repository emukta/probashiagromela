"use client";

import { motion } from "framer-motion";
import { VENUE } from "@/data/site";
import { EASE, Icon } from "./ui";

const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.mapQuery)}`;

/* 📅 তারিখ ও 📍 স্থান — হাইলাইট করা বড় ইনফো ব্যান্ড */
export default function EventInfo() {
  const cells = [
    {
      icon: "calendar",
      label: "তারিখ",
      main: "১৭, ১৮ ও ১৯ নভেম্বর",
      sub: "মঙ্গলবার — বৃহস্পতিবার",
    },
    {
      icon: "pin",
      label: "স্থান",
      main: VENUE.name,
      sub: "৩২২/এ, দক্ষিণ যাত্রাবাড়ী (থানার পাশে)",
    },
  ];

  return (
    <section aria-label="মেলার তারিখ ও স্থান" className="relative px-3 pt-4 sm:px-5">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: EASE }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lime text-ink"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(#070c08 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <div className="relative grid md:grid-cols-[1fr_1.25fr_auto]">
          {cells.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.1 }}
              className={`flex items-start gap-4 p-6 sm:p-8 ${i === 0 ? "border-b border-ink/15 md:border-b-0 md:border-r" : ""}`}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-lime sm:size-14">
                <Icon name={c.icon} className="size-6" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink/60">{c.label}</p>
                <p className="mt-0.5 font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-[2.1rem]">{c.main}</p>
                <p className="mt-1 text-sm text-ink/70 sm:text-base">{c.sub}</p>
              </div>
            </motion.div>
          ))}
          <div className="flex items-center gap-3 border-t border-ink/15 p-6 sm:p-8 md:border-l md:border-t-0">
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-ink py-2 pl-5 pr-2 font-display font-semibold text-cream md:w-auto"
            >
              ম্যাপে দেখুন
              <span className="grid size-10 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:rotate-45">
                <Icon name="arrow" className="size-4" />
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
