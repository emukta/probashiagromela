"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, toBn } from "./ui";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const total = 1500;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
        }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <motion.img
            src="/images/logo.png"
            alt=""
            width={120}
            height={120}
            className="size-24 rounded-full bg-white p-1 sm:size-28"
            initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.p
            className="mt-6 font-display text-lg text-cream/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
          >
            প্রবাসী এগ্রো রিসোর্ট — একক মেলা
          </motion.p>
          <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
            <div className="h-full bg-lime transition-[width] duration-75" style={{ width: `${count}%` }} />
          </div>
          <span className="absolute bottom-6 right-6 font-display text-6xl font-bold text-lime/90 tabular-nums sm:text-8xl">
            {toBn(count)}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
