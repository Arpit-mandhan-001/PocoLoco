"use client";

/**
 * InstagramSection.tsx
 * Next.js (App Router) + TypeScript + Tailwind + GSAP + Framer Motion
 *
 * npm i gsap framer-motion
 *
 * Usage:  import InstagramSection from "@/components/InstagramSection";
 *         <InstagramSection />
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  1. DUMMY PATHS – replace these with your own                       */
/* ------------------------------------------------------------------ */
const INSTAGRAM_URL = "https://www.instagram.com/your_handle"; // <- update
const INSTAGRAM_HANDLE = "@slicetown"; // <- update
const LOGO_SRC = "/images/parrot_logo.png"; // <- update (center of the circle)

// 8 images, put them in /public/images/instagram/
const IMAGES = Array.from(
  { length: 8 },
  (_, i) => `/images/footer_bg.jpg`
);

/* ------------------------------------------------------------------ */
/*  2. COLUMN CONFIG                                                   */
/*     direction: -1 = moves UP, 1 = moves DOWN                        */
/*     speed: pixels per second (keep low = slow & smooth)             */
/*     offset: starting position (0–1 of one loop) so columns differ   */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { direction: -1, speed: 26, offset: 0.0, shift: 0 }, // 1st: down -> top
  { direction: 1, speed: 34, offset: 0.35, shift: 2 }, // 2nd: top -> down
  { direction: -1, speed: 30, offset: 0.15, shift: 4 }, // 3rd: down -> top
  { direction: 1, speed: 38, offset: 0.55, shift: 6 }, // 4th: top -> down
] as const;

const COPIES = 3; // how many times a column's image set is repeated (seamless loop)
const RATIOS = ["aspect-[4/5]", "aspect-[4/4]", "aspect-[4/4]", "aspect-[8/6]"];

/* ------------------------------------------------------------------ */
/*  3. ROTATING CIRCLE BADGE                                           */
/* ------------------------------------------------------------------ */
function RotatingBadge() {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow Slice Town on Instagram"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative block h-38 w-38 rounded-full border-[2px] border-black bg-[#fbf3df] shadow-[6px_6px_0_#000] sm:h-42 sm:w-42 md:h-50 md:w-50"
    >
      {/* rotating text ring (infinite) */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <defs>
          <path
            id="insta-circle-path"
            d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0"
          />
        </defs>
        <text
          className="fill-[#3a2206] font-serif"
          style={{ fontSize: 15, fontWeight: 700 }}
        >
          <textPath
            href="#insta-circle-path"
            textLength={477}
            lengthAdjust="spacing"
          >
            Follow us on Instagram • Follow us on Instagram •
          </textPath>
        </text>
      </motion.svg>

      {/* logo in the center (stays still) */}
      <div className="absolute left-1/2 top-1/2 grid h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border-[1px] border-black bg-black">
        <Image
          src={LOGO_SRC}
          alt="Slice Town logo"
          width={110}
          height={140}
          className="h-full w-full object-contain p-1"
        />
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  4. MAIN SECTION                                                    */
/* ------------------------------------------------------------------ */
export default function InstagramSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const tracks = trackRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || !tracks.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setY = tracks.map((t) => gsap.quickSetter(t, "y", "px"));
    const loopH = tracks.map(() => 0); // height of ONE image set
    const pos = tracks.map(() => 0); // current y of each column

    /* measure one loop height + (re)position on resize */
    const measure = () => {
      tracks.forEach((t, i) => {
        const h = t.scrollHeight / COPIES;
        const prev = loopH[i];
        loopH[i] = h;
        pos[i] = prev
          ? gsap.utils.wrap(-h, 0, pos[i] * (h / prev))
          : -h * COLUMNS[i].offset;
        setY[i](pos[i]);
      });
    };
    measure();

    const ro = new ResizeObserver(measure);
    tracks.forEach((t) => ro.observe(t));

    if (reduceMotion) {
      return () => ro.disconnect();
    }

    /* scroll direction:  1 = normal,  -1 = reversed (when scrolling DOWN) */
    let target = 1;
    let current = 1; // eased value so the reversal is smooth, never a jump
    let lastY = window.scrollY;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 1) return;
      target = e.deltaY > 0 ? -1 : 1; // touchpad down -> reverse, up -> normal
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 1) target = y > lastY ? -1 : 1; // touch / keyboard / scrollbar
      lastY = y;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    /* animation loop */
    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      current += (target - current) * (1 - Math.exp(-dt * 12)); // smooth easing
      tracks.forEach((_, i) => {
        const h = loopH[i];
        if (!h) return;
        const { direction, speed } = COLUMNS[i];
        pos[i] = gsap.utils.wrap(-h, 0, pos[i] + direction * current * speed * dt);
        setY[i](pos[i]);
      });
    };

    /* only run while the section is on screen */
    let running = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        gsap.ticker.add(tick);
        running = true;
      } else if (!entry.isIntersecting && running) {
        gsap.ticker.remove(tick);
        running = false;
      }
    });
    io.observe(section);

    return () => {
      io.disconnect();
      ro.disconnect();
      if (running) gsap.ticker.remove(tick);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[120vh] items-center justify-center overflow-hidden bg-[#f4a261] px-4 py-24"
    >
      {/* ---------- background: 4 moving image columns ---------- */}
      <div
        aria-hidden="true"
        className="absolute -inset-[14%] -z-10 grid -rotate-[4deg] grid-cols-4 gap-3 md:gap-5"
      >
        {COLUMNS.map((col, c) => {
          // each column starts from a different image so they don't repeat side by side
          const imgs = [...IMAGES.slice(col.shift), ...IMAGES.slice(0, col.shift)];
          return (
            <div key={c} className="h-full overflow-hidden">
              <div
                ref={(el) => {
                  trackRefs.current[c] = el;
                }}
                className="will-change-transform"
              >
                {Array.from({ length: COPIES }).flatMap((_, copy) =>
                  imgs.map((src, i) => (
                    <div key={`${copy}-${i}`} className="pb-3 md:pb-5">
                      <div
                        className={`relative w-[520px] overflow-hidden  bg-[#c97d3a] ${
                          RATIOS[(i + c) % RATIOS.length]
                        }`}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 25vw, 30vw"
                          className="object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

     <div
  aria-hidden="true"
  className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(25,12,0,0.25)_0%,rgba(25,12,0,0.20)_50%,transparent_100%)]"
/>

      {/* ---------- foreground content ---------- */}
      <div className="flex max-w-xl flex-col items-center text-center">

        <div className="">
          <RotatingBadge />
        </div>
        {/* <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border-2 border-black bg-[#f4a261] px-6 py-2.5 font-serif text-lg font-bold text-black shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fbf3df]"
        >
          {INSTAGRAM_HANDLE}

        </a> */}
      </div>
    </section>
  );
}