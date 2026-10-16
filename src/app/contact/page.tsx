import ContactHero from '@/components/ContactHero'
import FormDetails from '@/components/FormDetails'
import NewsletterSection from '@/components/NewsLetterSection'
import PizzaMarque from '@/components/PizzaMarque'
import RestaurantLocation from '@/components/RestaurantLocation'
import React from 'react'

const page = () => {
  return (
    <>
    <ContactHero />
    <FormDetails />
    <RestaurantLocation />
    <NewsletterSection />
    <PizzaMarque />
    </>
  )
}

export default page