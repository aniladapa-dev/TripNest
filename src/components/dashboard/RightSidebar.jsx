import { motion } from 'framer-motion';
import { CalendarDays, PlaneTakeoff, Quote, Sparkles } from 'lucide-react';

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block w-80 bg-white/50 backdrop-blur-md border-l border-border/50 h-[calc(100vh-80px)] sticky top-20 overflow-y-auto p-6 space-y-8 no-scrollbar">
      
      {/* Travel Countdown */}
      <div className="bg-gradient-to-br from-primary to-secondary-dark rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop')] opacity-20 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <PlaneTakeoff size={18} />
              Next Adventure
            </h3>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">Kyoto</span>
          </div>
          
          <div className="flex gap-4 items-end">
            <div>
              <p className="text-3xl font-heading font-bold">14</p>
              <p className="text-xs opacity-80 uppercase tracking-wider">Days</p>
            </div>
            <div>
              <p className="text-3xl font-heading font-bold">08</p>
              <p className="text-xs opacity-80 uppercase tracking-wider">Hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Calendar / Reminders */}
      <div>
        <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
          <CalendarDays size={18} className="text-primary" />
          Quick Reminders
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Book Shinkansen tickets', time: 'Tomorrow, 10:00 AM', color: 'bg-orange-500' },
            { title: 'Renew Passport', time: 'In 3 days', color: 'bg-red-500' },
            { title: 'Check hotel confirmation', time: 'Next week', color: 'bg-blue-500' }
          ].map((item, i) => (
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
