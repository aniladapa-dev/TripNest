import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TravelCalendar({ trips = [] }) {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Initialize display month/year based on the first upcoming trip, or current date
  const [currentDate, setCurrentDate] = useState(() => {
    const upcoming = trips.find(t => t.status === 'Upcoming' || t.status === 'Planning');
    return upcoming && upcoming.startDate ? new Date(upcoming.startDate) : new Date();
  });

  // Keep display in sync if trips list loads/changes
  useEffect(() => {
    const upcoming = trips.find(t => t.status === 'Upcoming' || t.status === 'Planning');
    if (upcoming && upcoming.startDate) {
      setCurrentDate(new Date(upcoming.startDate));
    }
  }, [trips]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get number of days in the month
  const numDays = new Date(year, month + 1, 0).getDate();
  // Get starting day index of the month (0 = Sunday, 1 = Monday, etc.)
  const startDayIndex = new Date(year, month, 1).getDay();

  const dates = Array.from({ length: numDays }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: startDayIndex }, (_, i) => i);

  // Check if a date falls in any trip's range
  const getTripForDate = (dateNum) => {
    if (!trips || trips.length === 0) return null;
    const current = new Date(year, month, dateNum);
    current.setHours(0, 0, 0, 0);

    return trips.find(t => {
      if (!t.startDate || !t.endDate) return false;
      const start = new Date(t.startDate);
      const end = new Date(t.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return current >= start && current <= end;
    });
  };

  const isTripStart = (t, dateNum) => {
    if (!t || !t.startDate) return false;
    const start = new Date(t.startDate);
    return start.getFullYear() === year && start.getMonth() === month && start.getDate() === dateNum;
  };

  const isTripEnd = (t, dateNum) => {
    if (!t || !t.endDate) return false;
    const end = new Date(t.endDate);
    return end.getFullYear() === year && end.getMonth() === month && end.getDate() === dateNum;
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() - 1);
      return copy;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() + 1);
      return copy;
    });
  };

  // Find the trip starting in the displayed month/year for the footer legend
  const getActiveTripForDisplay = () => {
    if (!trips || trips.length === 0) return null;
    return trips.find(t => {
      if (!t.startDate) return false;
      const start = new Date(t.startDate);
      return start.getFullYear() === year && start.getMonth() === month;
    });
  };

  const activeTrip = getActiveTripForDisplay() || (trips && trips.find(t => t.status === 'Upcoming' || t.status === 'Planning')) || trips[0];

  const formatDateText = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-lg text-text">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevMonth}
            className="p-1 rounded-md hover:bg-gray-100 text-text-secondary cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-1 rounded-md hover:bg-gray-100 text-text-secondary cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-text-muted">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Empty slots for starting day of the month */}
        {emptySlots.map(slot => (
          <div key={`empty-${slot}`} className="text-center py-2"></div>
        ))}
        
        {dates.map((date) => {
          const matchedTrip = getTripForDate(date);
          const isTrip = !!matchedTrip;
          const isStart = matchedTrip ? isTripStart(matchedTrip, date) : false;
          const isEnd = matchedTrip ? isTripEnd(matchedTrip, date) : false;
          
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
        {activeTrip ? (
          <span>{activeTrip.destination.split(',')[0]} Trip ({formatDateText(activeTrip.startDate)} - {formatDateText(activeTrip.endDate)})</span>
        ) : (
          <span>No trips planned</span>
        )}
      </div>
    </div>
  );
}
