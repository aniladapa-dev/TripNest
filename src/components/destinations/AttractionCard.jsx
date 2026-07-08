import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Ticket, Plus } from 'lucide-react';

const AttractionCard = ({ attraction }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex flex-row items-center w-full bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image (Left) */}
      <div className="relative w-32 h-32 flex-shrink-0 sm:w-40 sm:h-40">
        <img 
          src={attraction?.image || 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=400&q=80'} 
          alt={attraction?.title || 'Attraction'} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 glass px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold text-text shadow-sm">
          <Star size={12} className="fill-accent text-accent" />
          <span>{attraction?.rating || '4.5'}</span>
        </div>
      </div>

      {/* Content (Right) */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between h-full">
        <div>
          <h4 className="text-lg font-heading font-bold text-text line-clamp-1 mb-1">
            {attraction?.title || 'Amber Fort'}
          </h4>
          <p className="text-sm text-text-secondary line-clamp-2 mb-3">
            {attraction?.description || 'Majestic hilltop fort featuring intricate Hindu and Mughal architecture, panoramic views, and elephant rides.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
          {/* Details */}
          <div className="flex items-center gap-4 text-xs font-medium text-text-secondary">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary" />
              <span>{attraction?.timeRequired || '2-3 hrs'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ticket size={14} className="text-secondary" />
              <span>{attraction?.entryFee || '₹850'}</span>
            </div>
          </div>

          {/* Action */}
          <button className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-white border border-primary hover:bg-primary px-3 py-1.5 rounded-lg transition-colors">
            <Plus size={16} />
            <span className="hidden sm:inline">Add to Itinerary</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AttractionCard;
