"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FONT_PRIMARY = "font-gembero";
const FONT_SECONDARY = "font-fredoka";

/* Colors used: #db2627 (red) · #f4a261 (orange) · #fdf2e9 (cream) · #2a2f4a (navy) */

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------- Icons ------------------------------------ */
type IconProps = { className?: string; strokeWidth?: number };

const baseSvg = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PizzaSliceIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...baseSvg} strokeWidth={strokeWidth} className={className}>
      {/* crust */}
      <path d="M4 14c13-7 27-7 40 0" />
      <path d="M6 19c12-5 24-5 36 0" />
      <path d="M4 14l2 5M44 14l-2 5" />
      {/* slice */}
      <path d="M6 19l18 26 18-26" />
      {/* toppings */}
      <circle cx="17" cy="25" r="3" />
      <circle cx="31" cy="25" r="3" />
      <circle cx="24" cy="35" r="2.4" />
      <path d="M22 13l2 3 2-3" />
    </svg>
  );
}

const ClocheIcon = ({ className, strokeWidth = 1.8 }: IconProps) => (
  <svg {...baseSvg} strokeWidth={strokeWidth} className={className}>
    <path d="M6 32a18 18 0 0 1 36 0z" />
    <path d="M3 37h42" />
    <circle cx="24" cy="10" r="2.5" />
    <path d="M13 25a11 11 0 0 1 6-7" />
  </svg>
);

