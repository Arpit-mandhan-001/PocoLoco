"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ComponentType,
  type SVGProps,
} from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/*  Fonts (Tailwind classes from your config)                                  */
/* -------------------------------------------------------------------------- */
const FONT_PRIMARY = "font-gambero";
const FONT_SECONDARY = "font-fredoka";

const SPINACH_IMG = "/images/footer_bg.jpg";
const PIZZA_SLICE_IMG = "/images/footer_bg.jpg";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const svgProps: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-full w-full",
  "aria-hidden": true,
};

const PizzaSliceIcon = () => (
  <svg {...svgProps}>
    <path d="M6 20c17-9 35-9 52 0" />
    <path d="M8 26c16-7 32-7 48 0" />
    <path d="M6 20l2 6M58 20l-2 6" />
    <path d="M8 26l24 34 24-34" />
    <circle cx="22" cy="34" r="4" />
    <circle cx="42" cy="34" r="4" />
    <circle cx="32" cy="47" r="3" />
  </svg>
);

const SproutIcon = () => (
  <svg {...svgProps}>
    <path d="M32 54V32" />
    <path d="M32 36c-10 0-16-6-16-16 10 0 16 6 16 16z" />
    <path d="M32 30c0-9 5-15 14-16 1 10-4 16-14 16z" />
    <path d="M20 54h24" />
  </svg>
);

const ChefIcon = () => (
  <svg {...svgProps}>
    <path d="M20 40c-8-2-10-12-3-17 1-8 12-11 15-5 3-6 14-3 15 5 7 5 5 15-3 17" />
    <path d="M20 40v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V40" />
    <path d="M20 46h24" />
    <path d="M26 31v4M32 29v6M38 31v4" />
  </svg>
);

