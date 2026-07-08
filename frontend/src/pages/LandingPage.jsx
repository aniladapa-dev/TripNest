import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Stats from '../components/landing/Stats';
import Features from '../components/landing/Features';
import Destinations from '../components/landing/Destinations';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import About from '../components/landing/About';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function LandingPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Destinations />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <About />
        <CTA />
      </main>
      <Footer />
    </motion.div>
  );
}
