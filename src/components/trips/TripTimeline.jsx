import { motion } from 'framer-motion';
import { Camera, MapPin, Coffee, Utensils, Music, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

export default function TripTimeline({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-border/50 p-6 text-center">
        <p className="text-text-secondary">No itinerary events planned yet.</p>
        <Button variant="outline" size="sm" className="mt-4">Add Event</Button>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'sightseeing': return <Camera size={16} />;
      case 'dining': return <Utensils size={16} />;
      case 'experience': return <Coffee size={16} />;
      case 'entertainment': return <Music size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  const getColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'sightseeing': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'dining': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'experience': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'entertainment': return 'bg-pink-100 text-pink-600 border-pink-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm">
      <h3 className="font-heading font-bold text-lg text-text mb-6">Itinerary Timeline</h3>
      
      <div className="relative border-l-2 border-border/60 ml-4 space-y-8 pb-4">
        {events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${getColor(event.type)} z-10`}>
              {getIcon(event.type)}
            </div>
            
            <div className="bg-gray-50/80 rounded-xl p-5 border border-border/50 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-text text-lg group-hover:text-primary transition-colors">{event.title}</h4>
                  <p className="text-sm text-text-secondary flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {event.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-text">{event.time}</span>
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">{event.date}</p>
                </div>
              </div>
              
              {event.description && (
                <p className="text-sm text-text-secondary mt-3 border-t border-border/50 pt-3">
                  {event.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* End of Timeline marker */}
        <div className="absolute -left-[11px] bottom-0 w-5 h-5 rounded-full border-4 border-white bg-emerald-500 z-10 flex items-center justify-center">
          <CheckCircle2 size={12} className="text-white" />
        </div>
      </div>
    </div>
  );
}
