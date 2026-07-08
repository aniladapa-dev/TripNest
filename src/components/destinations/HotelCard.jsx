import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Coffee, Waves, Dumbbell, Car, Utensils } from 'lucide-react';

const amenityIcons = {
  wifi: <Wifi size={14} />,
  breakfast: <Coffee size={14} />,
  pool: <Waves size={14} />,
  gym: <Dumbbell size={14} />,
  parking: <Car size={14} />,
  restaurant: <Utensils size={14} />
};

export default function HotelCard({ hotel }) {
  const { 
    id, 
    name, 
    image, 
    rating, 
    reviews, 
    distance, 
    pricePerNight, 
    amenities = [] 
  } = hotel;

  // Format price in Indian Rupee
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(pricePerNight);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col md:flex-row bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all"
    >
      {/* Image Section */}
      <div className="relative h-56 md:h-auto md:w-2/5 overflow-hidden">
        <img 
          src={image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-slate-900 dark:text-white">{rating}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">({reviews})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{name}</h3>
          </div>
          
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-4">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <span>{distance} from center</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-6">
            {amenities.slice(0, 4).map((amenity, index) => (
              <span 
                key={index} 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium capitalize"
              >
                {amenityIcons[amenity.toLowerCase()] || <Star size={14} />}
                {amenity}
              </span>
            ))}
            {amenities.length > 4 && (
              <span className="flex items-center px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                +{amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formattedPrice}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">/ night</span>
            </div>
          </div>
          
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-blue-200 dark:shadow-none">
            View Deal
          </button>
        </div>
      </div>
    </motion.div>
  );
}
