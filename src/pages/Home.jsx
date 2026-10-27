import usePageMeta from '../lib/usePageMeta'
import Hero from '../components/home/Hero'
import BrandStrip from '../components/home/BrandStrip'
import AboutTeaser from '../components/home/AboutTeaser'
import ServicesGrid from '../components/home/ServicesGrid'
import FeaturedProjects from '../components/home/FeaturedProjects'
import WhyBento from '../components/home/WhyBento'
import ProcessSection from '../components/home/ProcessSection'
import GrowthShowcase from '../components/home/GrowthShowcase'
import Testimonials from '../components/home/Testimonials'
import BlogTeaser from '../components/home/BlogTeaser'
import FinalCta from '../components/home/FinalCta'

export default function Home() {
  usePageMeta({
    title: 'استودیو خلاقیت و رشد دیجیتال',
    description:
      'لومیلا؛ استودیو خلاقیت و رشد دیجیتال. سئو، طراحی سایت وردپرسی، هویت بصری و طراحی تجربه کاربری برای برندهایی که می‌خواهند متفاوت دیده شوند.',
  })

  return (
    <>
      <Hero />
      <BrandStrip />
      <AboutTeaser />
      <ServicesGrid />
      <FeaturedProjects />
      <WhyBento />
      <ProcessSection />
      <GrowthShowcase />
      <Testimonials />
      <BlogTeaser />
      <FinalCta />
    </>
  )
}
