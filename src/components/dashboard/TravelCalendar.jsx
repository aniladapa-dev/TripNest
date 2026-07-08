import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TravelCalendar() {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-lg text-text">October 2024</h3>
        <div className="flex gap-2">
          <button className="p-1 rounded-md hover:bg-gray-100 text-text-secondary"><ChevronLeft size={18} /></button>
          <button className="p-1 rounded-md hover:bg-gray-100 text-text-secondary"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-text-muted">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Empty slots for starting day */}
        <div className="text-center py-2"></div>
        <div className="text-center py-2"></div>
        
        {dates.map((date) => {
          const isTrip = date >= 12 && date <= 20;
          const isStart = date === 12;
          const isEnd = date === 20;
          
          return (
            <motion.div 
              key={date}
              whileHover={{ scale: 1.1 }}
              className={`text-center py-2 text-sm rounded-lg cursor-pointer transition-colors
                ${isTrip ? 'bg-primary text-white font-bold' : 'text-text hover:bg-gray-100'}
                ${isStart ? 'rounded-l-full' : ''}
                ${isEnd ? 'rounded-r-full' : ''}
                ${isTrip && !isStart && !isEnd ? 'rounded-none' : ''}
              `}
            >
              {date}
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs font-medium text-text-secondary">
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        Kyoto Trip (Oct 12 - 20)
      </div>
    </div>
  );
}
