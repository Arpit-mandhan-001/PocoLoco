"use client";

/**
 * ImageMarquee.tsx
 * Next.js (App Router) + TypeScript + Tailwind + Framer Motion
 *
 * npm i framer-motion
 *
 * Usage:  import ImageMarquee from "@/components/ImageMarquee";
 *         <ImageMarquee />
 */

import Image from "next/image";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  1. DUMMY PATHS – replace with your own images                      */
/*     (put them in /public/images/marquee/)                           */
/*                                                                     */
/*  w / h   = card size in px on desktop (scales down automatically)   */
/*  rotate  = tilt in degrees (negative = left, positive = right)      */
/*  y       = vertical offset in px, so the row looks hand-placed      */
/* ------------------------------------------------------------------ */
const ITEMS = [
  { src: "/images/footer_bg.jpg", w: 250, h: 360, rotate: -3, y: 0 },
  { src: "/images/footer_bg.jpg", w: 270, h: 300, rotate: 12, y: 30 },
  { src: "/images/footer_bg.jpg", w: 330, h: 390, rotate: -6, y: -10 },
  { src: "/images/footer_bg.jpg", w: 380, h: 260, rotate: 0, y: 10 },
  { src: "/images/footer_bg.jpg", w: 290, h: 360, rotate: 5, y: -20 },
  { src: "/images/footer_bg.jpg", w: 330, h: 330, rotate: -4, y: 20 },
  { src: "/images/footer_bg.jpg", w: 260, h: 340, rotate: 8, y: -5 },
  { src: "/images/footer_bg.jpg", w: 340, h: 280, rotate: -9, y: 15 },
];

/* ------------------------------------------------------------------ */
/*  2. SETTINGS                                                        */
/* ------------------------------------------------------------------ */
const DURATION = 120; // seconds for one full loop (bigger = slower)
const GAP = 22; // px between cards on desktop

export default function ImageMarquee() {
  return (
    <section
      aria-label="Photo gallery"
      // --u scales every size: phone 0.55, tablet 0.75, desktop 1
      className="relative overflow-hidden bg-transparent py-[calc(var(--u)*56px)] [--u:0.55] sm:[--u:0.75] lg:[--u:1]"
    >
      <style>{`
        @keyframes slice-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .slice-marquee-track {
          animation: slice-marquee var(--dur, 45s) linear infinite;
          will-change: transform;
        }
        .slice-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .slice-marquee-track { animation-play-state: paused; }
        }
      `}</style>

      {/* the track holds the list TWICE, then slides left by exactly 50% = seamless loop */}
      <div
        className="slice-marquee-track flex w-max items-center"
        style={{ ["--dur" as string]: `${DURATION}s` }}
      >
        {[0, 1].map((copy) =>
          ITEMS.map((item, i) => (
            <div
              key={`${copy}-${i}`}
              aria-hidden={copy === 1}
              className="shrink-0"
              style={{
                paddingRight: `calc(var(--u) * ${GAP}px)`,
                transform: `translateY(calc(var(--u) * ${item.y}px))`,
              }}
            >
              <motion.div
                initial={{ rotate: item.rotate }}
                whileHover={{ rotate: 0, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative overflow-hidden border-[4px] border-black bg-neutral-200 md:border-[6px]"
                style={{
                  width: `calc(var(--u) * ${item.w}px)`,
                  height: `calc(var(--u) * ${item.h}px)`,
                }}
              >
                <Image
                  src={item.src}
                  alt={copy === 0 ? `Gallery photo ${i + 1}` : ""}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 290px, 210px"
                  className="object-cover"
                  draggable={false}
                />
              </motion.div>
            </div>
          )),
        )}
      </div>
    </section>
  );
}
