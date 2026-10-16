"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PizzaMarqueProps {
  color?: string;
}

const FONT_PRIMARY = "font-sans";

const PIZZAIMAGES = [
  "/images/pizza.avif",
  "/images/pizza.avif",
  "/images/pizza.avif",
  "/images/pizza.avif",
];

const DRINKIMAGE = "/images/drink.png";

const PizzaMarque: React.FC<PizzaMarqueProps> = ({ color = "#ffffff" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const firstItem = firstItemRef.current;

      if (!track || !firstItem) return;

      const getDistance = () => firstItem.offsetWidth;

      const animation = gsap.to(track, {
        x: () => -getDistance(),
        duration: 60,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const distance = getDistance();
            return `${gsap.utils.wrap(-distance, 0, parseFloat(x))}px`;
          },
        },
      });

      const handleResize = () => {
        animation.invalidate();
        animation.progress(0);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef },
  );

  const renderText = (key: string, ref?: React.Ref<HTMLDivElement>) => (
    <div
      key={key}
      ref={ref}
      style={{
        color,
        WebkitTextStroke: "clamp(2px, 0.55vw, 5px)",
      }}
      className={`${FONT_PRIMARY} bg-[#db2627] flex shrink-0 items-center whitespace-nowrap text-[100px] font-bold leading-none tracking-wider sm:text-[120px] md:text-[140px] lg:text-[170px] xl:text-[180px]`}
    >
      <span>P</span>

      <img
        src={PIZZAIMAGES[0]}
        alt="Pizza 1"
        draggable={false}
        className="h-20 w-24 shrink-0 object-contain sm:h-28 sm:w-32 md:h-32 md:w-36 lg:h-40 lg:w-44"
      />

      <span className="mr-8">CO</span>

      {/* <img
        src={PIZZAIMAGES[1]}
        alt="Pizza 2"
        draggable={false}
        className="h-20 w-24 shrink-0 object-contain sm:h-28 sm:w-32 md:h-32 md:w-36 lg:h-40 lg:w-44"
      /> */}

      <span>L</span>

      <img
        src={PIZZAIMAGES[2]}
        alt="Pizza 3"
        draggable={false}
        className="h-20 w-24 shrink-0 object-contain sm:h-28 sm:w-32 md:h-32 md:w-36 lg:h-40 lg:w-44"
      />

      <span>C</span>

      <img
        src={PIZZAIMAGES[3]}
        alt="Pizza 4"
        draggable={false}
        className="h-20 w-24 shrink-0 object-contain sm:h-28 sm:w-32 md:h-32 md:w-36 lg:h-40 lg:w-44"
      />

      <span className="ml-3 -mr-2 sm:ml-5 sm:-mr-3 lg:ml-8 lg:-mr-5">P</span>

      <img
        src={DRINKIMAGE}
        alt="Drink"
        draggable={false}
        className="h-20 w-20 shrink-0 -translate-x-2 object-contain sm:h-25 sm:w-25 sm:-translate-x-2 md:h-36 md:w-32 lg:h-44 lg:w-38 lg:-translate-x-4"
      />

      <span className="-ml-2 mr-5 sm:-ml-2 sm:mr-7 lg:-ml-3 lg:mr-10">ZZA</span>
    </div>
  );

  return (
    <section ref={containerRef} className="w-full overflow-hidden text-white">
      <div
        ref={trackRef}
        className="flex w-max items-center"
        aria-label="Pizza carousel"
      >
        {renderText("first", firstItemRef)}
        {renderText("second")}
      </div>
    </section>
  );
};

export default PizzaMarque;
