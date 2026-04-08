"use client";

import { cn } from "@/lib/utils";

const rows = [
  {
    direction: "left",
    speed: "40s",
    words: [
      "Track",
      "Strides",
      "Pace",
      "Stride",
      "Tempo",
      "Kudos",
      "Trail",
      "Fartlek",
      "VO2max",
      "Cadence",
      "Split",
      "PR",
    ],
  },
  {
    direction: "right",
    speed: "45s",
    words: [
      "Log Fuel",
      "Pace Variance",
      "Leaderboard",
      "Create Challenge",
      "Heart Rate",
      "Negative Split",
      "Warm Up",
      "Cool Down",
    ],
  },
  {
    direction: "left",
    speed: "50s",
    words: [
      "Interval",
      "Cadence",
      "Breadcrumbs",
      "Paceboard",
      "Runfile",
      "Threshold",
      "Base Building",
      "Tapering",
    ],
  },
  {
    direction: "right",
    speed: "35s",
    words: [
      "Night Run",
      "Best Pace",
      "Domine seu Ritmo",
      "Race Day",
      "Brick Session",
      "Tempo Run",
      "Hill Repeats",
    ],
    highlight: "Domine seu Ritmo",
  },
  {
    direction: "left",
    speed: "42s",
    words: [
      "Long Run",
      "Resume",
      "Threshold Run",
      "Duration",
      "Easy Run",
      "Progression",
      "Aerobic Base",
      "Strides",
    ],
  },
  {
    direction: "right",
    speed: "48s",
    words: [
      "Recovery Run",
      "Goal Progress",
      "Monthly Mileage",
      "Avg Pace",
      "Elevation Gain",
      "Negative Split",
      "Training Load",
    ],
  },
  {
    direction: "left",
    speed: "38s",
    words: [
      "Stride",
      "Pace",
      "Splits",
      "Trail",
      "Kudos",
      "Track",
      "Tempo",
      "Fartlek",
      "Zone 2",
      "Lactate",
      "VO2",
      "PR",
    ],
  },
];

function MarqueeRow({
  words,
  direction,
  speed,
  highlight,
}: {
  words: string[];
  direction: string;
  speed: string;
  highlight?: string;
}) {
  // Duplicate for seamless loop
  const items = [...words, ...words];

  return (
    <div className="relative overflow-hidden py-1.5">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div
        className={cn(
          "flex gap-3 w-max",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{
          animationDuration: speed,
        }}
      >
        {items.map((word, i) => {
          const isHighlight = word === highlight;
          return (
            <span
              key={`${word}-${i}`}
              className={cn(
                "inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-default select-none",
                isHighlight
                  ? "bg-gradient-to-r from-primary to-primary-dark text-bg font-bold shadow-[0_0_30px_rgba(130,255,153,0.3)] scale-110"
                  : "border border-white/[0.06] text-text-muted/40 hover:text-text hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(130,255,153,0.15)]"
              )}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function RunningMarquee() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-primary/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative">
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            words={row.words}
            direction={row.direction}
            speed={row.speed}
            highlight={row.highlight}
          />
        ))}
      </div>
    </section>
  );
}
