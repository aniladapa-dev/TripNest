import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarView({ activities = [], currentDate = new Date() }) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Basic date logic for calendar generation
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
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

  return (
    <div className="w-full mx-auto p-4 md:p-8 bg-background">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
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
          <button className="p-2 rounded-lg hover:bg-background text-text-secondary hover:text-text transition-colors shadow-sm">
            <ChevronLeft size={20} />
          </button>
          <button className="px-4 py-2 text-sm font-semibold bg-background text-text rounded-lg hover:bg-background/80 transition-colors shadow-sm">
            Today
          </button>
          <button className="p-2 rounded-lg hover:bg-background text-text-secondary hover:text-text transition-colors shadow-sm">
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
              className={`py-3.5 text-center text-xs font-bold text-text-secondary uppercase tracking-widest
                ${idx !== 0 ? 'border-l border-border' : ''}
              `}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Cells Grid */}
        <div className="grid grid-cols-7 auto-rows-[130px]">
          {calendarCells.map((cell, idx) => {
            const dayActivities = activitiesByDate[cell.dateString] || [];
            
            return (
              <motion.div
                key={`${cell.dateString}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.005 }}
                className={`p-2.5 border-b border-border relative group transition-colors hover:bg-secondary/20
                  ${idx % 7 !== 0 ? 'border-l border-border' : ''} 
                  ${!cell.isCurrentMonth ? 'bg-secondary/10' : 'bg-background'}
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full transition-colors
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
                    <span className="text-[10px] font-bold text-text-secondary bg-secondary px-1.5 py-0.5 rounded-md">
                      {dayActivities.length}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 overflow-y-auto no-scrollbar h-[80px]">
                  {dayActivities.map((activity, i) => (
                    <div 
                      key={activity.id || i}
                      className={`text-[11px] leading-tight px-2 py-1.5 rounded-md truncate cursor-pointer transition-transform hover:scale-[1.02] border ${getCategoryStyles(activity.category)}`}
                      title={activity.title}
                    >
                      {activity.time && <span className="font-semibold opacity-80 mr-1.5">{activity.time}</span>}
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
