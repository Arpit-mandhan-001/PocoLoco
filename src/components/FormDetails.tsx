'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// SVG Icons (Zero external dependency required)
const UserIcon = () => (
  <svg
    className="w-5 h-5 text-stone-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    className="w-5 h-5 text-stone-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="w-5 h-5 text-stone-500 pointer-events-none"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const PencilIcon = () => (
  <svg
    className="w-5 h-5 text-stone-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

export default function FormDetails() {
  const [formData, setFormData] = useState({
  firstName: '',
  secondName: '',
  email: '',
  message: '',
});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form submission here
    console.log('Form Submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section className="w-full bg-[#faf6ee]">
  <div className="w-full grid grid-cols-1 lg:grid-cols-[50%_50%] items-stretch gap-0">
        
        {/* LEFT COLUMN: IMAGE SECTION */}
        <motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
  className="relative w-full min-h-[380px] lg:min-h-[620px] overflow-hidden"
>
  <Image
    src="/images/reservations.jpg"
    alt="Modern Conference Interior Space"
    fill
    priority
    sizes="(max-width: 1024px) 100vw, 50vw"
    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
  />
</motion.div>

        {/* RIGHT COLUMN: FORM SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full min-w-0 flex flex-col justify-center px-5 py-10 sm:px-8 lg:px-12 lg:py-16"
        >
          <h2 className="font-gambero text-4xl sm:text-5xl font-bold uppercase tracking-normal text-stone-950 tracking-tight mb-8">
            Get In Touch
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
  {/* Row 1: First Name and Second Name */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <div className="relative flex items-center">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="w-full bg-[#f7f2e7] text-stone-800 placeholder-stone-500 font-medium py-4 pl-6 pr-12 rounded-3xl outline-none border border-transparent focus:border-stone-400 transition-all duration-200"
      />
      <div className="absolute right-5 pointer-events-none">
        <UserIcon />
      </div>
    </div>

    <div className="relative flex items-center">
      <input
        type="text"
        name="secondName"
        placeholder="Second Name"
        value={formData.secondName}
        onChange={handleChange}
        required
        className="w-full bg-[#f7f2e7] text-stone-800 placeholder-stone-500 font-medium py-4 pl-6 pr-12 rounded-3xl outline-none border border-transparent focus:border-stone-400 transition-all duration-200"
      />
      <div className="absolute right-5 pointer-events-none">
        <UserIcon />
      </div>
    </div>
  </div>

  {/* Row 2: Email */}
  <div className="relative flex items-center">
    <input
      type="email"
      name="email"
      placeholder="Your Email"
      value={formData.email}
      onChange={handleChange}
      required
      className="w-full bg-[#f7f2e7] text-stone-800 placeholder-stone-500 font-medium py-4 pl-6 pr-12 rounded-3xl outline-none border border-transparent focus:border-stone-400 transition-all duration-200"
    />
    <div className="absolute right-5 pointer-events-none">
      <MailIcon />
    </div>
  </div>

  {/* Row 3: Message */}
  <div className="relative">
    <textarea
      name="message"
      rows={6}
      placeholder="Write your message..."
      value={formData.message}
      onChange={handleChange}
      required
      className="w-full bg-[#f7f2e7] text-stone-800 placeholder-stone-500 font-medium pt-5 pb-5 pl-6 pr-12 rounded-3xl outline-none border border-transparent focus:border-stone-400 transition-all duration-200 resize-y min-h-[180px]"
    />
    <div className="absolute right-5 top-5 pointer-events-none">
      <PencilIcon />
    </div>
  </div>

  {/* Row 4: Submit Button */}
  <div className="pt-2 flex items-center gap-4">
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type="submit"
      className="bg-[#111111] hover:bg-stone-800 text-white font-bold tracking-wider text-xs sm:text-sm py-4 px-8 rounded-full uppercase transition-colors shadow-md"
    >
      SEND MESSAGE NOW
    </motion.button>

    {isSubmitted && (
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-emerald-700 font-medium text-sm"
      >
        Message sent successfully!
      </motion.span>
    )}
  </div>
</form>
        </motion.div>

      </div>
    </section>
  );
}