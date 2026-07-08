import { motion } from 'framer-motion';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';

const destinations = [
  {
    name: 'Paris',
    country: 'France',
    rating: 4.9,
    price: '₹1,05,000',
    image: '/images/paris.jpg',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    rating: 4.8,
    price: '₹75,000',
    image: '/images/bali.jpg',
  },
  {
    name: 'Dubai',
    country: 'UAE',
    rating: 4.7,
    price: '₹1,25,000',
    image: '/images/dubai.jpg',
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    rating: 4.9,
    price: '₹99,000',
    image: '/images/tokyo.jpg',
  },
  {
    name: 'Switzerland',
    country: 'Europe',
    rating: 4.8,
    price: '₹1,35,000',
    image: '/images/switzerland.jpg',
  },
  {
    name: 'Santorini',
    country: 'Greece',
    rating: 4.9,
    price: '₹89,000',
    image: '/images/santorini.jpg',
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-24">
      <SectionHeading
        title="Popular Destinations"
        subtitle="Discover the world's most breathtaking places, handpicked for unforgettable experiences."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 mt-16">
        {destinations.map((destination, index) => (
          <ScrollReveal key={destination.name} delay={index * 0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Image */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />

                {/* Price badge */}
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-primary">
                  {destination.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-xl">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {destination.country}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
