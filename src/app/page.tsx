import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Products from '@/components/Products'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppFAB from '@/components/WhatsAppFAB'

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-peach focus:text-white focus:rounded-full focus:shadow-lg focus:text-sm focus:font-semibold"
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Products />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
