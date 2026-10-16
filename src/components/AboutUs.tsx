"use client";

/**
 * AboutSection (light redesign)
 * -------------------------------------------------------------
 * Stack: Next.js (App Router) + Tailwind + Framer Motion + GSAP
 *
 * Only three colors are used:
 *   #db2627 (red)  #f4a261 (orange)  #fdf2e9 (cream)
 *
 * Tailwind tokens expected (add to your theme / globals.css):
 *
 *   Tailwind v4 (globals.css)
 *   @theme {
 *     --color-brand-red:    #db2627;
 *     --color-brand-orange: #f4a261;
 *     --color-brand-cream:  #fdf2e9;
 *
 *     --font-heading: var(--your-serif-font);   // italic serif headline
 *     --font-body:    var(--your-sans-font);    // paragraph + label
 *     --font-script:  var(--your-script-font);  // handwritten accents
 *   }
 *
 *   Tailwind v3 (tailwind.config.ts)
 *   theme.extend.colors.brand     = { red, orange, cream }
 *   theme.extend.fontFamily       = { heading, body, script }
 *
 * Replace the image paths below with your own.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import ImageMarquee from "./about_us_marque";

/* ---------- dummy image sources (replace) ---------- */
const MAIN_IMAGE = "/images/blog2.png"; // large image on the right
const POLAROID_IMAGE = "/images/pizza2.webp"; // taped photo

/* ---------- motion variants ---------- */
const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const reveal: Variants = {
  hidden: { opacity: 0, x: 60, scale: 0.96 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease } },
};

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);

  /* GSAP: underline draw + floating stickers */
  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const swoosh =
        root.current!.querySelector<SVGPathElement>("[data-swoosh]");
      if (swoosh) {
        const len = swoosh.getTotalLength();
        gsap.set(swoosh, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(swoosh, {
          strokeDashoffset: 0,
          duration: 1.4,
          delay: 1.1,
          ease: "power2.out",
        });
      }

      if (reduce) return;

      gsap.to("[data-float-a]", {
        y: -14,
        rotate: "+=6",
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-float-b]", {
        y: 12,
        rotate: "-=5",
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-polaroid]", {
        y: -10,
        rotate: 4,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to("[data-blob]", {
        scale: 1.06,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate w-full overflow-hidden bg-[#FAF7F0] text-[#292521] pt-10"
    >
      {/* Background decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-blob
          className="absolute -right-32 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[#E9B878]/25 blur-3xl sm:h-[44rem] sm:w-[44rem]"
        />

        <div className="absolute -bottom-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-[#B94332]/[0.07] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #A66A42 1px, transparent 1.3px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Main layout */}
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-6 py-24 sm:px-10 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-[5%] lg:py-2">
        {/* About text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 pt-6 lg:pl-[7%] lg:pt-0"
        >
          {/* Eyebrow */}
          <motion.div variants={rise} className="flex items-center gap-4">
            <span
              data-eyebrow-line
              className="h-px w-12 bg-[#b91e09] sm:w-14"
            />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.5em] text-[#9C392C] sm:text-xs">
              About Us
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={rise}
            className="mt-6 font-heading text-[2.6rem] font-gambero leading-[1.08] tracking-tight text-[#292521] sm:text-6xl lg:text-[4.2rem] xl:text-[5rem]"
          >
            <span className="block font-semibold">Good Food</span>

            <span className="relative font-bold block w-fit pb-5 text-[#B94332]">
              Brings People Together
              <svg
                aria-hidden
                viewBox="0 0 400 16"
                className="absolute -bottom-1 left-0 h-3 w-full"
                fill="none"
                stroke="#C45A40"
                strokeWidth="3.5"
                strokeLinecap="round"
                preserveAspectRatio="none"
              >
                <path data-swoosh d="M4 10 L396 10" />
              </svg>
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={rise}
            className="mt-8 max-w-[34rem] font-fredoka text-base leading-[1.9] text-[#4a4035] sm:text-[18px]"
          >
            At our restaurant, we believe great food isn’t just about what’s on
            the plate — it’s about the moments shared around it. We serve fresh,
            high-quality ingredients, bold flavours and classic favourites, all
            made with passion and care.
          </motion.p>

          {/* Brand highlights */}
          <motion.ul
            variants={rise}
            className="mt-9 flex flex-wrap items-center gap-3 font-script text-xl sm:text-2xl"
          >
            {[
              "Crafted with Care",
              "Bursting with Flavour",
              "Made to Remember",
              "Loved By All",
            ].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: [0, -4, 0],
                  scale: 1,
                }}
                transition={{
                  opacity: { duration: 0.5, delay: i * 0.12 },
                  scale: { duration: 0.5, delay: i * 0.12 },
                  y: {
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  rotate: 0,
                  boxShadow: "0px 8px 20px rgba(185, 67, 50, 0.25)",
                  transition: { type: "spring", stiffness: 350, damping: 12 },
                }}
                whileTap={{
                  scale: 0.94,
                  transition: { duration: 0.1 },
                }}
                className={`cursor-pointer font-fredoka font-medium select-none rounded-full px-5 py-1.5 transition-colors duration-300 ${
                  i === 1
                    ? "-rotate-2 bg-[#B94332] text-white shadow-sm hover:bg-[#96382C]"
                    : i === 0
                      ? "rotate-1 border border-[#B94332]/50 bg-white/70 text-[#96382C] hover:border-[#B94332] hover:bg-[#B94332] hover:text-white"
                      : i === 2
                        ? "rotate-2 bg-[#E9B878] text-[#39281C] hover:bg-[#DDA65D]"
                        : " mt-2 ml-2 border border-[#B94332]/50 bg-white/70 text-[#96382C] "
                }`}
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Food photography */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
        >
          {/* Offset image frame */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-tl-[7rem] border-2 border-[#B94332]/50 sm:translate-x-6 sm:translate-y-6"
          />

          {/* Main image */}
          <div className="relative aspect-[4/4.4] w-full overflow-hidden bg-[#E9B878] shadow-[0_24px_55px_-25px_rgba(55,38,24,0.35)] sm:aspect-[4/3.6] lg:aspect-[4/4.4]">
            <Image
              src={MAIN_IMAGE}
              alt="Wood-fired pepperoni pizza on a wooden board"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Polaroid image */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease }}
            className="absolute -bottom-8 -left-2 z-20 sm:-bottom-10 sm:-left-8 lg:-left-16"
          >
            <div
              data-polaroid
              className="relative w-32 rotate-[5deg] bg-white p-1.5 shadow-[0_16px_32px_rgba(55,38,24,0.2)] ring-1 ring-[#D9C7AD] sm:w-44 sm:p-2 lg:w-56"
            >
              <span className="absolute -left-3 -top-3 h-5 w-12 -rotate-[8deg] bg-[#E9B878]/90 sm:h-6 sm:w-16" />

              <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#E9B878]">
                <Image
                  src={POLAROID_IMAGE}
                  alt="Warm seating area of the restaurant"
                  fill
                  sizes="(min-width: 1024px) 224px, 176px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="">
        <ImageMarquee />
      </div>
    </section>
  );
}
