"use client";

/**
 * BlogSection.tsx
 * Next.js (App Router) + TypeScript + Tailwind + Framer Motion
 *
 * npm i framer-motion
 *
 * Usage:  import BlogSection from "@/components/BlogSection";
 *         <BlogSection />
 */

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const FONT_PRIMARY = "font-gambero font-black";
const FONT_SECONDARY = "font-fredoka";

/* ------------------------------------------------------------------ */
/*  1. DUMMY DATA / PATHS – replace with your own                      */
/* ------------------------------------------------------------------ */
const POSTS = [
  {
    slug: "this-so-trendy-restaurant-that-everyone",
    title: "This So Trendy Restaurant That Everyone",
    author: "PocoLoco",
    date: "June 28, 2025",
    image: "/images/blog1.webp",
  },
  {
    slug: "new-restaurant-town-our-ple-award-contract",
    title: "New Restaurant Town Our Ple Award Contract",
    author: "PocoLoco",
    date: "June 29, 2025",
    image: "/images/blog2.png",
  },
  {
    slug: "in-fast-food-really-getting-healthier",
    title: "In Fast Food Really Getting Healthier? What You Need Know",
    author: "PocoLoco",
    date: "July 30, 2025",
    image: "/images/blog3.jpg",
  },
  {
    slug: "the-secret-behind-our-wood-fired-pizza",
    title: "The Secret Behind Our Wood Fired Pizza Recipe",
    author: "PocoLoco",
    date: "August 12, 2025",
    image: "/images/blog4.avif",
  },
  {
    slug: "five-burgers-you-must-try-this-season",
    title: "Five Burgers You Must Try This Season",
    author: "PocoLoco",
    date: "August 21, 2025",
    image: "/images/blog5.jpeg",
  },
  {
    slug: "how-we-pick-the-freshest-ingredients",
    title: "How We Pick The Freshest Ingredients Every Day",
    author: "PocoLoco",
    date: "September 3, 2025",
    image: "/images/blog6.jpeg",
  },
];

// Decorative images in the corners (transparent PNGs)
const DECOR = {
  pizza: "/images/sticker3.avif",
  chicken: "/images/sticker4.avif",
  leaf: "/images/sticker5.avif",
};

/* ------------------------------------------------------------------ */
/*  2. SMALL PIECES                                                    */
/* ------------------------------------------------------------------ */
const RED = "#db2627";

/** green divider under the heading */
function Ornament() {
  return (
    <svg
      viewBox="0 0 296 26"
      className="mx-auto h-5 w-[230px] sm:h-6 sm:w-[292px]"
      fill="none"
      stroke="#3a9068"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <circle cx="3" cy="13" r="1.8" fill="#3a9068" stroke="none" />
      <circle cx="10" cy="13" r="1.8" fill="#3a9068" stroke="none" />
      <polygon points="14,13 26,3 38,13 26,23" fill="#3a9068" />
      <path d="M41 7v12M45 9v8M45 13h93" />
      <circle cx="148" cy="13" r="8" />
      <circle cx="148" cy="13" r="3.5" fill="#3a9068" stroke="none" />
      <path d="M158 13h93M251 9v8M255 7v12" />
      <polygon points="258,13 270,3 282,13 270,23" fill="#3a9068" />
      <circle cx="286" cy="13" r="1.8" fill="#3a9068" stroke="none" />
      <circle cx="293" cy="13" r="1.8" fill="#3a9068" stroke="none" />
    </svg>
  );
}

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke={RED}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke={RED}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
);

