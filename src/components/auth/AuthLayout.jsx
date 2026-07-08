import { motion, useScroll, useTransform } from 'framer-motion';

// Decorative plane that animates continuously across the map
const AuthPlaneSVG = () => (
  <motion.div
    className="absolute pointer-events-none z-10 w-full h-full overflow-hidden top-0 left-0"
  >
    <div
      className="animate-plane-path absolute"
      style={{
        offsetPath: 'path("M -100 800 C 300 400, 600 200, 1000 300 C 1400 400, 1600 100, 1800 -100")',
        offsetRotate: 'auto',
        width: 40,
        height: 40,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-12 h-12 text-white/80 drop-shadow-2xl"
        style={{ transform: 'scaleX(-1)' }}
      >
        <path
          d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
          fill="currentColor"
        />
      </svg>
    </div>
  </motion.div>
);

// Decorative cloud
const CloudSVG = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 80"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M170 60H30c-16.6 0-30-10.7-30-24s13.4-24 30-24c1 0 2 .05 3 .14C39.5 5 49.5 0 61 0c14.3 0 26.5 8.2 32 20 3-1.3 6.3-2 9.8-2 13.8 0 25 11.2 25 25 0 .7 0 1.3-.1 2H170c16.6 0 30 6.7 30 15s-13.4 15-30 15z" />
  </svg>
);

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* ── Left Side (Illustration & Animations) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-primary to-secondary-dark p-12">
        {/* Abstract World Map / Dots Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }} />

        {/* Clouds */}
        <CloudSVG className="absolute top-[15%] left-[10%] w-48 text-white opacity-40 animate-cloud-drift" />
        <CloudSVG className="absolute bottom-[25%] right-[20%] w-64 text-white opacity-30 animate-cloud-drift-slow" />
        <CloudSVG className="absolute top-[45%] left-[-10%] w-32 text-white opacity-20 animate-cloud-drift" />

        {/* Plane */}
        <AuthPlaneSVG />

        {/* Content */}
        <div className="relative z-20 text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-24 h-24 bg-white/10 rounded-3xl backdrop-blur-md mx-auto mb-8 flex items-center justify-center border border-white/20 shadow-2xl">
              <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Start your next <br />
              <span className="text-accent-light">great adventure.</span>
            </h1>
            <p className="mt-6 text-lg text-white/80">
              Join thousands of travelers who plan, track, and experience the world effortlessly with TripNest.
            </p>
          </motion.div>
          
          {/* Glass Card Floating inside */}
          <motion.div 
            className="mt-12 glass rounded-2xl p-6 text-left border-white/20 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">JD</div>
              <div>
                <p className="font-semibold text-sm">"TripNest changed everything!"</p>
                <div className="flex gap-1 text-accent-light">
                  {'★★★★★'.split('').map((s,i) => <span key={i}>{s}</span>)}
                </div>
              </div>
            </div>
            <p className="text-sm text-white/70 italic">
              "The most seamless travel planning experience. I love how easy it is to split costs with my friends."
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Right Side (Auth Form) ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 relative z-10">
        
        {/* Mobile/Tablet Background elements */}
        <div className="lg:hidden absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="lg:hidden absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          className="w-full max-w-md bg-white/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none rounded-3xl p-8 lg:p-0 shadow-2xl lg:shadow-none border border-border/50 lg:border-none"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-heading text-2xl font-bold gradient-text">TripNest</span>
          </div>

          {title && (
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold text-text">{title}</h2>
              {subtitle && <p className="text-text-secondary mt-2">{subtitle}</p>}
            </div>
          )}

          {/* Form Content */}
          <div className="w-full">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
