"use client";

import React, { useEffect, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = ["Home", "Menu", "About Us", "Reservation", "Blog"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const linkClass =
    "relative font-gambero text-[18px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:text-white/60 after:absolute after:-bottom-1.5 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-out hover:after:w-full text-white/90";

  const getNavHref = (item : string) => {
    switch (item) {
      case "Home":
        return "#home";
      case "Menu":
        return "#menu";
      case "About Us":
        return "#about-us";
      case "Reservation":
        return "#reservation";
      case "Blog":
        return "#blog";
      default:
        return "#";
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed left-0 top-0 z-[60] w-full px-6 bg-black transition-all duration-300 lg:px-10 ${
          isOpen
            ? "bg-white py-2 text-black shadow-sm"
            : isScrolled
              ? " py-2 text-[#1f3d1f] shadow-sm"
              :"py-4 text-[#1f3d1f] "
        }`}
      >
        <nav className="flex w-full items-center justify-between">
  {/* Logo */}
  <a
    href="/"
    onClick={() => setIsOpen(false)}
    className="-ml-3 flex shrink-0 items-center justify-center"
    aria-label="Go to home"
  >
    <img
      src="/images/PocoLoco_Logo.png"
      alt="Website Logo"
      className={`w-30 h-30 object-contain transition-all duration-300 ${
        isScrolled || isOpen
          ? "max-h-10 sm:max-h-12 scale-[110%] ml-10"
          : "max-h-12 sm:max-h-14 scale-[150%] ml-12"
      }`}
    />
  </a>

  {/* Desktop Navigation */}
  <div className="hidden flex-1 items-center justify-center gap-12 lg:flex">

    <a href="#home" className={linkClass}>
      Home
    </a>
    <a href="#menu" className={linkClass}>
      Menu
    </a>

    <a href="#about-us" className={linkClass}>
      About Us
    </a>

    <a href="/careers" className={linkClass}>
      Reservation
    </a>

    <a href="#catering" className={linkClass}>
      Blog
    </a>
  </div>

  {/* Download Our App */}
  <div className="hidden shrink-0 lg:block">
    <a
      href="/contact"
      className={`inline-flex items-center rounded-2xl px-4 py-4 text-[12px] font-[800] uppercase tracking-[0.08em]  transition-all duration-300 hover:bg-[#f4a261]/70 bg-[#f4a261] text-black`}
    >
      Contact Us
    </a>
  </div>

  {/* Mobile Hamburger / Close Button */}
  <button
    type="button"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
    onClick={() => setIsOpen((prev) => !prev)}
    className="relative z-[70] flex h-8 w-8 flex-col items-end justify-center gap-1.5 lg:hidden"
  >
    <span
      className={`block h-[1px] w-5 transition-all duration-300 ease-in-out ${
        isOpen ? "translate-y-[6px] rotate-45 bg-black" : "bg-white"
      }`}
    />

    <span
      className={`block h-[1px] transition-all duration-300 ease-in-out ${
        isOpen
          ? "w-5 -translate-y-[1px] -rotate-45 bg-black"
          : "w-3 bg-white"
      }`}
    />
  </button>
</nav>
      </header>

      {/* Full-Screen Mobile Menu */}
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 h-[115dvh] md:h-[120dvh] w-screen overflow-y-auto bg-white lg:hidden ${
          isOpen ? "visible -translate-y-20 sm:-translate-y-20" : "invisible -translate-y-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-8 bg-white px-6 py-24">
          {navItems.map((item) => (
            <a
              key={item}
              href={getNavHref(item)}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className="font-gambero text-sm font-medium uppercase tracking-[0.25em] text-black transition-opacity duration-300 hover:opacity-50"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;