import usePageMeta from '../lib/usePageMeta'
import Hero from '../components/home/Hero'
import BrandStrip from '../components/home/BrandStrip'
import AboutTeaser from '../components/home/AboutTeaser'
import ServicesGrid from '../components/home/ServicesGrid'
import SeoPackages from '../components/home/SeoPackages'
import DesignServices from '../components/home/DesignServices'
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
      'کسب‌وکار بدون سایت خوب و سئو در تاریکی است؛ لومیلا با طراحی سایت، پکیج‌های سئو و هویت بصری، مثل نور کنار شماست.',
  })

  return (
    <>
      <Hero />
      <BrandStrip />
      <AboutTeaser />
      <ServicesGrid />
      <SeoPackages />
      <DesignServices />
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
