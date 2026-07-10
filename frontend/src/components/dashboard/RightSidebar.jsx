import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, PlaneTakeoff, Quote, Sparkles } from 'lucide-react';
import { tripService } from '../../services/tripService';

export default function RightSidebar() {
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingTrip = async () => {
    try {
      const trips = await tripService.getTrips();
      // Sort trips chronologically by startDate
      trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      const upcoming = trips.find(t => 
        t.status === 'Upcoming' || 
        t.status === 'Planning'
      );
      setUpcomingTrip(upcoming || null);
    } catch (err) {
      console.warn("Failed to fetch upcoming trip for RightSidebar", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingTrip();
    
    // Listen for custom trip updates (e.g. when creating a trip)
    window.addEventListener('tripUpdated', fetchUpcomingTrip);
    return () => window.removeEventListener('tripUpdated', fetchUpcomingTrip);
  }, []);

  let daysAway = null;
  if (upcomingTrip && upcomingTrip.startDate) {
    const start = new Date(upcomingTrip.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = start - today;
    daysAway = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Determine dynamic reminders based on active upcoming trip
  const getReminders = () => {
    if (upcomingTrip) {
      const dest = upcomingTrip.destination.split(',')[0];
      return [
        { title: `Prepare packing list for ${dest}`, time: 'In progress', color: 'bg-orange-500' },
        { title: `Double-check ${dest} hotel booking`, time: 'Next week', color: 'bg-blue-500' },
        { title: 'Check passport validity', time: 'In 3 days', color: 'bg-red-500' }
      ];
    }
    return [
      { title: 'Complete your profile preferences', time: 'Get started', color: 'bg-orange-500' },
      { title: 'Explore popular destinations', time: 'Trending', color: 'bg-blue-500' },
      { title: 'Plan your next travel itinerary', time: 'Let\'s go', color: 'bg-emerald-500' }
    ];
  };

  const reminders = getReminders();

  return (
    <aside className="hidden xl:block w-80 bg-white/50 backdrop-blur-md border-l border-border/50 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto p-6 space-y-8 no-scrollbar">
      
      {/* Travel Countdown */}
      {upcomingTrip && (
        <div className="bg-gradient-to-br from-primary to-secondary-dark rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop')] opacity-20 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <PlaneTakeoff size={18} />
                Next Adventure
              </h3>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-md font-medium truncate max-w-[120px]">
                {upcomingTrip.destination.split(',')[0]}
              </span>
            </div>
            
            <div className="flex gap-4 items-end">
              <div>
                <p className="text-3xl font-heading font-bold">{daysAway !== null && daysAway >= 0 ? daysAway : '0'}</p>
                <p className="text-xs opacity-80 uppercase tracking-wider">Days</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold">00</p>
                <p className="text-xs opacity-80 uppercase tracking-wider">Hours</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini Calendar / Reminders */}
      <div>
        <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
          <CalendarDays size={18} className="text-primary" />
          Quick Reminders
        </h3>
        <div className="space-y-3">
          {reminders.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 4 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-white border border-border shadow-sm cursor-pointer"
            >
              <div className={`w-2 h-2 mt-1.5 rounded-full ${item.color} shrink-0`}></div>
              <div>
                <p className="text-sm font-medium text-text leading-tight">{item.title}</p>
                <p className="text-xs text-text-secondary mt-1">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Travel Tip */}
      <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
        <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
          <Sparkles size={18} />
          Travel Tip
        </h3>
        <p className="text-sm text-text-secondary italic">
          "Always pack a universal adapter and a small power bank in your carry-on luggage for long flights."
        </p>
      </div>

      {/* Quote */}
      <div className="text-center px-4 pt-4">
        <Quote className="w-8 h-8 mx-auto text-border mb-2 rotate-180" />
        <p className="text-sm font-medium text-text-secondary">
          "To travel is to discover that everyone is wrong about other countries."
        </p>
        <p className="text-xs text-text-muted mt-2">— Aldous Huxley</p>
      </div>

    </aside>
  );
}
