"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EVENT_START, EVENT_END } from "@/data/site";
import { toBn } from "./ui";

function diff() {
  const now = Date.now();
  const start = new Date(EVENT_START).getTime();
  const end = new Date(EVENT_END).getTime();
  if (now >= end) return { state: "over" };
  if (now >= start) return { state: "live" };
  const s = Math.floor((start - now) / 1000);
  return {
    state: "upcoming",
    parts: [
      { v: Math.floor(s / 86400), l: "দিন" },
      { v: Math.floor((s % 86400) / 3600), l: "ঘণ্টা" },
      { v: Math.floor((s % 3600) / 60), l: "মিনিট" },
      { v: s % 60, l: "সেকেন্ড" },
    ],
  };
}

function Digit({ value }) {
  const str = toBn(String(value).padStart(2, "0"));
  return (
    <span className="relative inline-flex h-[1.1em] overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={str}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {str}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Countdown({ compact = false }) {
  const [t, setT] = useState(null);

  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return <div className={compact ? "h-14" : "h-20"} aria-hidden />;

  if (t.state !== "upcoming") {
    return (
      <p className="inline-flex items-center gap-2 font-display text-xl font-semibold text-lime">
        <span className="relative flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-lime" />
        </span>
        {t.state === "live" ? "মেলা এখন চলছে — চলে আসুন!" : "মেলা সফলভাবে সম্পন্ন হয়েছে — আলহামদুলিল্লাহ"}
      </p>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-3" role="timer" aria-live="off">
      {t.parts.map((p) => (
        <div
          key={p.l}
          className={`flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md ${
            compact ? "min-w-[58px] px-2 py-2" : "min-w-[64px] px-3 py-3 sm:min-w-[84px]"
          }`}
        >
          <span className={`font-display font-bold leading-none text-cream ${compact ? "text-2xl" : "text-3xl sm:text-4xl"}`}>
            <Digit value={p.v} />
          </span>
          <span className="mt-1 text-[11px] text-cream/50 sm:text-xs">{p.l}</span>
        </div>
      ))}
    </div>
  );
}
