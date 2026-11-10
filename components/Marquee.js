import { MARQUEE } from "@/data/site";
import { Icon } from "./ui";

function Row({ reverse = false, variant }) {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"} group-hover:[animation-play-state:paused]`}>
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-display text-2xl font-semibold sm:text-4xl">
              <span className={variant === "outline" ? "text-outline" : ""}>{t}</span>
              <Icon name="star" className={`size-5 sm:size-6 ${variant === "outline" ? "text-lime/60" : "text-ink"}`} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="মেলার মূল বার্তা" className="group relative overflow-hidden py-6 sm:py-10">
      <div className="-rotate-2 bg-lime py-3 text-ink sm:py-4">
        <Row />
      </div>
      <div className="mt-3 rotate-1 py-2">
        <Row reverse variant="outline" />
      </div>
    </section>
  );
}
