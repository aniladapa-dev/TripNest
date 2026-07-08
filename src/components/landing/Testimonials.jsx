import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Travel Blogger',
    quote:
      'TripNest completely transformed how I plan my trips. The collaborative features are incredible — I can plan with friends in real-time!',
    rating: 5,
    initials: 'SM',
  },
  {
    name: 'James Rodriguez',
    role: 'Digital Nomad',
    quote:
      "The budget tracking is a game-changer. I've saved over 30% on my travel expenses since I started using TripNest.",
    rating: 5,
    initials: 'JR',
  },
  {
    name: 'Emily Chen',
    role: 'Adventure Seeker',
    quote:
      'From day-wise itineraries to weather updates, TripNest thinks of everything. It\'s like having a personal travel assistant.',
    rating: 5,
    initials: 'EC',
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <div className="glass-card rounded-[20px] p-8 relative">
      {/* Quote icon */}
      <Quote className="absolute top-4 right-6 text-primary/20 w-10 h-10" />

      {/* Star rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="fill-amber-400 text-amber-400"
            size={16}
          />
        ))}
      </div>

      {/* Quote text */}
      <p className="italic text-text-secondary mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-semibold text-sm flex items-center justify-center">
          {testimonial.initials}
        </div>
        <div>
          <p className="font-heading font-semibold">{testimonial.name}</p>
          <p className="text-sm text-text-muted">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24">
      <SectionHeading
        title="Loved by Travelers Worldwide"
        subtitle="See what our community has to say about their TripNest experience."
      />

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mt-16">
        {testimonials.map((testimonial, index) => (
          <ScrollReveal key={testimonial.name} delay={index * 0.15}>
            <TestimonialCard testimonial={testimonial} />
          </ScrollReveal>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden max-w-6xl mx-auto px-6 mt-16">
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-primary w-6'
                  : 'bg-text-muted/40 hover:bg-text-muted'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
