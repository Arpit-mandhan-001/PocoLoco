import React from "react";
import { FaFacebook, FaGoogle, FaInstagram, FaTiktok } from "react-icons/fa";
import PizzaMarque from "./PizzaMarque";

// Change these variables to use your preferred fonts
const FONT_PRIMARY = "font-gambero font-black";
const FONT_SECONDARY = "font-fredoka";

const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden px-6 py-12 md:px-12 lg:px-20 lg:py-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/footer_bg.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/90 via-black/50 to-black/70" />

      {/* Main Content */}
      <div className="mt-2 sm:mt-3 md:mt-5 lg:mt-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 text-center md:flex-row md:items-start md:gap-8 lg:gap-16">
        {/* Opening Hours */}
        <div className="w-full min-w-0 md:flex-1">
          <h3
            className={`${FONT_PRIMARY} mb-5 text-lg font-semibold tracking-wide`}
          >
            OPENING HOURS
          </h3>

          <div
            className={`${FONT_SECONDARY} space-y-3 text-base leading-relaxed text-gray-300`}
          >
            <p>Mon - Wed: 11:00 AM - 1:00 AM</p>
            <p>Thu - Fri: 11:00 AM - 02:00 AM</p>
            <p>Sat - Sun: 1:00 PM - 12:00 AM</p>
          </div>
        </div>

        {/* Logo and Address */}
        <div className="flex w-full min-w-0 flex-col items-center md:flex-1">
          <img
            src="/images/PocoLoco_Logo.png"
            alt="Poco Loco Pizza"
            className="h-auto w-40 max-w-full object-contain sm:w-48 md:w-44 lg:w-52"
          />

          <address
            className={`${FONT_SECONDARY} mt-5 text-base leading-7 text-gray-300 not-italic`}
          >
            731 6th Ave SW,
            <br />
            Calgary, AB T2P 0T9
          </address>
        </div>

        {/* Contact */}
        <div className="w-full min-w-0 md:flex-1 ">
          
            <h3
              className={`${FONT_PRIMARY} mb-5 text-lg font-semibold tracking-wide`}
            >
              CONNECT WITH US
            </h3>
            <div className="mb-6 flex items-center justify-center gap-5">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-300 transition-colors duration-300 hover:text-blue-500"
              >
                <FaFacebook size={22} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 transition-colors duration-300 hover:text-pink-500"
              >
                <FaInstagram size={24} />
              </a>

              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google"
                className="text-gray-300 transition-colors duration-300 hover:text-red-500"
              >
                <FaGoogle size={22} />
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-300 transition-colors duration-300 hover:text-cyan-400"
              >
                <FaTiktok size={22} />
              </a>
            </div>
          


          <div className={` text-base leading-relaxed`}>
            <h4 className={`${FONT_PRIMARY} mb-3`}>CONTACT</h4>

            <p className={`${FONT_SECONDARY}`}>
              <a
                href="tel:+14032462002"
                className="break-words text-gray-300 transition-colors duration-300 hover:text-white"
              >
                (403) 246-2002
              </a>
            </p>

            <p className={`${FONT_SECONDARY}`}>
              <a
                href="mailto:pocolocopizza@shaw.ca"
                className="break-all text-gray-300 transition-colors duration-300 hover:text-white"
              >
                pocolocopizza@shaw.ca
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Divider and Navigation */}
      <div className="mx-auto mt-12 w-full max-w-7xl border-t border-white/20 pt-6 md:mt-14 lg:mt-16">
        <nav
          className={`${FONT_PRIMARY} tracking-wider mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-[18px] sm:gap-x-8`}
        >
          <a
            href="/"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Home
          </a>

          <a
            href="/menu"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Menu
          </a>

          <a
            href="/about"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            About Us
          </a>

          <a
            href="/contact"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Contact
          </a>

          <a
            href="/blogs"
            className="transition-colors duration-300 hover:text-gray-300"
          >
            Blogs
          </a>
        </nav>

        {/* Copyright */}
        <div
          className={`${FONT_SECONDARY}flex justify-center text-center items-center text-sm leading-relaxed text-gray-400 sm:text-[12px]`}
        >
          Copyright © 2026 POCO LOCO PIZZA
        </div>
      </div>
    </footer>
  );
};

export default Footer;
