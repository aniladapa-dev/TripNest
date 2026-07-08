import { motion } from 'framer-motion';
import { Clock, MapPin, Coffee, Camera, Utensils, ChevronDown } from 'lucide-react';
import { useState, memo } from 'react';
import EmptyState from '../ui/EmptyState';

const getIconForType = (type) => {
  switch (type.toLowerCase()) {
    case 'sightseeing': return <Camera size={16} />;
    case 'dining': return <Utensils size={16} />;
    case 'experience': return <Coffee size={16} />;
    default: return <MapPin size={16} />;
  }
};

const getColorForType = (type) => {
  switch (type.toLowerCase()) {
    case 'sightseeing': return 'bg-blue-100 text-blue-600';
    case 'dining': return 'bg-orange-100 text-orange-600';
    case 'experience': return 'bg-purple-100 text-purple-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const UpcomingItinerary = memo(({ itinerary }) => {
  const [expanded, setExpanded] = useState(null);

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm">
        <h3 className="font-heading font-bold text-lg text-text mb-4">Today's Itinerary</h3>
        <EmptyState title="Free day!" message="You have no activities planned for today. Time to explore or relax." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-lg text-text">Today's Itinerary</h3>
        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">Kyoto, Day 3</span>
      </div>

      <div className="relative border-l-2 border-border ml-3 space-y-6">
        {itinerary.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-6"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${getColorForType(item.type).split(' ')[0]}`}></div>
            
            <div 
              className="bg-background rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary mb-1">
                    <Clock size={14} className="text-primary" />
                    {item.time} ({item.period})
                  </div>
                  <h4 className="font-semibold text-text">{item.activity}</h4>
                </div>
                <div className={`p-2 rounded-lg ${getColorForType(item.type)} shrink-0`}>
                  {getIconForType(item.type)}
                </div>
              </div>

              {/* Expandable Content */}
              <motion.div
                initial={false}
                animate={{ height: expanded === index ? 'auto' : 0, opacity: expanded === index ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 mt-3 border-t border-border">
                  <p className="text-sm text-text-secondary flex items-center gap-2">
                    <MapPin size={14} />
                    {item.location}
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    Ensure you have your digital tickets ready. The meeting point is right outside the main gate.
                  </p>
                </div>
              </motion.div>

              <div className="mt-2 flex justify-center">
                <ChevronDown size={16} className={`text-text-muted transition-transform ${expanded === index ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default UpcomingItinerary;
