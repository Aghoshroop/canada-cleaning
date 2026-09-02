import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CityTicker from '@/components/CityTicker';
import BrandStatement from '@/components/BrandStatement';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Transformation from '@/components/Transformation';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Trust from '@/components/Trust';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <CityTicker />
        <BrandStatement />
        <Services />
        <Process />
        <Transformation />
        <Testimonials />
        <Trust />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