const PeopleIcon = ({ className, strokeWidth = 1.8 }: IconProps) => (
  <svg {...baseSvg} strokeWidth={strokeWidth} className={className}>
    <circle cx="24" cy="14" r="5" />
    <path d="M14 36c0-6 4-10 10-10s10 4 10 10z" />
    <circle cx="10" cy="20" r="4" />
    <path d="M2 36c0-5 3-8 8-8" />
    <circle cx="38" cy="20" r="4" />
    <path d="M46 36c0-5-3-8-8-8" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ------------------------------ Rotating badge ----------------------------- */
function RotatingBadge({ reduce }: { reduce: boolean }) {
  return (
    <div data-circle className="relative h-24 w-24 sm:h-28 sm:w-28">
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <defs>
          <path id="reservation-circle-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text fontSize="9.5" letterSpacing="2.0" fill="#f4a261" className={`${FONT_SECONDARY}`}>
          <textPath href="#reservation-circle-path">GOOD FOOD • GOOD VIBES • GREAT COMPANY • </textPath>
        </text>
      </motion.svg>
      <PizzaSliceIcon className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-[#f4a261] sm:h-12 sm:w-12" strokeWidth={1.6} />
    </div>
  );
}

/* --------------------------------- Data ------------------------------------ */
const FEATURES = [
  { title: "Great Food", sub: "Fresh & Flavorful", Icon: ClocheIcon },
  { title: "Fresh Ingredients", sub: "Always Local", Icon: PizzaSliceIcon },
  { title: "Good Times", sub: "Every Day", Icon: PeopleIcon },
];

type ReservationProps = {
  /** Replace with your own image path (put the file in /public/images) */
  imageSrc?: string;
  imageAlt?: string;
  phone?: string;
  phoneHref?: string;
  ctaHref?: string;
};

/* ------------------------------- Component --------------------------------- */
export default function Reservation({
  imageSrc = "/images/reservations.jpg",
  imageAlt = "Candle-lit restaurant table",
  phone = "(403) 246-2002",
  phoneHref = "tel:+15551234567",
  ctaHref = "#contact",
}: ReservationProps) {
  const root = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();

  /* GSAP: one scroll-triggered entrance timeline */
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });

        tl.from("[data-circle]", { autoAlpha: 0, scale: 0.6, duration: 1 }, 0.1)
          .from("[data-image-wrap]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" }, 0.1)
          .from("[data-image]", { scale: 1.3, duration: 1.8 }, "<")
          .from("[data-outline]", { autoAlpha: 0, x: -30, y: -30, duration: 1.2 }, "<0.3")
          .from("[data-eyebrow-line]", { scaleX: 0, transformOrigin: "left center", duration: 0.8 }, 0.2)
          .from("[data-eyebrow-text]", { autoAlpha: 0, x: -16, duration: 0.6 }, "<0.2")
          .from("[data-line]", { yPercent: 115, duration: 1.1, stagger: 0.14, ease: "power4.out" }, "<0.1")
          .from("[data-fade]", { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.15 }, "-=0.7")
          .from("[data-feature]", { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.15 }, "-=0.4")
          .from("[data-notch]", { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.6")
          .from("[data-vertical]", { autoAlpha: 0, duration: 1 }, "-=0.6");
      },
      root.current ?? undefined
    );

    return () => mm.revert();
  }, []);

  /* Framer Motion: gentle floating for decorative pizza slices */
  const float = (delay = 0, rotate = 6) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -14, 0], rotate: [0, rotate, 0] },
          transition: { duration: 7, ease: "easeInOut" as const, repeat: Infinity, delay },
        };

  return (
    <section
      id="reservation"
      ref={root}
      className={`${FONT_SECONDARY}  relative isolate overflow-hidden bg-[#2e2424] text-[#fdf2e9]`}
    >
      {/* ---------- Decoration ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#db2627]/10 blur-3xl" />
      <motion.div aria-hidden="true" {...float(0, -8)} className="pointer-events-none absolute -left-14 -top-10 -z-10 w-56 -rotate-[25deg] text-[#fdf2e9]/10 sm:w-72">
        <PizzaSliceIcon strokeWidth={0.35} />
      </motion.div>
      <motion.div aria-hidden="true" {...float(1.5, 8)} className="pointer-events-none absolute -bottom-8 -left-8 z-0 w-40 rotate-[18deg] text-[#f4a261]/50 sm:w-56">
        <PizzaSliceIcon strokeWidth={0.4} />
      </motion.div>

      {/* ---------- Rotating badge (top middle) ---------- */}
      <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center lg:top-10 lg:-translate-x-[2%]">
        <RotatingBadge reduce={reduce} />
      </div>

      {/* ---------- Vertical tagline ---------- */}
      <div data-vertical className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
        <span className="rotate-180 text-[12px] uppercase tracking-[0.4em] text-[#fdf2e9]/60 [writing-mode:vertical-rl]">
          Dine • Share • Relax • Enjoy
        </span>
        <span className="h-24 w-px bg-[#f4a261]/50" />
      </div>

      {/* ---------- Layout ---------- */}
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-5 pb-16 pt-36 sm:px-10 lg:min-h-screen lg:grid-cols-[1.05fr_1fr] lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
        {/* ---- Left: content ---- */}
        <div className="relative z-10 flex flex-col justify-center lg:py-28 lg:pl-[8vw] lg:pr-8">
          <div className="flex items-center gap-4">
            <span data-eyebrow-line className="h-px w-12 bg-[#f4a261] sm:w-14" />
            <span data-eyebrow-text className="text-[14px] uppercase tracking-[0.4em] text-[#f4a261]">
              Reservation
            </span>
          </div>

          <h2
            className={`${FONT_PRIMARY} mt-6 text-[3.25rem] font-medium leading-none tracking-[-0.02em] sm:text-7xl lg:text-[5.25rem] xl:text-[6.5rem]`}
          >
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-line className="block">Book Your</span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span data-line className="block text-[#b98a4e]">
                Table
              </span>
            </span>
          </h2>

          <p data-fade className="mt-6 max-w-md text-base leading-8 text-[#fdf2e9]/85 sm:text-lg">
            Good food brings people together. Call us to reserve your table and enjoy a memorable dining experience with us.
          </p>

{/* #db2627, #f4a261, #fdf2e9, #2s2f4a */}
          {/* CTA */}
        <div
  data-fade
  className="mt-9 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
>
  {/* Phone CTA */}
  <motion.a
    href={phoneHref}
    whileHover={reduce ? undefined : { scale: 1.02 }}
    whileTap={reduce ? undefined : { scale: 0.98 }}
    className="group flex min-w-0 w-full items-center gap-3 rounded-full border border-[#f4a261] bg-gradient-to-r from-[#db2627]/30 to-[#2a2f4a]/80 py-3 pl-3 pr-4 transition-colors sm:w-auto sm:gap-4 sm:pr-8"
  >
    <motion.span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4a261] text-[#2a2f4a] sm:h-14 sm:w-14"
      animate={
        reduce ? undefined : { rotate: [0, -14, 12, -8, 6, 0] }
      }
      transition={{
        duration: 1.1,
        repeat: Infinity,
        repeatDelay: 3.5,
        ease: "easeInOut",
      }}
    >
      <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6" />
    </motion.span>

    <span className="flex min-w-0 flex-1 flex-col">
      <span className="text-[9px] uppercase tracking-[0.16em] text-[#f4a261] min-[380px]:text-[10px] sm:text-xs sm:tracking-[0.2em]">
        Call for reservations
      </span>

      <span className="break-all text-sm font-medium leading-tight tracking-normal text-white min-[380px]:text-base sm:break-normal sm:text-xl sm:tracking-wide lg:text-2xl">
        {phone}
      </span>
    </span>
  </motion.a>
</div>

          {/* Features */}
          <ul className="mt-12 grid max-w-xl gap-6 sm:grid-cols-3 sm:gap-0">
            {FEATURES.map(({ title, sub, Icon }, i) => (
              <li
                key={title}
                data-feature
                className={`flex items-center gap-4 sm:flex-col sm:gap-3 sm:px-4 sm:text-center ${
                  i > 0 ? "sm:border-l sm:border-[#f4a261]/40" : "sm:pl-0"
                }`}
              >
                <motion.span
                  whileHover={reduce ? undefined : { y: -4, rotate: -6, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="block h-10 w-10 shrink-0 text-[#f4a261] sm:h-11 sm:w-11"
                >
                  <Icon />
                </motion.span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase leading-5 tracking-[0.22em]">{title}</span>
                  <span className="mt-1 block text-sm text-[#fdf2e9]/80">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Right: arched image ---- */}
        <div className=" w-full relative h-[460px] sm:h-[620px] lg:h-auto">
          <div className="absolute inset-0 lg:bottom-12 lg:left-6 lg:right-[8%]">
            {/* gold arch outline */}
            <div
              data-outline
              className="pointer-events-none absolute -left-3 -top-3 bottom-0 right-0 rounded-t-[220px] border-l border-t border-[#f4a261]/60 lg:-bottom-12 lg:-left-3 lg:-top-2 lg:rounded-t-none lg:rounded-tl-[360px]"
            />

            {/* image */}
            <div
              data-image-wrap
              className="absolute inset-0 overflow-hidden rounded-t-[220px] bg-[#1d2136] lg:rounded-t-none lg:rounded-tl-[360px]"
            >
              <div data-image className="absolute inset-0">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a2f4a]/50 via-transparent to-[#2a2f4a]/20" />
            </div>

            {/* bottom-right notch with script tagline */}
            
          </div>
        </div>
      </div>
    </section>
  );
}