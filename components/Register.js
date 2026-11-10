"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DAYS, PHONES, VENUE, WHATSAPP } from "@/data/site";
import { EASE, Eyebrow, Icon, Reveal, WordReveal, toBn } from "./ui";

const INTERESTS = ["নিরাপদ খাদ্য", "হালাল বিনিয়োগ", "শেয়ার ও উপহার অফার", "প্রজেক্ট ভিজিট"];

// বাংলা অঙ্ক → ইংরেজি অঙ্ক, তারপর শুধু সংখ্যা
const normalizePhone = (s) =>
  s.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d)).replace(/[^\d]/g, "").replace(/^(?:00)?880/, "0");

function Field({ id, error, children }) {
  return (
    <div>
      <div className="relative">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id={`${id}-err`}
            className="mt-1.5 pl-1 text-sm text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ফ্লোটিং লেবেল ইনপুট */
function Input({ id, label, value, onChange, error, type = "text", ...rest }) {
  return (
    <Field id={id} error={error}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`peer block w-full rounded-2xl border bg-white/[0.04] px-4 pb-2.5 pt-6 text-base text-cream outline-none transition-colors placeholder:text-transparent focus:bg-white/[0.07] ${
          error ? "border-red-400/60" : "border-white/10 focus:border-lime"
        }`}
        {...rest}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 origin-left text-base text-cream/50 transition-all duration-300 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:text-lime peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.8]"
      >
        {label}
      </label>
    </Field>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 sm:text-[15px] ${
        active ? "border-lime text-ink" : "border-white/15 text-cream/75 hover:border-white/35"
      }`}
    >
      {active && (
        <motion.span className="absolute inset-0 rounded-full bg-lime" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35, ease: EASE }} />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

const EMPTY = { name: "", phone: "", area: "", day: "", guests: 1, interests: [], note: "" };

export default function Register() {
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (v) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const toggleInterest = (t) =>
    setF((p) => ({ ...p, interests: p.interests.includes(t) ? p.interests.filter((x) => x !== t) : [...p.interests, t] }));

  const validate = () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = "অনুগ্রহ করে আপনার নাম লিখুন";
    if (!/^01[3-9]\d{8}$/.test(normalizePhone(f.phone))) e.phone = "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (যেমন: ০১৭XXXXXXXX)";
    if (!f.day) e.day = "কোন দিন আসবেন তা বেছে নিন";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const msg = [
      "🌿 *একক মেলা — রেজিস্ট্রেশন*",
      "",
      `👤 নাম: ${f.name.trim()}`,
      `📞 মোবাইল: ${normalizePhone(f.phone)}`,
      f.area.trim() && `📍 এলাকা: ${f.area.trim()}`,
      `📅 আসবেন: ${f.day} নভেম্বর`,
      `👥 মোট জন: ${toBn(f.guests)}`,
      f.interests.length && `💡 আগ্রহ: ${f.interests.join(", ")}`,
      f.note.trim() && `📝 মন্তব্য: ${f.note.trim()}`,
      "",
      "— probashiagromela.com থেকে পাঠানো",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="register" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-lime/10 blur-[150px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* বাম পাশ */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>রেজিস্ট্রেশন</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] sm:text-6xl">
            <WordReveal text={"আপনার আসন আগেই নিশ্চিত করুন"} highlight={[2]} />
          </h2>
          <Reveal delay={0.1} className="mt-6 max-w-md text-cream/65">
            ফর্মটি পূরণ করে পাঠালে আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন। প্রথম ২০ জনের বিশেষ উপহারের সুযোগ মিস করবেন না।
          </Reveal>

          <Reveal delay={0.15} className="mt-8 space-y-3">
            <div className="flex items-center gap-4 rounded-2xl border border-lime/30 bg-lime/[0.07] p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime text-ink">
                <Icon name="calendar" className="size-5" />
              </span>
              <div>
                <p className="text-xs text-cream/55">তারিখ</p>
                <p className="font-display text-xl font-bold text-lime">১৭, ১৮ ও ১৯ নভেম্বর</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-lime/30 bg-lime/[0.07] p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lime text-ink">
                <Icon name="pin" className="size-5" />
              </span>
              <div>
                <p className="text-xs text-cream/55">স্থান</p>
                <p className="font-display text-xl font-bold text-lime">{VENUE.name}</p>
                <p className="text-sm text-cream/70">৩২২/এ, দক্ষিণ যাত্রাবাড়ী (থানার পাশে)</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-6 text-sm text-cream/55">
            ফর্ম পূরণে সমস্যা হলে সরাসরি কল করুন:{" "}
            {PHONES.map((p, i) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="text-cream underline decoration-lime/60 underline-offset-4 hover:text-lime">
                {p.label}
                {i < PHONES.length - 1 ? ", " : ""}
              </a>
            ))}
          </Reveal>
        </div>

        {/* ফর্ম */}
        <Reveal delay={0.1}>
          <div className="glow-border rounded-[2rem]">
            <div className="relative overflow-hidden rounded-[2rem] bg-moss/95 p-5 backdrop-blur-xl sm:p-8">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    noValidate
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-2xl font-bold">রেজিস্ট্রেশন ফর্ম</p>
                      <span className="text-xs text-cream/45">* চিহ্নিত ঘর আবশ্যক</span>
                    </div>

                    <Input id="name" label="নাম *" value={f.name} onChange={set("name")} error={errors.name} autoComplete="name" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        id="phone"
                        label="মোবাইল নম্বর *"
                        type="tel"
                        inputMode="tel"
                        value={f.phone}
                        onChange={set("phone")}
                        error={errors.phone}
                        autoComplete="tel"
                      />
                      <Input id="area" label="এলাকা / ঠিকানা" value={f.area} onChange={set("area")} autoComplete="address-level2" />
                    </div>

                    <fieldset>
                      <legend className="mb-3 text-sm text-cream/60">কোন দিন আসবেন? *</legend>
                      <div className="grid grid-cols-3 gap-2">
                        {DAYS.map((d) => {
                          const active = f.day === d.day;
                          return (
                            <button
                              type="button"
                              key={d.day}
                              onClick={() => set("day")(d.day)}
                              aria-pressed={active}
                              className={`relative overflow-hidden rounded-2xl border px-2 py-3 text-center transition-colors duration-300 ${
                                active ? "border-lime" : errors.day ? "border-red-400/60" : "border-white/10 hover:border-white/30"
                              }`}
                            >
                              {active && (
                                <motion.span layoutId="day-pill" className="absolute inset-0 bg-lime" transition={{ duration: 0.45, ease: EASE }} />
                              )}
                              <span className={`relative block font-display text-2xl font-bold ${active ? "text-ink" : ""}`}>{d.day}</span>
                              <span className={`relative block text-xs ${active ? "text-ink/70" : "text-cream/50"}`}>{d.weekday}</span>
                            </button>
                          );
                        })}
                      </div>
                      <AnimatePresence>
                        {errors.day && (
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-1.5 pl-1 text-sm text-red-300">
                            {errors.day}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </fieldset>

                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3 pl-4">
                      <span className="text-cream/70">কতজন আসবেন?</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label="কমান"
                          onClick={() => set("guests")(Math.max(1, f.guests - 1))}
                          className="grid size-10 place-items-center rounded-full border border-white/15 text-xl hover:border-lime"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-display text-2xl font-bold tabular-nums" aria-live="polite">
                          {toBn(f.guests)}
                        </span>
                        <button
                          type="button"
                          aria-label="বাড়ান"
                          onClick={() => set("guests")(Math.min(20, f.guests + 1))}
                          className="grid size-10 place-items-center rounded-full bg-lime text-ink"
                        >
                          <Icon name="plus" className="size-4" />
                        </button>
                      </div>
                    </div>

                    <fieldset>
                      <legend className="mb-3 text-sm text-cream/60">কোন বিষয়ে জানতে আগ্রহী?</legend>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((t) => (
                          <Chip key={t} active={f.interests.includes(t)} onClick={() => toggleInterest(t)}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </fieldset>

                    <div className="relative">
                      <textarea
                        id="note"
                        rows={3}
                        value={f.note}
                        onChange={(e) => set("note")(e.target.value)}
                        placeholder="কোনো প্রশ্ন বা মন্তব্য থাকলে লিখুন (ঐচ্ছিক)"
                        className="block w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-cream outline-none transition-colors placeholder:text-cream/40 focus:border-lime"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-lime py-2.5 pl-6 pr-2.5 font-display text-lg font-bold text-ink"
                    >
                      <span className="relative z-10">রেজিস্ট্রেশন পাঠান</span>
                      <span className="relative z-10 grid size-11 place-items-center rounded-xl bg-ink text-lime transition-transform duration-500 group-hover:rotate-45">
                        <Icon name="arrow" className="size-5" />
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-0" />
                    </motion.button>
                    <p className="text-center text-xs text-cream/45">“পাঠান” চাপলে আপনার তথ্যসহ WhatsApp খুলবে — সেখানে Send চাপুন।</p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex min-h-[460px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                      className="grid size-24 place-items-center rounded-full bg-lime text-ink shadow-[0_0_80px] shadow-lime/40"
                    >
                      <svg viewBox="0 0 24 24" className="size-12" aria-hidden="true">
                        <motion.path
                          d="M5 12.5 10 17.5 19 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                        />
                      </svg>
                    </motion.span>
                    <p className="mt-7 font-display text-3xl font-bold">জাযাকাল্লাহু খাইরান, {f.name.trim().split(" ")[0]}!</p>
                    <p className="mt-3 max-w-sm text-cream/65">
                      WhatsApp-এ মেসেজটি Send করলেই আপনার রেজিস্ট্রেশন আমাদের কাছে পৌঁছাবে। {f.day} নভেম্বর আপনার অপেক্ষায় থাকব।
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <a href={`tel:${PHONES[0].tel}`} className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 font-display font-semibold text-ink">
                        <Icon name="phone" className="size-4" /> সরাসরি কল করুন
                      </a>
                      <button
                        onClick={() => {
                          setF(EMPTY);
                          setSent(false);
                        }}
                        className="rounded-full border border-white/15 px-5 py-3 text-cream/80 hover:border-lime"
                      >
                        আরেকজনের রেজিস্ট্রেশন
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
