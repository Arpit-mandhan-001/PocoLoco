"use client";

/**
 * MenuSection.tsx
 * Next.js (App Router) + TypeScript + Tailwind + GSAP + Framer Motion
 *
 * npm i gsap framer-motion
 *
 * Usage:  import MenuSection from "@/components/MenuSection";
 *         <MenuSection />
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { DM_Sans, Caveat, Fraunces } from "next/font/google";

const FONT_PRIMARY = "font-gambero font-black";
const FONT_SECONDARY = "font-fredoka";

/* ------------------------------------------------------------------ */
/*  1. MENU DATA – dummy paths, replace with your own images           */
/*     Put transparent PNGs in /public/images/menu/                    */
/*                                                                     */
/*     motion: "rotate" -> round dishes (pizza) spin slowly            */
/*             "float"  -> everything else moves gently up and down    */
/*     Change it per item whenever you like.                           */
/* ------------------------------------------------------------------ */
type MotionType = "rotate" | "float";
type IconName = "star" | "pizza" | "bowl" | "burger" | "cup" | "cocktail";

type Item = {
  id: string;
  name: string;
  desc: string;
  price: string;
  image: string;
  motion: MotionType;
};

type Category = { id: string; label: string; icon: IconName; items: Item[] };

const CATEGORIES: Category[] = [
  {
    id: "favorites",
    label: "Favorites",
    icon: "star",
    items: [
      { id: "fav-margherita", name: "Margherita", desc: "Classic tomato, mozzarella, fresh basil and cheese.", price: "$12.99", image: "/images/margherita_pizza.avif", motion: "rotate" },
      { id: "fav-cheeseburger", name: "Classic Cheeseburger", desc: "Beef patty, cheddar, lettuce, house sauce.", price: "$11.99", image: "/images/burger1.png", motion: "float" },
      { id: "fav-wings", name: "Buffalo Wings", desc: "Crispy wings tossed in tangy buffalo sauce.", price: "$9.99", image: "/images/menu/appetizer-wings.png", motion: "float" },
      { id: "fav-lemonade", name: "Fresh Lemonade", desc: "Squeezed to order with a hint of mint.", price: "$4.99", image: "/images/menu/drink-lemonade.png", motion: "float" },
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    icon: "pizza",
    items: [
      { id: "pizza-margherita", name: "Margherita", desc: "Classic tomato, mozzarella, fresh basil and cheese.", price: "$12.99", image: "/images/margherita_pizza.avif", motion: "rotate" },
      { id: "pizza-pepperoni", name: "Pepperoni", desc: "Loaded with premium pepperoni and mozzarella.", price: "$14.99", image: "/images/veggie_pizza.png", motion: "rotate" },
      { id: "pizza-veggie", name: "Veggie Delight", desc: "Fresh vegetables, olives, mushrooms, mozzarella.", price: "$13.99", image: "/images/veggie_pizza.png", motion: "rotate" },
      { id: "pizza-bbq", name: "BBQ Chicken", desc: "Grilled chicken, red onion, BBQ sauce, mozzarella.", price: "$15.99", image: "/images/BBQ_pizza.png", motion: "rotate" },
    ],
  },
  {
    id: "appetizers",
    label: "Appetizers",
    icon: "bowl",
    items: [
      { id: "app-knots", name: "Garlic Knots", desc: "Warm, buttery knots with garlic and herbs.", price: "$6.99", image: "/images/pizza.avif", motion: "float" },
      { id: "app-sticks", name: "Mozzarella Sticks", desc: "Golden fried, served with marinara.", price: "$7.99", image: "/images/menu/appetizer-sticks.png", motion: "float" },
      { id: "app-wings", name: "Buffalo Wings", desc: "Crispy wings tossed in tangy buffalo sauce.", price: "$9.99", image: "/images/menu/appetizer-wings.png", motion: "float" },
      { id: "app-nachos", name: "Loaded Nachos", desc: "Chips, melted cheese, jalapeños, sour cream.", price: "$10.99", image: "/images/menu/appetizer-nachos.png", motion: "float" },
    ],
  },
  {
    id: "burgers",
    label: "Burgers & Entrees",
    icon: "burger",
    items: [
      { id: "burger-classic", name: "Classic Cheeseburger", desc: "Beef patty, cheddar, lettuce, house sauce.", price: "$11.99", image: "/images/burger1.png", motion: "float" },
      { id: "burger-bacon", name: "Smokehouse Bacon", desc: "Double patty, crispy bacon, smoky BBQ glaze.", price: "$13.49", image: "/images/burger2.png", motion: "float" },
      { id: "burger-chicken", name: "Grilled Chicken", desc: "Juicy chicken breast, avocado, garlic mayo.", price: "$12.49", image: "/images/burger3.png", motion: "float" },
      { id: "burger-salad", name: "Garden Salad Bowl", desc: "Crisp greens, cherry tomatoes, olives, vinaigrette.", price: "$9.99", image: "/images/burger1.png", motion: "float" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: "cup",
    items: [
      { id: "drink-lemonade", name: "Fresh Lemonade", desc: "Squeezed to order with a hint of mint.", price: "$4.99", image: "/images/drink.png", motion: "float" },
      { id: "drink-tea", name: "Iced Peach Tea", desc: "Black tea, ripe peach, served over ice.", price: "$4.49", image: "/images/drink.png", motion: "float" },
      { id: "drink-smoothie", name: "Berry Smoothie", desc: "Strawberry, blueberry and yogurt blended thick.", price: "$6.49", image: "/images/drink.png", motion: "float" },
      { id: "drink-float", name: "Cola Float", desc: "Ice-cold cola topped with vanilla ice cream.", price: "$5.99", image: "/images/drink.png", motion: "float" },
    ],
  },
  {
    id: "happy-hour",
    label: "Happy Hour",
    icon: "cocktail",
    items: [
      { id: "hh-sliders", name: "Mini Sliders", desc: "Three juicy mini burgers with pickles.", price: "$8.00", image: "/images/drink.png", motion: "float" },
      { id: "hh-margarita", name: "Craft Margarita", desc: "Lime, agave and a salted rim.", price: "$7.00", image: "/images/drink.png", motion: "float" },
      { id: "hh-fries", name: "Truffle Fries", desc: "Crispy fries, truffle oil, parmesan.", price: "$6.50", image: "/images/drink.png", motion: "float" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  2. MOTION SETTINGS                                                 */
/* ------------------------------------------------------------------ */
const ROTATE_SECONDS = 40; // time for one full turn (bigger = slower)
const FLOAT_DISTANCE = 12; // px up / px down
const FLOAT_SECONDS = 2.6; // time for one up (or down) move

// soft brush-stroke shape behind the dish
const BRUSH_STYLE = {
  background: "linear-gradient(135deg, #f0c5b2 0%, #f7dccd 55%, rgba(251,243,232,0) 100%)",
  clipPath:
    "polygon(14% 8%, 32% 0, 56% 6%, 80% 0, 100% 4%, 100% 100%, 72% 96%, 46% 100%, 22% 94%, 9% 72%, 15% 46%, 7% 26%)",
} as const;

/* ------------------------------------------------------------------ */
/*  3. SMALL PIECES                                                    */
/* ------------------------------------------------------------------ */
const ICON_PATHS: Record<IconName, string> = {
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  pizza: "M3 6c6-3 12-3 18 0L12 21z M10 9.5h.01 M14 10.5h.01 M12 14h.01",
  bowl: "M4 12h16a8 8 0 0 1-16 0z M8 8c0-2 2-2 2-4 M13 8c0-2 2-2 2-4",
  burger: "M4 10a8 5 0 0 1 16 0H4z M3 13.5h18 M5 17h14l-1 2.5a2 2 0 0 1-2 1.5H8a2 2 0 0 1-2-1.5z",
  cup: "M7 8h10l-1.2 12H8.2z M12 8l1.5-5H17",
  cocktail: "M4 4h16l-8 9z M12 13v7 M8 20h8",
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "left" ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}

/** Round prev / next button. The caller decides position + display classes. */
function NavButton({
  dir,
  onClick,
  className = "",
}: {
  dir: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous category" : "Next category"}
      className={`h-10 w-10 place-items-center rounded-full border border-[#e8d8cb] bg-[#fffaf3] text-[#5b0f0f] shadow-sm transition hover:scale-105 hover:bg-white active:scale-95 lg:h-11 lg:w-11 ${className}`}
    >
      <ArrowIcon dir={dir} />
    </button>
  );
}

/** The big dish image. Round dishes spin, the rest float up & down (GSAP). */
function Dish({ item }: { item: Item }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (item.motion === "rotate") {
        gsap.to(el, {
          rotation: 360,
          duration: ROTATE_SECONDS,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });
      } else {
        gsap.set(el, { y: FLOAT_DISTANCE });
        gsap.to(el, {
          y: -FLOAT_DISTANCE,
          duration: FLOAT_SECONDS,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [item.motion]);

  return (
    <div ref={ref} className="relative h-full w-full">
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="(min-width: 1024px) 45vw, 90vw"
        className="object-contain"
        draggable={false}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  4. MAIN SECTION                                                    */
/* ------------------------------------------------------------------ */
export default function MenuSection() {
  const [catIndex, setCatIndex] = useState(1); // start on Pizza
  const [itemId, setItemId] = useState(CATEGORIES[1].items[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);

  const category = CATEGORIES[catIndex];
  const item = category.items.find((i) => i.id === itemId) ?? category.items[0];

  const goToCategory = (index: number) => {
    const next = (index + CATEGORIES.length) % CATEGORIES.length;
    setCatIndex(next);
    setItemId(CATEGORIES[next].items[0].id); // first item of the new tab
  };

  // on phones the tab row scrolls sideways – keep the active tab centred
  useEffect(() => {
    const wrap = tabsRef.current;
    const btn = wrap?.children[catIndex] as HTMLElement | undefined;
    if (!wrap || !btn) return;
    wrap.scrollTo({
      left: btn.offsetLeft - (wrap.clientWidth - btn.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [catIndex]);

  return (
    <section
      id="menu"
      className={`relative overflow-hidden bg-[#fbf3e8] px-4 py-12 text-[#5b0f0f] sm:px-6 sm:py-14 md:px-10 lg:px-16 lg:py-20 ${FONT_SECONDARY}`}
    >
      {/* brush-stroke backdrop (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] -top-[6%] hidden h-[112%] w-[62%] opacity-80 lg:block"
        style={BRUSH_STYLE}
      />

      {/* prev / next category – at the section edges on desktop */}
      <NavButton
        dir="left"
        onClick={() => goToCategory(catIndex - 1)}
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 lg:grid"
      />
      <NavButton
        dir="right"
        onClick={() => goToCategory(catIndex + 1)}
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:grid"
      />

      <div className="relative mx-auto grid max-w-[1320px] gap-x-8 gap-y-6 sm:gap-y-8 lg:grid-cols-[1.08fr_1fr]">
        {/* ---------- heading + tabs ---------- */}
        <motion.header
          className="min-w-0 lg:col-start-1"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start gap-2">
            <span className={`${FONT_SECONDARY} text-xl uppercase tracking-wide text-[#db2627] sm:text-2xl mb-6`}>
              Our Menu
            </span>
          </div>

          <h2
            className={`${FONT_PRIMARY} mt-1 text-[clamp(2.4rem,9vw,4rem)] font-bold leading-[1.05] lg:text-[100px]`}
          >
            Find Your 
            <br />
            <span className="font-black text-[clamp(3rem,11vw,5rem)] lg:text-[120px]" style={{ color: "#db2627" }}>Favorites</span>
          </h2>
          <p className="mt-2 text-base text-[#7a6258] sm:text-lg lg:text-xl">
            Freshly made, full of flavor.
          </p>

          {/* tabs: scroll sideways on phones, wrap from tablet up */}
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Menu categories"
            className="relative -mx-4 mt-5 flex gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-6 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((c, i) => {
              const active = i === catIndex;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => goToCategory(i)}
                  className={`flex shrink-0 touch-manipulation items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[16px] font-medium transition-colors duration-300 sm:px-5 sm:py-3 ${
                    active
                      ? "border-[#b23a26] bg-[#b23a26] text-white shadow-md"
                      : "border-[#e8d8cb] bg-transparent text-[#5b0f0f] hover:bg-[#fffaf3]"
                  }`}
                >
                  <Icon name={c.icon} />
                  {c.label}
                </button>
              );
            })}
          </div>
        </motion.header>

        {/* ---------- dish image (changes with the selected item) ---------- */}
        <div className="relative min-w-0 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-center">
          <div className="relative mx-auto aspect-square w-full max-w-[min(88vw,560px)]">
            {/* brush backdrop (phone + tablet) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-[8%] -inset-y-[4%] opacity-80 lg:hidden"
              style={BRUSH_STYLE}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                className="absolute inset-0 drop-shadow-[0_22px_22px_rgba(80,20,10,0.28)] sm:drop-shadow-[0_28px_28px_rgba(80,20,10,0.28)]"
                initial={
                  item.motion === "rotate"
                    ? { opacity: 0, scale: 0.78, rotate: -28 }
                    : { opacity: 0, scale: 0.9, y: 40 }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={
                  item.motion === "rotate"
                    ? { opacity: 0, scale: 0.82, rotate: 28 }
                    : { opacity: 0, scale: 0.92, y: -30 }
                }
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Dish item={item} />
              </motion.div>
            </AnimatePresence>

            {/* prev / next category – over the image on phone + tablet */}
            <NavButton
              dir="left"
              onClick={() => goToCategory(catIndex - 1)}
              className="absolute -left-1 top-1/2 z-10 grid -translate-y-1/2 lg:hidden"
            />
            <NavButton
              dir="right"
              onClick={() => goToCategory(catIndex + 1)}
              className="absolute -right-1 top-1/2 z-10 grid -translate-y-1/2 lg:hidden"
            />
          </div>
        </div>

        {/* ---------- items of the active tab ---------- */}
        <div className="min-w-0 lg:col-start-1">
          <AnimatePresence mode="wait">
            <motion.ul
              key={category.id}
              className="grid gap-x-6 sm:grid-cols-2 xl:gap-x-12"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
              transition={{ duration: 0.25 }}
            >
              {category.items.map((it) => {
                const active = it.id === item.id;
                return (
                  <motion.li
                    key={it.id}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setItemId(it.id)}
                      aria-pressed={active}
                      className={`group w-full touch-manipulation border-b py-4 text-left transition-colors duration-300 sm:py-5 ${
                        active ? "border-[#b23a26]" : "border-[#e6d6c8] hover:border-[#c9a99a]"
                      }`}
                    >
                      <h3
                        className={`${FONT_PRIMARY} text-xl font-bold transition-colors duration-300 sm:text-2xl lg:text-xl xl:text-2xl ${
                          active ? "text-[#b23a26]" : "group-hover:text-[#b23a26]"
                        }`}
                      >
                        {it.name}
                      </h3>
                      <p className="mt-1 max-w-[17rem] text-sm leading-snug text-[#7a6258] sm:text-[15px]">
                        {it.desc}
                      </p>
                      <p className={`${FONT_SECONDARY} mt-2.5 text-lg font-bold sm:mt-3 xl:text-xl`}>
                        {it.price}
                      </p>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* ---------- CTA ---------- */}
        <div className="lg:col-start-1">
          <Link
            href="/menu"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#8a1c14] px-7 py-3.5 text-base font-bold text-[#5b0f0f] transition-colors duration-300 hover:bg-[#8a1c14] hover:text-white sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            View Full Menu
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowIcon dir="right" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}