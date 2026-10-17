import React from 'react'
import HeroSection from './HeroSection'
import AboutSection from './AboutUs'
import MenuSection from './MenuSection'
import WhyChooseUs from './WhyChooseUs'
import Reservation from './Reservation'
import NewsletterSection from './NewsLetterSection'
import InstagramSection from './InstagramSection'
import BlogSection from './Blog'
import ImageMarquee from './about_us_marque'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <WhyChooseUs />
      <Reservation />
      <InstagramSection />
      <BlogSection />
      <NewsletterSection />
      <ImageMarquee />
    </>
  )
}

export default HomePage