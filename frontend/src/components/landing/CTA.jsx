import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="animated-gradient rounded-[24px] p-12 md:p-16 text-center text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute w-64 h-64 rounded-full bg-white/5 -top-20 -right-20" />
          <div className="absolute w-64 h-64 rounded-full bg-white/5 -bottom-20 -left-20" />
          <div className="absolute w-32 h-32 rounded-full bg-white/10 top-1/2 left-1/4" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-5xl font-bold">
              Ready for your next adventure?
            </h2>
            <p className="text-lg text-white/80 mt-4">
              Join 50,000+ travelers who plan smarter with TripNest.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-primary font-semibold px-8 py-4 rounded-full hover:shadow-xl transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255,255,255,0.3)',
                    '0 0 40px rgba(255,255,255,0.5)',
                    '0 0 20px rgba(255,255,255,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Create Account
              </motion.button>

              <motion.button
                className="border-2 border-white/50 text-white px-8 py-4 rounded-full hover:bg-white/10 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Platform
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
