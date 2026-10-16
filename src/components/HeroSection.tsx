
import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden pt-20">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-[115%] w-full object-cover scale-100"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/55" /> */}
      <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/10 to-black/10" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-start text-left text-[#FDF2E9]">
        <div className="w-full px-6 sm:px-10 lg:px-12">

          {/* Main Heading */}
          <h1 className="max-w-6xl font-gambero text-5xl font-black uppercase leading-[0.98] tracking-[0.02em] text-white [text-shadow:0_3px_18px_rgba(0,0,0,0.65)] sm:text-6xl md:text-7xl lg:text-8xl">

            Love
            <span className="font-black text-[#FDF2E9]">
              {" "}At
            </span>

            <br />

            Every {" "}
            <span className="font-black text-[#DB2627] [text-shadow:0_3px_16px_rgba(0,0,0,0.8)] [-webkit-text-stroke:3px_currentColor]">
              Bite
            </span>

          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl font-fredoka text-base font-medium leading-relaxed tracking-wide text-[#FDF2E9]/95 [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] md:text-xl">
            Freshly baked pizzas, bold flavors, and unforgettable moments
            <br />
            made to be shared.
          </p>

          {/* Button */}
          <a
            href="#menu"
            className="mt-10 inline-flex min-h-[46px] items-center justify-center rounded-[20px] bg-[#f4a261] px-5 py-1 font-fredoka text-base font-medium uppercase tracking-wide text-[#18351C] transition-colors duration-300 hover:bg-[#f4a261]/80"
          >
            See Our Menu
          </a>

        </div>
      </div>
    </section>
  )
}

export default HeroSection