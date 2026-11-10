"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ডেস্কটপে মাউসের পেছনে মসৃণ রিং — লিংক/বাটনে বড় হয়, ভিডিওতে "দেখুন" লেখা দেখায় */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default"); // default | link | play
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      if (t.closest?.("[aria-label*='ভিডিও চালান']")) setMode("play");
      else if (t.closest?.("a, button, [role='button'], input, textarea, label")) setMode("link");
      else setMode("default");
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "play" ? 96 : mode === "link" ? 56 : 18;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden md:block"
    >
      <motion.div
        animate={{ width: size, height: size, scale: down ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full ${
          mode === "play" ? "bg-lime text-ink" : mode === "link" ? "border border-lime/70 bg-lime/10" : "bg-lime mix-blend-difference"
        }`}
      >
        {mode === "play" && <span className="font-display text-sm font-bold">▶ দেখুন</span>}
      </motion.div>
    </motion.div>
  );
}
