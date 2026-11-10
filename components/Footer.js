import { NAV, OFFICE, PHONES, SITE, SOCIAL } from "@/data/site";
import { Icon } from "./ui";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink px-5 pb-28 pt-16 sm:px-8 sm:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Probashi Resort & Agro Industries" width={56} height={56} className="size-14 rounded-full bg-white p-0.5" />
            <div>
              <p className="font-display text-xl font-bold">{SITE.brand}</p>
              <p className="text-xs tracking-[0.2em] text-cream/45">COMMUNITY IS POWER</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">{SITE.tagline} — এটাই হোক আমাদের অঙ্গীকার।</p>
          <div className="mt-5 flex gap-2">
            {[
              { href: SOCIAL.facebookResort, label: "প্রবাসী রিসোর্ট ফেসবুক পেইজ" },
              { href: SOCIAL.facebookQari, label: "কারী নাজমুল হাসান ফেসবুক পেইজ" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="grid size-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
              >
                <Icon name="facebook" className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-sm text-cream/45">দ্রুত লিংক</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-cream/75 transition-colors hover:text-lime">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 text-sm">
          <p className="font-display text-sm text-cream/45">যোগাযোগ</p>
          {PHONES.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-2 text-base text-cream/85 hover:text-lime">
              <Icon name="phone" className="size-4 text-lime" /> {p.label}
            </a>
          ))}
          <p className="text-cream/55">{OFFICE.head}</p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-cream/40 sm:flex-row sm:justify-between">
        <p>© ২০২৬ {SITE.brandEn}. সর্বস্বত্ব সংরক্ষিত।</p>
        <p>{SITE.domain}</p>
      </div>
    </footer>
  );
}
