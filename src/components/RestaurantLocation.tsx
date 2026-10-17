
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const LEAF_IMAGE = "/images/sticker2.png";
// const PIZZA_IMAGE = "/images/sticker6.avif";

const RESTAURANT_ADDRESS = "213 W Tomichi Ave, Gunnison, CO 81230, United States";

export default function RestaurantLocation() {
  const leafRef = useRef<HTMLDivElement>(null);
  const pizzaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Move the leaf slowly up and down.
      gsap.to(leafRef.current, {
        y: -18,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Move the pizza slowly up and down.
      gsap.to(pizzaRef.current, {
        y: -14,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full overflow-hidden bg-[#ffdfb5]">
      <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-[50%_50%]">
        {/* Left side: restaurant information */}
        <div className="relative flex min-h-[600px] items-center justify-center p-5 sm:p-8 lg:min-h-[650px] lg:p-5 xl:p-6">
          <div className="relative flex min-h-[560px] w-full max-w-[900px] flex-col items-center justify-center overflow-hidden rounded-[20px] border-[3px] border-white px-5 py-12 text-center sm:px-10 lg:min-h-[570px] lg:px-12">
            
            {/* Floating leaf decoration */}
            <div
              ref={leafRef}
              className="pointer-events-none absolute left-[2%] top-[25%] z-0 w-[105px] sm:left-[2%] sm:w-[150px] lg:left-[1%] lg:top-[27%] lg:w-[165px] xl:w-[190px] will-change-transform"
            >
              <Image
                src={LEAF_IMAGE}
                alt=""
                width={240}
                height={340}
                priority
                className="h-auto w-full object-contain opacity-70"
              />
            </div>

            {/* Heading */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#ff6900] sm:w-[60px]" />
                <p className="font-fredoka text-xs font-extrabold italic uppercase text-[#39976d] sm:text-sm">
                  Restaurant Location
                </p>
                <span className="h-px w-10 bg-[#ff6900] sm:w-[60px]" />
              </div>

              <h2 className="mt-3 font-gambero text-3xl font-black uppercase leading-tight text-[#111111] sm:text-4xl lg:text-[42px] xl:text-5xl">
                Visit Our Restaurant
              </h2>
            </div>

            {/* Address */}
            <div className="relative z-10 mt-10 font-fredoka text-sm leading-7 text-[#77716c] sm:text-base">
              <p>213 W Tomichi Ave, Gunnison, CO</p>
              <p>81230, United States</p>
            </div>

            {/* Decorative divider */}
            <div className="relative z-10 my-5 h-[60px] w-px bg-[#ff6900]" />

            {/* Opening hours */}
            <div className="relative z-10 font-fredoka text-sm leading-7 text-[#77716c] sm:text-base">
              <p>Monday - Saturday: 6:00pm – 10:00pm</p>
              <p>Sunday: is the holiday</p>
            </div>

            {/* Social links */}
            <div className="relative z-10 mt-7 flex items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-black text-lg font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                f
              </a>

              <a
                href="https://www.x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex size-10 items-center justify-center rounded-full border border-black text-base font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                𝕏
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex size-10 items-center justify-center rounded-full border border-black text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                in
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex size-10 items-center justify-center rounded-full border border-black text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                ☎
              </a>
            </div>

            {/* Floating pizza decoration */}
            <div
              ref={pizzaRef}
              className="pointer-events-none absolute bottom-[4%] right-[3%] z-0 w-[100px] sm:bottom-[4%] sm:right-[3%] sm:w-[130px] lg:right-[2%] lg:w-[130px] xl:w-[155px] will-change-transform"
            >
              {/* <Image
                src={""}
                alt=""
                width={220}
                height={220}
                priority
                className="h-auto w-full object-contain"
              /> */}
            </div>
          </div>
        </div>

        {/* Right side: interactive map */}
        <div className="relative min-h-[420px] w-full overflow-hidden bg-[#e5e9e5] sm:min-h-[500px] lg:min-h-[650px]">
          <iframe
            title="Restaurant location map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              RESTAURANT_ADDRESS
            )}&z=13&output=embed`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              RESTAURANT_ADDRESS
            )}`}
            target="_blank"
            rel="noreferrer"
            className="absolute left-3 top-3 z-10  bg-white px-4 py-2 font-fredoka text-xs font-semibold text-[#555] shadow-sm transition-colors hover:bg-[#f5f5f5] sm:left-4 sm:top-4 sm:text-sm"
          >
            Open in Maps ↗
          </a>
        </div>
      </div>
    </section>
  );
}
