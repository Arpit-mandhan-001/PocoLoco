
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function NewsletterSection() {
  const pizzaRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!pizzaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(pizzaRef.current, {
        rotation: 360,
        duration: 100,
        ease: "none",
        repeat: -1,
      });
    }, pizzaRef);

    return () => ctx.revert();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setIsSubmitted(false);
      return;
    }

    setMessage("Thanks for subscribing!");
    setIsSubmitted(true);
    setEmail("");
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#f9f3e3]">
      <div className="mx-auto grid min-h-[600px] w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-2 md:gap-12 md:px-12 lg:px-16 xl:px-20">
        {/* Rotating pizza */}
        <div className="flex items-center justify-center">
          <div
            ref={pizzaRef}
            className="relative aspect-square w-full max-w-[340px] sm:max-w-[410px] lg:max-w-[480px] xl:max-w-[500px] will-change-transform"
          >
            <Image
              src="/images/pizza.avif"
              alt="Freshly baked pizza topped with mozzarella and basil"
              fill
              priority
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 500px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Newsletter content */}
        <div className="mx-auto w-full max-w-[735px]">
          <h2 className="font-gambero text-4xl font-extrabold leading-[1.12] tracking-[-0.04em] text-[#191919] sm:text-5xl lg:text-[58px]">
            Delicious Deals,
            <br />
            Just for You
          </h2>

          <p className="mt-7 max-w-[470px] font-fredoka text-lg leading-[1.55] text-[#171717] sm:text-xl">
            Sign up for our newsletter and receive exclusive offers on new
            pizzas!
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 w-full"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
                setIsSubmitted(false);
              }}
              placeholder="youremail@email.com"
              className="h-[60px] w-full rounded-full border border-[#ededed] bg-[#fafafa] px-6 font-fredoka text-base text-[#191919] outline-none transition-all duration-300 placeholder:text-[#858585] focus:border-[#ff003d] focus:bg-white focus:ring-4 focus:ring-[#ff003d]/10"
            />

            <button
              type="submit"
              className="mt-[30px] flex h-[60px] w-full items-center justify-center rounded-full bg-[#ff003d] px-6 font-fredoka text-lg font-semibold text-white transition-all duration-300 hover:bg-[#e60036] hover:shadow-lg hover:shadow-[#ff003d]/20 active:scale-[0.99] sm:text-xl"
            >
              Submit
            </button>

            {message && (
              <p
                aria-live="polite"
                className={`mt-4 font-fredoka text-sm ${
                  isSubmitted ? "text-green-700" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
