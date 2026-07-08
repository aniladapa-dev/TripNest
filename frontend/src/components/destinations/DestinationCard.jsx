import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, Sun, Wallet, Clock } from 'lucide-react';
import { formatINR } from '../../utils/currency';

const DestinationCard = ({ destination }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col w-full h-[480px] rounded-3xl overflow-hidden bg-background border border-border shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      {/* Image Section (Top 60%) */}
      <div className="relative h-[60%] w-full overflow-hidden">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={destination?.image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'} 
          alt={destination?.name || 'Destination'}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
        
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2.5 rounded-full glass-card hover:bg-white/20 transition-colors z-10"
          aria-label="Toggle Favorite"
        >
          <Heart 
            size={20} 
            className={`transition-colors ${isFavorite ? 'fill-accent text-accent' : 'text-white'}`} 
          />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 text-white font-medium text-sm">
          <Star size={16} className="fill-accent text-accent" />
          <span>{destination?.rating || '4.8'}</span>
          <span className="text-white/80 text-xs ml-1">({destination?.reviews || '1.2k'})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 justify-between">
        <div>
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-2xl font-heading font-bold text-text truncate pr-2">
              {destination?.name || 'Jaipur'}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary mb-4">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm font-medium">{destination?.country || 'India'}</span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
                <Sun size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary whitespace-nowrap">Best Season</span>
                <span className="text-xs font-semibold text-text truncate">{destination?.bestSeason || 'Oct - Mar'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-lg bg-accent/10 text-accent shrink-0">
                <Wallet size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary whitespace-nowrap">Est. Budget</span>
                <span className="text-xs font-semibold text-text truncate">{destination?.estBudget ? formatINR(destination.estBudget) : '₹45,000'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-lg bg-secondary/10 text-secondary shrink-0">
                <Clock size={16} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary whitespace-nowrap">Duration</span>
                <span className="text-xs font-semibold text-text truncate">{destination?.duration || '5-7 Days'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
          Explore Destination
        </button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
