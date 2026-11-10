"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { OFFERS, PHONES } from "@/data/site";
import { Button, EASE, Eyebrow, Icon, Reveal, WordReveal } from "./ui";

const TONES = {
  gold: { ring: "from-gold/60", text: "text-gold", glow: "rgba(226,184,79,0.22)" },
  lime: { ring: "from-lime/60", text: "text-lime", glow: "rgba(200,241,105,0.2)" },
  cream: { ring: "from-cream/50", text: "text-cream", glow: "rgba(244,241,230,0.16)" },
};

/* মাউসের সাথে আলো ঘোরা spotlight কার্ড */
function OfferCard({ o, i }) {
  const ref = useRef(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const t = TONES[o.tone];
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${t.glow}, transparent 70%)`;

  return (
    <motion.article
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-moss/70 p-7 sm:p-8"
    >
      <motion.div style={{ background: bg }} className="pointer-events-none absolute inset-0" />
      <div className={`pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-gradient-to-br ${t.ring} to-transparent opacity-30 blur-2xl`} />

      <div className="relative flex items-start justify-between">
        <span className={`grid size-14 place-items-center rounded-2xl border border-white/10 bg-ink/50 ${t.text}`}>
          <Icon name={o.icon} className="size-7" />
        </span>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-cream/60">{o.duration}</span>
      </div>

      <div className="relative mt-10">
        <p className="text-sm text-cream/55">শেয়ার ক্রয়ে</p>
        <p className={`font-display text-8xl font-bold leading-none ${t.text}`}>
          {o.shares}
          <span className="ml-2 text-2xl font-semibold text-cream/70">টি</span>
        </p>
        <h3 className="mt-5 font-display text-2xl font-bold leading-snug sm:text-3xl">{o.title}</h3>
      </div>
    </motion.article>
  );
}

export default function Offers() {
  return (
    <section id="offers" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-lime/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>মেলা উপলক্ষে বিশেষ উপহার</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] sm:text-6xl">
              <WordReveal text={"শুধুমাত্র প্রথম ২০ জনের জন্য"} highlight={[2]} />
            </h2>
          </div>
          <Reveal className="max-w-sm text-cream/65">
            ⏳ সুযোগ সীমিত — দেরি না করে আজই যোগাযোগ করুন। এছাড়াও থাকছে আকর্ষণীয় মেলা মেগা অফার ও বিভিন্ন পুরস্কার!
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3" style={{ perspective: 1200 }}>
          {OFFERS.map((o, i) => (
            <OfferCard key={o.title} o={o} i={i} />
          ))}
        </div>

        {/* মেগা অফার ব্যানার */}
        <Reveal delay={0.1} className="mt-5">
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] bg-lime p-7 text-ink sm:p-10 md:flex-row md:items-center">
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 font-display text-[9rem] font-extrabold leading-none text-ink/[0.07] sm:text-[13rem]"
              animate={{ x: [0, -30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              MEGA
            </motion.span>
            <div className="relative flex items-center gap-5">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-ink text-lime">
                <Icon name="gift" className="size-8" />
              </span>
              <div>
                <p className="font-display text-3xl font-bold sm:text-4xl">মেলা মেগা অফার 🔥</p>
                <p className="mt-1 text-ink/70">আকর্ষণীয় অফার ও বিভিন্ন পুরস্কার — বিস্তারিত মেলায় এবং হটলাইনে।</p>
              </div>
            </div>
            <div className="relative">
              <Button href={`tel:${PHONES[0].tel}`} variant="dark" icon="phone">
                অফার জানতে কল করুন
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
