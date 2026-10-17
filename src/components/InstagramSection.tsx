"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion } from "framer-motion";

const INSTAGRAM_URL = "https://www.instagram.com/pocolocopizza_calgary/";

const LOGO_SRC =
  "https://res.cloudinary.com/ddknybe9p/image/upload/f_auto/q_auto/parrot_logo_qnlzql.png";

const IMAGES = [
  "/images/footer_bg.jpg",
  "/images/drinks2.jpg",
  "/images/about1.jpeg",
  "/images/drinks3.jpg",
  "/images/chickenwinges.webp",
  "/images/drinks.webp",
  "/images/restaurant_3.webp",
  "/images/reservations.jpg",
];

const COLUMNS = [
  { direction: -1, speed: 26, offset: 0.0, shift: 0 },
  { direction: 1, speed: 34, offset: 0.35, shift: 2 },
  { direction: -1, speed: 30, offset: 0.15, shift: 4 },
  { direction: 1, speed: 38, offset: 0.55, shift: 6 },
  { direction: -1, speed: 32, offset: 0.25, shift: 1 },
] as const;

const COPIES = 3;

const RATIOS = ["aspect-[5/6]", "aspect-[5/6]", "aspect-[5/6]", "aspect-[5/6]"];

function RotatingBadge() {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow us on Instagram"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="relative block h-32 w-32 rounded-full border-2 border-black bg-[#fbf3df] shadow-[6px_6px_0_#000] sm:h-36 sm:w-36 md:h-48 md:w-48"
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
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

      <div className="absolute left-1/2 top-1/2 grid h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border border-black bg-black">
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

export default function InstagramSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Keep every column at its original index.
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tracks = trackRefs.current.slice(0, COLUMNS.length);

    if (
      tracks.length !== COLUMNS.length ||
      tracks.some((track) => track === null)
    ) {
      return;
    }

    const validTracks = tracks as HTMLDivElement[];

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    // One independent setter, height, and position per column.
    const setY = validTracks.map((track) => gsap.quickSetter(track, "y", "px"));

    const loopH = new Array<number>(COLUMNS.length).fill(0);
    const pos = new Array<number>(COLUMNS.length).fill(0);

    let disposed = false;

    const measure = () => {
      if (disposed) return;

      validTracks.forEach((track, i) => {
        // The track contains three identical image sequences.
        const height = track.scrollHeight / COPIES;

        if (height <= 0) return;

        const previousHeight = loopH[i];

        loopH[i] = height;

        if (previousHeight > 0) {
          // Preserve the relative position when dimensions change.
          pos[i] = gsap.utils.wrap(
            -height,
            0,
            pos[i] * (height / previousHeight),
          );
        } else {
          pos[i] = -height * COLUMNS[i].offset;
        }

        setY[i](pos[i]);
      });
    };

    measure();

    // Observe the columns for layout changes.
    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    validTracks.forEach((track) => {
      resizeObserver.observe(track);
    });

    // Recalculate after images finish loading.
    const images = Array.from(section.querySelectorAll("img"));

    const onImageLoad = () => measure();

    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", onImageLoad);
      }
    });

    let targetDirection = 1;
    let currentDirection = 1;
    let lastScrollY = window.scrollY;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 1) return;

      targetDirection = event.deltaY > 0 ? -1 : 1;
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      if (Math.abs(difference) > 1) {
        targetDirection = difference > 0 ? -1 : 1;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("wheel", onWheel, {
      passive: true,
    });

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    // Animate all five columns independently.
    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;

      // Smoothly transition between forward and reverse movement.
      currentDirection +=
        (targetDirection - currentDirection) * (1 - Math.exp(-dt * 12));

      validTracks.forEach((_track, i) => {
        const height = loopH[i];

        if (height <= 0) return;

        const { direction, speed } = COLUMNS[i];

        pos[i] = gsap.utils.wrap(
          -height,
          0,
          pos[i] + direction * currentDirection * speed * dt,
        );

        setY[i](pos[i]);
      });
    };

    let running = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        gsap.ticker.add(tick);
        running = true;
      } else if (!entry.isIntersecting && running) {
        gsap.ticker.remove(tick);
        running = false;
      }
    });

    observer.observe(section);

    return () => {
      disposed = true;

      observer.disconnect();
      resizeObserver.disconnect();

      if (running) {
        gsap.ticker.remove(tick);
      }

      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);

      images.forEach((img) => {
        img.removeEventListener("load", onImageLoad);
        img.removeEventListener("error", onImageLoad);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#f4a261] px-3 py-16 sm:min-h-[120vh] sm:px-4 sm:py-24"
    >
      {/* Five independently animated background columns */}
      <div
        aria-hidden="true"
        className="absolute -inset-[14%] -z-10 grid -rotate-[4deg] grid-cols-5 gap-2 sm:gap-3 md:gap-4"
      >
        {COLUMNS.map((column, columnIndex) => {
          const columnImages = [
            ...IMAGES.slice(column.shift),
            ...IMAGES.slice(0, column.shift),
          ];

          return (
            <div key={columnIndex} className="h-full min-w-0 overflow-hidden">
              <div
                ref={(element) => {
                  trackRefs.current[columnIndex] = element;
                }}
                className="will-change-transform"
              >
                {Array.from({ length: COPIES }).flatMap((_, copyIndex) =>
                  columnImages.map((src, imageIndex) => (
                    <div
                      key={`${copyIndex}-${imageIndex}`}
                      className="pb-2 sm:pb-3 md:pb-5"
                    >
                      <div
                        className={`relative w-full overflow-hidden bg-[#c97d3a] ${
                          RATIOS[(imageIndex + columnIndex) % RATIOS.length]
                        }`}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 25vw, (max-width: 1024px) 22vw, 24vw"
                          quality={100}
                          className="object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                  )),
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dark radial overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(25,12,0,0.25)_0%,rgba(25,12,0,0.20)_50%,transparent_100%)]"
      />

      {/* Foreground Instagram badge */}
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <RotatingBadge />
      </div>
    </section>
  );
}
