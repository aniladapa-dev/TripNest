import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarView({ activities = [], trip }) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Track active calendar view date
  const [activeDate, setActiveDate] = useState(() => {
    if (trip && trip.startDate) return new Date(trip.startDate);
    if (activities.length > 0 && activities[0].date) return new Date(activities[0].date);
    return new Date();
  });

  // Sync calendar display when active trip changes
  useEffect(() => {
    if (trip && trip.startDate) {
      setActiveDate(new Date(trip.startDate));
    }
  }, [trip]);

  // Basic date logic for calendar generation
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
  // Generate grid cells
  const calendarCells = [];
  
  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarCells.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      dateString: new Date(year, month - 1, daysInPrevMonth - i).toISOString().split('T')[0]
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = new Date(year, month, i);
    // adjust timezone offset to avoid previous day when splitting by T
    const localDate = new Date(dateStr.getTime() - (dateStr.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    
    calendarCells.push({
      day: i,
      isCurrentMonth: true,
      dateString: localDate,
      isToday: new Date().toDateString() === new Date(year, month, i).toDateString()
    });
  }
  
  // Next month days to complete rows (35 or 42 cells)
  const totalCells = Math.ceil(calendarCells.length / 7) * 7;
  const remainingCells = totalCells - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      day: i,
      isCurrentMonth: false,
      dateString: new Date(year, month + 1, i + 1).toISOString().split('T')[0] // fixed next month date logic offset
    });
  }

  // Check if a date string falls inside the active trip range
  const isDateInTrip = (dateStr) => {
    if (!trip || !trip.startDate || !trip.endDate || !dateStr) return false;
    const current = new Date(dateStr);
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    
    current.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    return current >= start && current <= end;
  };

  // Group activities by date
  const activitiesByDate = activities.reduce((acc, activity) => {
    if (!activity.date) return acc;
    
    const d = new Date(activity.date);
    const dateStr = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(activity);
    return acc;
  }, {});

  const getCategoryStyles = (category) => {
    const styles = {
      flight: 'bg-blue-500/15 text-blue-600 border-blue-500/20',
      accommodation: 'bg-purple-500/15 text-purple-600 border-purple-500/20',
      dining: 'bg-orange-500/15 text-orange-600 border-orange-500/20',
      activity: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/20',
      default: 'bg-primary/15 text-primary border-primary/20'
    };
    return styles[category?.toLowerCase()] || styles.default;
  };

  const handlePrevMonth = () => {
    setActiveDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() - 1);
      return copy;
    });
  };

  const handleNextMonth = () => {
    setActiveDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() + 1);
      return copy;
    });
  };

  const handleToday = () => {
    setActiveDate(new Date());
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 bg-background">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary shadow-sm border border-primary/20">
            <CalendarIcon size={24} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text tracking-tight">
              {monthNames[month]}
            </h2>
            <p className="text-sm font-medium text-text-secondary">{year}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 p-1 bg-secondary/50 rounded-xl border border-border">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-background text-text-secondary hover:text-text transition-colors shadow-sm cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleToday}
            className="px-4 py-2 text-sm font-semibold bg-background text-text rounded-lg hover:bg-background/80 transition-colors shadow-sm cursor-pointer"
          >
            Today
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-background text-text-secondary hover:text-text transition-colors shadow-sm cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-2xl border border-border overflow-hidden bg-background shadow-sm">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-border bg-secondary/30">
          {daysOfWeek.map((day, idx) => (
            <div 
              key={day} 
              className={`py-3 text-center text-xs font-bold text-text-secondary uppercase tracking-widest
                ${idx !== 0 ? 'border-l border-border' : ''}
              `}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Cells Grid - height reduced to 95px */}
        <div className="grid grid-cols-7 auto-rows-[95px]">
          {calendarCells.map((cell, idx) => {
            const dayActivities = activitiesByDate[cell.dateString] || [];
            const isTripDay = isDateInTrip(cell.dateString);
            
            return (
              <motion.div
                key={`${cell.dateString}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.005 }}
                className={`p-2 border-b border-border relative group transition-colors hover:bg-secondary/20
                  ${idx % 7 !== 0 ? 'border-l border-border' : ''} 
                  ${!cell.isCurrentMonth ? 'bg-secondary/10' : (isTripDay ? 'bg-primary/5' : 'bg-background')}
                `}
              >
                {/* Accent primary bar for trip days */}
                {isTripDay && cell.isCurrentMonth && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
                )}

                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full transition-colors
                    ${cell.isToday 
                      ? 'bg-primary text-background shadow-md' 
                      : cell.isCurrentMonth 
                        ? 'text-text group-hover:bg-secondary' 
                        : 'text-text-secondary/50 group-hover:bg-secondary/50'
                    }`}
                  >
                    {cell.day}
                  </span>
                  
                  {dayActivities.length > 0 && (
                    <span className="text-[9px] font-bold text-text-secondary bg-secondary px-1.5 py-0.5 rounded-md">
                      {dayActivities.length}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar h-[55px]">
                  {dayActivities.map((activity, i) => (
                    <div 
                      key={activity.id || i}
                      className={`text-[10px] leading-tight px-1.5 py-1 rounded-md truncate cursor-pointer transition-transform hover:scale-[1.02] border ${getCategoryStyles(activity.category)}`}
                      title={activity.title}
                    >
                      {activity.time && <span className="font-semibold opacity-80 mr-1">{activity.time}</span>}
                      <span className="font-medium">{activity.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
