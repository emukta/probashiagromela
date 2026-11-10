"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { PHONES } from "@/data/site";
import { EASE, Icon } from "./ui";

// মোবাইলে নিচে স্থির কল বার — হিরো পার হওয়ার পর দেখা যায়
export default function FloatingCall() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-40 sm:hidden"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink/80 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <a href={`tel:${PHONES[0].tel}`} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-lime py-3 font-display font-semibold text-ink">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink/60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-ink" />
              </span>
              কল করুন
            </a>
            <a href="#register" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 py-3 font-display text-cream">
              রেজিস্ট্রেশন <Icon name="arrow" className="size-4 text-lime" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
