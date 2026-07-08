import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, Plus } from 'lucide-react';
import { formatINR } from '../../utils/currency';

import { itineraryService } from '../../services/itineraryService';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function ActivityDetails() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await itineraryService.getActivityById(activityId);
        setActivity(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, [activityId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <LoadingSpinner size="lg" className="text-primary" />
      </div>
    );
  }

  if (!activity) return null;

  return (
    <div className="space-y-8 pb-8 max-w-5xl mx-auto">
      {/* ── Top Bar ── */}
      <div className="flex justify-between items-center">
        <Link to="/dashboard/itinerary" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Back to Itinerary
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Edit Activity</Button>
          <Button variant="primary" size="sm" className="bg-emerald-500 hover:bg-emerald-600 border-none text-white">Mark Complete</Button>
        </div>
      </div>

      {/* ── Hero ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-border flex flex-col md:flex-row relative"
      >
        <div className="w-full md:w-2/5 h-[300px] md:h-auto relative group">
          <img 
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop" 
            alt={activity.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider shadow-md">
              {activity.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white drop-shadow-md mb-2">{activity.title}</h1>
          </div>
        </div>

        <div className="p-8 w-full md:w-3/5 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50/50">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><Calendar size={14}/> Date</p>
              <p className="text-text font-semibold text-lg">{activity.date}</p>
            </div>
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><Clock size={14}/> Time</p>
              <p className="text-text font-semibold text-lg">{activity.time} ({activity.duration})</p>
            </div>
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><MapPin size={14}/> Location</p>
              <p className="text-text font-semibold text-lg truncate pr-4">{activity.location}</p>
            </div>
            <div>
              <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><DollarSign size={14}/> Est. Cost</p>
              <p className="text-text font-semibold text-lg">{formatINR(activity.cost)}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-text-secondary leading-relaxed">{activity.notes || "No additional description provided for this activity."}</p>
          </div>
        </div>
      </motion.div>

      {/* ── Details Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-[24px] border border-border h-[400px] overflow-hidden relative group shadow-sm">
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <MapPin size={48} className="mb-4 drop-shadow-lg text-primary animate-bounce" />
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-xl text-center">
              <p className="font-semibold text-lg mb-1">{activity.location}</p>
              <Button variant="primary" size="sm" className="mt-4 shadow-xl shadow-black/20 w-full">Open in Google Maps</Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[24px] border border-border shadow-sm p-6">
            <h3 className="font-heading font-bold text-lg text-text mb-4">Preparation Checklist</h3>
            <div className="space-y-3">
              {[
                'Download offline map of the area',
                'Confirm reservation 24h before',
                'Pack portable charger',
                'Check dress code requirements'
              ].map((item, i) => (
                <label key={i} className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-text-secondary group-hover:text-text transition-colors">{item}</span>
                </label>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full flex items-center justify-center gap-2 text-primary hover:bg-primary/5">
              <Plus size={16} /> Add Item
            </Button>
          </div>

          <div className="bg-white rounded-[24px] border border-border shadow-sm p-6">
            <h3 className="font-heading font-bold text-lg text-text mb-4">Attachments & Documents</h3>
            <div className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
              <p className="text-sm font-semibold text-text mb-1">Upload Tickets or Booking Conf.</p>
              <p className="text-xs text-text-muted">PDF, PNG, or JPG (max 5MB)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
