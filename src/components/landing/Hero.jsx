import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, Star } from 'lucide-react';
import Button from '../ui/Button';

/* ── Stagger Animation Variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/* ── Cloud SVG Component ── */
function CloudSVG({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 80"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M170 60H30c-16.6 0-30-10.7-30-24s13.4-24 30-24c1 0 2 .05 3 .14C39.5 5 49.5 0 61 0c14.3 0 26.5 8.2 32 20 3-1.3 6.3-2 9.8-2 13.8 0 25 11.2 25 25 0 .7 0 1.3-.1 2H170c16.6 0 30 6.7 30 15s-13.4 15-30 15z" />
    </svg>
  );
}

/* ── Airplane SVG Component ── */
function AirplaneSVG() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    >
      <div
        className="animate-plane-path"
        style={{
          offsetPath:
            'path("M -60 500 C 200 300, 500 100, 800 250 C 1100 400, 1300 200, 1500 100")',
          offsetRotate: 'auto',
          position: 'absolute',
          width: 40,
          height: 40,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-10 h-10 text-primary/30 drop-shadow-lg"
          style={{ transform: 'scaleX(-1)' }}
        >
          <path
            d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Floating Mini Card ── */
function MiniCard({ city, rating, className, animationClass = 'animate-float' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={`absolute glass-card rounded-xl p-3 shadow-lg ${animationClass} ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">
            {city.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-text">{city}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-accent fill-accent" />
            <span className="text-[10px] font-medium text-text-secondary">
              {rating}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  const { scrollY } = useScroll();
  const cloudY1 = useTransform(scrollY, [0, 600], [0, -80]);
  const cloudY2 = useTransform(scrollY, [0, 600], [0, -50]);
  const cloudY3 = useTransform(scrollY, [0, 600], [0, -120]);
  const contentY = useTransform(scrollY, [0, 500], [0, 60]);
  const illustrationY = useTransform(scrollY, [0, 500], [0, -40]);

  const headlineWords1 = ['Plan', 'Smarter.'];
  const headlineWords2 = ['Travel', 'Better.'];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{
        background:
          'linear-gradient(to bottom right, var(--color-background), rgba(37, 99, 235, 0.05))',
      }}
    >
      {/* ── Background Clouds ── */}
      <motion.div style={{ y: cloudY1 }} className="absolute top-[10%] left-[-5%] z-[1]">
        <CloudSVG className="w-48 md:w-64 text-white opacity-30 animate-cloud-drift" />
      </motion.div>
      <motion.div style={{ y: cloudY2 }} className="absolute top-[35%] right-[-10%] z-[1]">
        <CloudSVG className="w-36 md:w-48 text-white opacity-20 animate-cloud-drift-slow" />
      </motion.div>
      <motion.div style={{ y: cloudY3 }} className="absolute bottom-[20%] left-[10%] z-[1]">
        <CloudSVG className="w-40 md:w-56 text-white opacity-40 animate-cloud-drift" />
      </motion.div>

      {/* ── Airplane ── */}
      <AirplaneSVG />

      {/* ── Decorative Gradient Orbs ── */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20 lg:pt-32 lg:pb-24">
        <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* ── Left Column ── */}
          <motion.div style={{ y: contentY }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium w-fit mb-6"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Travel Planning
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight"
            >
              <span className="block">
                {headlineWords1.map((word, i) => (
                  <motion.span
                    key={`line1-${i}`}
                    variants={wordVariants}
                    className="inline-block mr-4"
                  >
                    {i === 0 ? (
                      <span className="text-text">{word}</span>
                    ) : (
                      <span className="gradient-text">{word}</span>
                    )}
                  </motion.span>
                ))}
              </span>
              <span className="block mt-2">
                {headlineWords2.map((word, i) => (
                  <motion.span
                    key={`line2-${i}`}
                    variants={wordVariants}
                    className="inline-block mr-4"
                  >
                    {i === 0 ? (
                      <span className="text-text">{word}</span>
                    ) : (
                      <span className="gradient-text">{word}</span>
                    )}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg text-text-secondary max-w-lg mt-6 leading-relaxed"
            >
              Your all-in-one travel companion that plans, books, and optimizes
              every journey — powered by AI for smarter, stress-free adventures.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg" glow>
                <span className="flex items-center gap-2">
                  Start Planning
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
              <Button variant="outline" size="lg">
                <span className="flex items-center gap-2">
                  <Compass className="w-5 h-5" />
                  Explore Destinations
                </span>
              </Button>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary ring-2 ring-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-light ring-2 ring-white -ml-2" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary ring-2 ring-white -ml-2" />
              </div>
              <p className="text-sm text-text-muted">
                Join <span className="font-semibold text-text-secondary">50K+</span> happy travelers
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right Column (Desktop Only) ── */}
          <motion.div
            style={{ y: illustrationY }}
            className="hidden lg:block relative mt-12 lg:mt-0"
          >
            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="animate-float"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-illustration.jpg"
                  alt="Travel destinations collage showcasing beautiful landscapes"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent rounded-2xl" />
              </div>
            </motion.div>

            {/* Floating Mini Cards */}
            <MiniCard
              city="Paris"
              rating="4.9"
              className="top-0 left-0 -translate-x-4 -translate-y-2"
              animationClass="animate-float"
            />
            <MiniCard
              city="Bali"
              rating="4.8"
              className="bottom-10 right-0 translate-x-4"
              animationClass="animate-float-slow"
            />
            <MiniCard
              city="Tokyo"
              rating="4.7"
              className="top-20 right-0 translate-x-6"
              animationClass="animate-float"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
