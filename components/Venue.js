"use client";

import { OFFICE, PHONES, VENUE } from "@/data/site";
import { Eyebrow, Icon, Reveal, WordReveal } from "./ui";

export default function Venue() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(VENUE.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.mapQuery)}`;

  return (
    <section id="venue" className="relative bg-paper px-5 py-24 text-ink sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Eyebrow light>মেলার স্থান</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] sm:text-6xl">
          <WordReveal text="যাত্রাবাড়ী থানার ঠিক পাশেই" />
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/5">
            <iframe
              title="ব্লু লোটাস চাইনিজ রেস্টুরেন্টের ম্যাপ"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full grayscale-[30%]"
            />
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.05} className="rounded-[2rem] bg-ink p-7 text-cream">
              <p className="flex items-center gap-2 text-sm text-lime">
                <Icon name="calendar" className="size-4" /> ১৭, ১৮ ও ১৯ নভেম্বর
              </p>
              <p className="mt-4 font-display text-3xl font-bold">{VENUE.name}</p>
              <p className="mt-2 text-cream/65">{VENUE.address}</p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-display font-semibold text-ink"
              >
                Google Maps-এ দিক নির্দেশনা
                <Icon name="arrow" className="size-4 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Reveal>

            <Reveal delay={0.1} className="rounded-[2rem] border border-ink/10 bg-white p-7">
              <div className="flex gap-3">
                <Icon name="office" className="mt-1 size-5 shrink-0 text-pine" />
                <div>
                  <p className="font-display text-lg font-semibold">প্রধান কার্যালয়</p>
                  <p className="mt-1 text-sm text-ink/60">{OFFICE.head}</p>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <Icon name="leaf" className="mt-1 size-5 shrink-0 text-pine" />
                <div>
                  <p className="font-display text-lg font-semibold">প্রজেক্ট</p>
                  <p className="mt-1 text-sm text-ink/60">{OFFICE.project}</p>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <Icon name="phone" className="mt-1 size-5 shrink-0 text-pine" />
                <div>
                  <p className="font-display text-lg font-semibold">বিস্তারিত জানতে</p>
                  {PHONES.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="block text-sm text-ink/70 hover:text-pine">
                      {p.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
