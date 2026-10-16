import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
        <div>
          <h1 className="text-4xl font-bold md:text-6xl">
            Your Hero Heading
          </h1>
          <p className="mt-4 text-lg">
            Your subtitle goes here.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection