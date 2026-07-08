import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

export default function DaySelector({ days, selectedDay, onSelectDay }) {
  if (!days || days.length === 0) return null;

  return (
    <div className="bg-white rounded-[20px] border border-border/50 shadow-sm overflow-hidden flex flex-col h-full max-h-[calc(100vh-200px)] sticky top-24">
      <div className="p-5 border-b border-border/50 bg-gray-50/50">
        <h3 className="font-heading font-bold text-lg text-text flex items-center gap-2">
          <CalendarDays size={20} className="text-primary" />
          Trip Days
        </h3>
      </div>
      
      <div className="overflow-y-auto p-3 space-y-1 no-scrollbar flex-1">
        <button 
          onClick={() => onSelectDay('all')}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm ${selectedDay === 'all' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-text-secondary hover:bg-gray-100'}`}
        >
          All Days Overview
        </button>
        
        <div className="h-px bg-border/50 my-2 mx-2"></div>
        
        {days.map((day, index) => {
          const isSelected = selectedDay === day.id;
          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex flex-col group ${isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-gray-50 border border-transparent'}`}
            >
              <div className="flex justify-between items-center">
                <span className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-text'}`}>
                  Day {index + 1}
                </span>
                {isSelected && (
                  <motion.div layoutId="activeDayIndicator" className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-xs mt-1 ${isSelected ? 'text-primary/70' : 'text-text-muted'}`}>
                {day.dateFormatted}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
