"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV, PHONES } from "@/data/site";
import { EASE, Icon, Magnetic } from "./ui";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  useEffect(() => {
    const l = window.__lenis;
    if (open) l?.stop();
    else l?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pl-2 pr-2 transition-all duration-500 sm:pl-3 ${
            solid ? "border border-white/10 bg-ink/70 shadow-2xl shadow-black/40 backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5" aria-label="প্রথম পাতায় যান">
            <img src="/images/logo.png" alt="Probashi Resort & Agro Industries" width={44} height={44} className="size-10 rounded-full bg-white p-0.5 sm:size-11" />
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-bold sm:text-base">প্রবাসী এগ্রো মেলা</span>
              <span className="block text-[11px] text-cream/50">১৭ — ১৯ নভেম্বর</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative rounded-full px-4 py-2 text-[15px] text-cream/75 transition-colors hover:text-cream"
              >
                {n.label}
                <span className="absolute inset-x-4 bottom-1.5 h-px origin-right scale-x-0 bg-lime transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-block">
              <a
                href="#register"
                className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-display text-[15px] font-semibold text-ink"
              >
                রেজিস্ট্রেশন <Icon name="arrow" className="size-4" />
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
              aria-expanded={open}
              className="relative grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 lg:hidden"
            >
              <span className={`absolute h-[1.5px] w-5 bg-cream transition-all duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-[1.5px] w-5 bg-cream transition-all duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-forest px-6 pb-8 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav className="flex flex-col">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE }}
                  className="flex items-baseline justify-between border-b border-white/10 py-4 font-display text-4xl font-semibold"
                >
                  {n.label}
                  <span className="text-sm text-lime">০{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto space-y-3"
            >
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="mb-4 flex items-center justify-between rounded-2xl bg-lime px-5 py-4 font-display text-xl font-semibold text-ink"
              >
                রেজিস্ট্রেশন করুন <Icon name="arrow" className="size-5" />
              </a>
              {PHONES.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 text-lg text-cream/80">
                  <Icon name="phone" className="size-5 text-lime" /> {p.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
