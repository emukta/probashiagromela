"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useInView, useReducedMotion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export const toBn = (n) => String(n).replace(/\d/g, (d) => BN[d]);

/* ---------- স্ক্রলে ভেসে ওঠা ---------- */
export function Reveal({ children, delay = 0, y = 40, className = "", as = "div", once = true }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/* ---------- শব্দ ধরে ধরে মাস্ক রিভিল (বাংলা যুক্তাক্ষর ভাঙে না) ---------- */
export function WordReveal({ text, className = "", delay = 0, stagger = 0.06, highlight = [], immediate = false }) {
  const words = text.split(" ");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const show = immediate || inView;
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(i) ? "hl" : ""}`}
            initial={{ y: "110%", rotate: 4 }}
            animate={show ? { y: "0%", rotate: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/* ---------- চুম্বকের মতো বাটন ---------- */
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}

/* ---------- প্রধান বাটন ---------- */
export function Button({ href, children, variant = "lime", icon = "arrow", className = "", ...rest }) {
  const styles = {
    lime: "bg-lime text-ink",
    dark: "bg-ink text-cream border border-white/10",
    ghost: "bg-white/5 text-cream border border-white/15 backdrop-blur-md",
    gold: "bg-gold text-ink",
  };
  return (
    <Magnetic>
      <a
        href={href}
        {...rest}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-2 pl-6 pr-2 font-display text-[15px] font-semibold tracking-wide sm:text-base ${styles[variant]} ${className}`}
      >
        <span className="relative z-10">{children}</span>
        <span className="relative z-10 grid size-9 place-items-center overflow-hidden rounded-full bg-ink/90 text-lime transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 sm:size-10">
          <Icon name={icon} className="size-4" />
        </span>
        <span className="absolute inset-0 origin-left scale-x-0 bg-white/25 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
      </a>
    </Magnetic>
  );
}

/* ---------- সেকশন লেবেল (রেফারেন্স ডিজাইনের ছোট পিল) ---------- */
export function Eyebrow({ children, light = false }) {
  return (
    <Reveal y={16}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium tracking-wide ${
          light ? "border-ink/15 bg-ink/5 text-ink/70" : "border-white/15 bg-white/5 text-cream/70"
        }`}
      >
        <span className="size-1.5 rounded-full bg-lime shadow-[0_0_12px_2px] shadow-lime/60" />
        {children}
      </span>
    </Reveal>
  );
}

/* ---------- আইকন সেট (inline SVG, কোনো লাইব্রেরি লাগে না) ---------- */
export function Icon({ name, className = "size-5" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    arrow: <path {...p} d="M7 17 17 7M8 7h9v9" />,
    phone: (
      <path {...p} d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    ),
    pin: (
      <>
        <path {...p} d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
        <circle {...p} cx="12" cy="9.5" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect {...p} x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path {...p} d="M3.5 10h17M8 3v4M16 3v4" />
      </>
    ),
    leaf: <path {...p} d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15m0-1 7-7" />,
    shield: (
      <>
        <path {...p} d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6z" />
        <path {...p} d="m9 12 2 2 4-4" />
      </>
    ),
    kaaba: (
      <>
        <path {...p} d="M4 8 12 4l8 4v10l-8 3-8-3z" />
        <path {...p} d="M4 8l8 3 8-3M12 11v10M4 12l8 3 8-3" />
      </>
    ),
    plane: <path {...p} d="M10.5 13.5 3 11l1.5-1.5 8 1L17 6a2 2 0 0 1 3 3l-4.5 4.5 1 8L15 23l-2.5-7.5L9 19v3l-1.5 1L6 19l-4-1.5L3 16h3z" />,
    hotel: (
      <>
        <path {...p} d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20" />
        <path {...p} d="M9 7h1M14 7h1M9 11h1M14 11h1M10 21v-5h4v5" />
      </>
    ),
    gift: (
      <>
        <rect {...p} x="3.5" y="8" width="17" height="4" rx="1" />
        <path {...p} d="M5 12v8.5h14V12M12 8v12.5M12 8S10.5 3.5 8 4.5 8.5 8 12 8zm0 0s1.5-4.5 4-3.5S15.5 8 12 8" />
      </>
    ),
    facebook: <path fill="currentColor" d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3a21 21 0 0 0-2.5-.1C12 2.2 10.5 3.7 10.5 6.4v2.1H8v3.3h2.5V22H14V11.8h2.6l.4-3.3z" />,
    office: (
      <>
        <path {...p} d="M3 21h18M5 21V7l7-4 7 4v14" />
        <path {...p} d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-3h4v3" />
      </>
    ),
    close: <path {...p} d="M6 6l12 12M18 6 6 18" />,
    plus: <path {...p} d="M12 5v14M5 12h14" />,
    star: <path fill="currentColor" d="m12 2 2.6 6.9L22 9.3l-5.7 4.8 1.8 7.4L12 17.6 5.9 21.5l1.8-7.4L2 9.3l7.4-.4z" />,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
