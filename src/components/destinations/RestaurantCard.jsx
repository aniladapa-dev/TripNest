import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Utensils, Clock } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function RestaurantCard({ restaurant }) {
  const { 
    id, 
    name, 
    image, 
    rating, 
    reviews, 
    cuisine, 
    distance, 
    costForTwo,
    isOpen = true
  } = restaurant;

  // Format price in Indian Rupee
  const formattedCost = formatINR(costForTwo);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all h-full"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${isOpen ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'}`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-white">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold">{rating}</span>
          <span className="text-xs text-white/80">({reviews})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">{name}</h3>
          
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-3">
            <Utensils size={14} />
            <span className="line-clamp-1">{cuisine}</span>
          </div>
          
          <div className="flex flex-col gap-2 text-slate-500 dark:text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="flex-shrink-0" />
              <span className="line-clamp-1">{distance} from center</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA - Pushed to bottom */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Cost for two</p>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {formattedCost}
            </p>
          </div>
          
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-semibold rounded-lg transition-colors">
            Reserve
          </button>
        </div>
      </div>
    </motion.div>
  );
}