/* ------------------------------------------------------------------ */
/*  3. MAIN SECTION                                                    */
/* ------------------------------------------------------------------ */
export default function BlogSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  /** slide by one card; loops back at the ends */
  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("article");
    if (!card) return;

    const step = card.getBoundingClientRect().width;
    const max = el.scrollWidth - el.clientWidth;

    if (dir === 1 && el.scrollLeft >= max - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (dir === -1 && el.scrollLeft <= 4) {
      el.scrollTo({ left: max, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * step, top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      className={`relative overflow-hidden bg-[#f9f3e3] py-16 sm:py-20 lg:py-24`}
    >
      {/* ---------- corner decorations ---------- */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[2%] top-4 hidden w-16 sm:block md:w-24"
        animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={DECOR.pizza}
          alt=""
          width={160}
          height={160}
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[2%] top-0 hidden w-20 sm:block md:w-32"
        animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={DECOR.chicken}
          alt=""
          width={200}
          height={200}
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[3%] hidden w-20 sm:block md:w-32"
        animate={{ rotate: [0, 5, 0] }}
        style={{ transformOrigin: "bottom left" }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={DECOR.leaf}
          alt=""
          width={200}
          height={200}
          className="h-auto w-full"
        />
      </motion.div>

      {/* ---------- heading ---------- */}
      <motion.div
        className="relative px-4 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p
          className={`${FONT_PRIMARY} text-sm font-extrabold uppercase tracking-wide text-[#f7931e] sm:text-lg`}
        >
          Blogs
        </p>
        <h2
          className={`${FONT_PRIMARY} tracking-tight mt-1 text-4xl font-black uppercase leading-tight text-[#111] sm:text-5xl lg:text-[56px]`}
        >
          Our Latest <span style={{ color: RED }}>Blogs</span>
        </h2>
        <div className="mt-4">
          <Ornament />
        </div>
      </motion.div>

      {/* ---------- slider ---------- */}
      <div className="relative mx-auto mt-10 w-[92%] max-w-[1520px] sm:mt-14">
        {/* prev */}
        <button
          type="button"
          onClick={() => slide(-1)}
          aria-label="Previous posts"
          className="absolute -left-2 top-[28%] z-20 grid h-11 w-11 -translate-y-2/2 md:-translate-y-1/2 lg:-translate-y-5/2 place-items-center rounded-full shadow-lg transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:-left-3 sm:h-12 sm:w-12 md:-left-5 lg:top-1/2 lg:h-14 lg:w-14"
          style={{ backgroundColor: RED }}
        >
          <Arrow dir="left" />
        </button>

        {/* next */}
        <button
          type="button"
          onClick={() => slide(1)}
          aria-label="Next posts"
          className="absolute -right-2 top-[28%] z-20 grid h-11 w-11 -translate-y-2/2 md:-translate-y-1/2 lg:-translate-y-5/2 place-items-center rounded-full shadow-lg transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:-right-3 sm:h-12 sm:w-12 md:-right-5 lg:top-1/2 lg:h-14 lg:w-14"
          style={{ backgroundColor: RED }}
        >
          <Arrow dir="right" />
        </button>

        {/* cards: 1 on phone, 2 on tablet, 3 on desktop */}
        <div
          ref={trackRef}
          className="-mx-3 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {POSTS.map((post, i) => (
            <motion.article
              key={post.slug}
              className="group shrink-0 basis-full snap-start px-3 sm:basis-1/2 lg:basis-1/3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.12 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative block aspect-[490/342] overflow-hidden rounded-[22px] bg-[#e9dfc6]"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 text-[14px] text-neutral-500 sm:text-[15px]">
                <span className="flex items-center gap-2">
                  <UserIcon /> By {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarIcon /> {post.date}
                </span>
              </div>

              <h3
                className={`${FONT_PRIMARY} mt-3 text-[26px] font-medium leading-[1.5] text-[#111] sm:text-[30px] xl:text-[34px]`}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-300 group-hover:text-[#e8200c] group-hover:decoration-[#e8200c] tracking-tighter"
                >
                  {post.title}
                </Link>
              </h3>

              <Link
                href={`/blog/${post.slug}`}
                className={`${FONT_SECONDARY} mt-4 inline-block px-8 py-3 text-[15px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-90`}
                style={{
                  backgroundColor: RED,
                  // rough brush-stroke edges
                  clipPath:
                    "polygon(0 14%, 5% 2%, 100% 0, 96% 56%, 99% 61%, 97% 100%, 40% 94%, 0 100%)",
                }}
              >
                Read More
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