const PartyIcon = () => (
  <svg {...svgProps}>
    <path d="M10 56l10-28 18 18z" />
    <path d="M16 40l10 10M13 48l6 6" />
    <path d="M30 28c4-6 8-6 12-10M38 38c6-2 10 0 14 4" />
    <path d="M44 10l1.5 3 3.5.5-2.5 2.5.6 3.5-3.1-1.7-3.1 1.7.6-3.5L39 13.5l3.5-.5z" />
    <path d="M14 16l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" />
    <path d="M54 28l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z" />
    <path d="M30 14l3 3-3 3-3-3zM52 16h5v5h-5z" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */
interface Feature {
  title: string;
  text: string;
  image: string; // dummy path – replace
  alt: string;
  Icon: IconComponent;
}

const FEATURES: Feature[] = [
  {
    title: "Hygienic Food",
    text: "Fresh, safe and high-quality ingredients, always.",
    image: "/images/footer_bg.jpg",
    alt: "Pizza with melted cheese being lifted from the pie",
    Icon: PizzaSliceIcon,
  },
  {
    title: "Fresh Environment",
    text: "A clean, cozy and welcoming space for every guest.",
    image: "/images/footer_bg.jpg",
    alt: "Fresh tomatoes, basil and olive oil on a board",
    Icon: SproutIcon,
  },
  {
    title: "Skilled Chefs",
    text: "Passionate chefs bringing authentic flavors to your plate.",
    image: "/images/footer_bg.jpg",
    alt: "Pasta in a pan finished with parmesan and basil",
    Icon: ChefIcon,
  },
  {
    title: "Event and Party",
    text: "Perfect for gatherings, celebrations and special moments.",
    image: "/images/footer_bg.jpg",
    alt: "Candle-lit table with pizza and shared dishes",
    Icon: PartyIcon,
  },
];

interface Decor {
  id: string;
  src: string;
  className: string;
  rotate: number;
  delay: number;
}

const DECOR: Decor[] = [
  { id: "spinach-tl", src: SPINACH_IMG, className: "-left-6 -top-4 w-28 sm:-left-8 sm:w-40 lg:w-52", rotate: 0, delay: 0 },
  { id: "pizza-br", src: PIZZA_SLICE_IMG, className: "-bottom-4 -right-4 w-28 sm:w-40 lg:w-52", rotate: -8, delay: 1.2 },
  { id: "spinach-br", src: SPINACH_IMG, className: "hidden bottom-28 -right-2 w-16 sm:block lg:w-20", rotate: 20, delay: 2.4 },
];

/* -------------------------------------------------------------------------- */
/*  Hover variants (parent <article> drives all children)                      */
/* -------------------------------------------------------------------------- */
const cardV: Variants = {
  rest: { y: 0 },
  hover: { y: -10, transition: { type: "spring", stiffness: 260, damping: 20 } },
};
const imageV: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const badgeV: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.1, y: -4, transition: { type: "spring", stiffness: 300, damping: 14 } },
};
const iconV: Variants = {
  rest: { rotate: 0 },
  hover: { rotate: [0, -14, 10, -6, 0], transition: { duration: 0.8, ease: "easeInOut" } },
};
const lineV: Variants = {
  rest: { width: 40 },
  hover: { width: 96, transition: { duration: 0.5, ease: "easeOut" } },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */
export default function WhyChooseUs() {
  const root = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();

  /* GSAP: scroll-triggered entrance */
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });

        tl.from("[data-draw]", { strokeDashoffset: 1, duration: 2.2, ease: "power2.inOut", stagger: 0.3 }, 0)
          .from("[data-decor]", { autoAlpha: 0, scale: 0.7, duration: 1.2, stagger: 0.2 }, 0.1)
          .from("[data-eyebrow-line]", { scaleX: 0, duration: 0.8 }, 0.2)
          .from("[data-eyebrow-text]", { autoAlpha: 0, y: 10, duration: 0.6 }, "<0.2")
          .from("[data-line]", { yPercent: 110, duration: 1.1, stagger: 0.14, ease: "power4.out" }, "<0.1")
          .from("[data-sub]", { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.6")
          .from("[data-card]", { autoAlpha: 0, y: 70, duration: 1, stagger: 0.15 }, "-=0.4")
          .from("[data-badge]", { scale: 0, duration: 0.7, ease: "back.out(2)", stagger: 0.15 }, "<0.4")
          .from("[data-copy]", { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.15 }, "<0.1");
      },
      root.current ?? undefined
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-[#faf6ee] px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      {/* ---------- Decoration: gold swooshes ---------- */}
      <svg
        viewBox="0 0 200 240"
        fill="none"
        stroke="#b98a4e"
        strokeWidth="1.5"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-auto w-32 sm:w-48 lg:w-64"
      >
        <path
          data-draw
          d="M10 0C60 25 125 30 165 80c25 31 30 70 35 110"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
        />
      </svg>
      <svg
        viewBox="0 0 220 220"
        fill="none"
        stroke="#b98a4e"
        strokeWidth="1.5"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-auto w-32 sm:w-48 lg:w-60"
      >
        <path
          data-draw
          d="M0 10C25 60 20 120 70 155c45 30 100 40 150 60"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
        />
      </svg>

      {/* ---------- Decoration: spinach + pizza slice images ---------- */}
      {DECOR.map((d) => (
        <div key={d.id} data-decor aria-hidden="true" className={`pointer-events-none absolute -z-10 ${d.className}`}>
          <motion.div
            initial={{ rotate: d.rotate }}
            animate={
              reduce
                ? undefined
                : { y: [0, -12, 0], rotate: [d.rotate, d.rotate + 5, d.rotate] }
            }
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: d.delay }}
          >
            <Image src={d.src} alt="" width={400} height={400} className="h-auto w-full" />
          </motion.div>
        </div>
      ))}

      <div className="relative mx-auto max-w-[1320px]">
        {/* ---------- Heading ---------- */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span data-eyebrow-line className="h-px w-10 origin-right bg-[#b98a4e] sm:w-16" />
            <p
              data-eyebrow-text
              className={`${FONT_SECONDARY} text-xs font-medium uppercase tracking-[0.18em] text-[#b98a4e] sm:text-sm`}
            >
              Why choose us
            </p>
            <span data-eyebrow-line className="h-px w-10 origin-left bg-[#b98a4e] sm:w-16" />
          </div>

          <h2
            className={`${FONT_PRIMARY} mt-5 text-[2.5rem] leading-[0.95] tracking-tight text-[#1c3b2f] [font-variant-caps:small-caps] sm:text-6xl lg:text-7xl`}
          >
            <span className="block overflow-hidden pb-[0.1em]">
              <span data-line className="block font-semibold">Why We&rsquo;re Your</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span data-line className="block text-[#b98a4e] font-bold">Best Choice</span>
            </span>
          </h2>

          <p
            data-sub
            className={`${FONT_SECONDARY} font-medium mx-auto mt-6 max-w-xl text-base leading-8 text-[#4c5a52] sm:text-lg`}
          >
            We&rsquo;re not just about great food &mdash; we&rsquo;re about creating memorable
            experiences, one meal at a time.
          </p>
        </div>

        {/* ---------- Cards ---------- */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {FEATURES.map(({ title, text, image, alt, Icon }, index) => (
            <div key={title} data-card className="mx-auto w-full max-w-sm sm:max-w-none">
              <motion.article
                variants={cardV}
                initial="rest"
                animate="rest"
                whileHover={reduce ? undefined : "hover"}
                whileFocus={reduce ? undefined : "hover"}
                tabIndex={0}
                className="group relative rounded-[48%_48%_2rem_2rem/20%_20%_2rem_2rem] bg-[#fffcf5] p-2 pb-9 shadow-[0_20px_50px_-25px_rgba(28,59,47,0.35)] ring-1 ring-white transition-shadow duration-500 hover:shadow-[0_35px_70px_-25px_rgba(28,59,47,0.5)] focus-visible:shadow-[0_35px_70px_-25px_rgba(28,59,47,0.5)] focus-visible:outline-none"
              >
                {/* Arched image + overlapping badge */}
                <div className="relative">
                  <div className="relative isolate aspect-[3/2] overflow-hidden rounded-[48%_48%_0_0/40%_40%_0_0] bg-[#e9e2d3]">
                    <motion.div variants={imageV} className="absolute inset-0">
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 -bottom-10 flex justify-center">
                    <div data-badge>
                      <motion.div
                        variants={badgeV}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1c3b2f] text-[#fdf6e8] ring-[6px] ring-[#fffcf5] transition-[background-color,box-shadow] duration-500 group-hover:bg-[#b98a4e] group-hover:shadow-[0_0_0_10px_rgba(185,138,78,0.22)] group-focus-visible:bg-[#b98a4e] group-focus-visible:shadow-[0_0_0_10px_rgba(185,138,78,0.22)]"
                      >
                        <motion.span variants={iconV} className="block h-9 w-9">
                          <Icon />
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Copy */}
                <div data-copy className="px-4 pt-14 text-center">
                  <span className={`${FONT_SECONDARY} block text-base font-medium text-[#b98a4e]`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`${FONT_PRIMARY} mt-1 text-[1.75rem] leading-tight text-[#1c3b2f] sm:text-3xl`}>
                    {title}
                  </h3>
                  <p className={`${FONT_SECONDARY} font-medium mx-auto mt-3 max-w-[16rem] text-[15px] leading-7 text-[#4c5a52]`}>
                    {text}
                  </p>
                  <motion.span
                    variants={lineV}
                    style={{ width: 40 }}
                    className="mx-auto mt-5 block h-[2px] rounded-full bg-[#b98a4e]"
                  />
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}