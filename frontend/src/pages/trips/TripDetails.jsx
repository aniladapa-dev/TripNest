import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, Download, Edit, Share2, Trash2, ArrowLeft } from 'lucide-react';

import { tripService } from '../../services/tripService';
import Button from '../../components/ui/Button';
import { formatINR } from '../../utils/currency';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import TripTimeline from '../../components/trips/TripTimeline';
import TripGallery from '../../components/trips/TripGallery';
import DeleteModal from '../../components/trips/DeleteModal';

// Mock timeline events for the details page
const mockEvents = [
  { type: 'planning', title: 'Trip Planning Started', location: 'Home', time: '10:00 AM', date: 'Sept 1, 2024', description: 'Created the initial itinerary and set the budget.' },
  { type: 'experience', title: 'Flights Booked', location: 'JAL Airlines', time: '2:30 PM', date: 'Sept 15, 2024' },
  { type: 'sightseeing', title: 'Visit Fushimi Inari Shrine', location: 'Kyoto, Japan', time: '09:00 AM', date: 'Oct 13, 2024', description: 'Hike through the thousands of vermilion torii gates.' },
  { type: 'dining', title: 'Dinner at Pontocho Alley', location: 'Kyoto, Japan', time: '07:30 PM', date: 'Oct 13, 2024', description: 'Traditional kaiseki dinner reservation.' }
];

const mockImages = [
  { url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop', caption: 'Kinkaku-ji' },
  { url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=600&auto=format&fit=crop', caption: 'Arashiyama Bamboo Grove' },
  { url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=600&auto=format&fit=crop', caption: 'Kyoto Streets' },
  { url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=600&auto=format&fit=crop', caption: 'Fushimi Inari' },
  { url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=600&auto=format&fit=crop', caption: 'Gion District' },
];

// Time formatting helper to convert "HH:MM:SS" or "HH:MM" to "hh:mm AM/PM"
const formatTime12h = (timeStr) => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] || '00';
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await tripService.getTripById(id);
        setTrip(data);

        // Fetch actual timeline activities from backend
        try {
          const timeline = await tripService.getTripTimeline(id);
          const flattened = (timeline.days || []).flatMap(day => {
            return (day.activities || []).map(act => {
              let location = '';
              let notes = act.description || '';
              if (act.description && act.description.includes(' | ')) {
                const parts = act.description.split(' | ');
                location = parts[0] || '';
                notes = parts.slice(1).join(' | ') || '';
              }
              return {
                title: act.title,
                type: act.type ? act.type.toLowerCase() : 'other',
                location: location || data.destination,
                time: formatTime12h(act.startTime),
                date: act.activityDate,
                description: notes
              };
            });
          });
          setEvents(flattened.length > 0 ? flattened : mockEvents);
        } catch (timelineErr) {
          console.warn("Failed to load timeline from backend, falling back to mock timeline", timelineErr);
          setEvents(mockEvents);
        }
      } catch (error) {
        console.error(error);
        // Navigate back if trip doesn't exist
        navigate('/dashboard/trips');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id, navigate]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await tripService.deleteTrip(trip.id);
      window.dispatchEvent(new Event('tripUpdated'));
      navigate('/dashboard/trips');
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center h-full min-h-[60vh]"
        >
          <LoadingSpinner size="lg" className="text-primary" />
        </motion.div>
      ) : !trip ? (
        <motion.div
          key="not-found"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="py-20 text-center"
        >
          <h2 className="text-2xl font-bold text-text mb-2">Trip Not Found</h2>
          <Link to="/dashboard/trips">
            <Button variant="primary">Back to Trips</Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 pb-8"
        >
          {/* ── Top Bar ── */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link to="/dashboard/trips" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              <ArrowLeft size={16} /> Back to My Trips
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                <Download size={14} /> Download PDF
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 size={14} /> Share
              </Button>
              <Link to={`/dashboard/trips/${trip.id}/edit`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit size={14} /> Edit
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => setDeleteModalOpen(true)} className="flex items-center gap-2 text-red-600 hover:bg-red-50 hover:border-red-200">
                <Trash2 size={14} />
              </Button>
            </div>
          </div>

          {/* ── Hero Banner ── */}
          <div className="relative rounded-[24px] overflow-hidden shadow-lg h-[300px] md:h-[400px] group">
            <img 
              src={trip.image || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop'} 
              alt={trip.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-5 md:p-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                    {trip.status}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 bg-primary rounded-full">
                    {trip.travelType || 'Leisure'}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-1 md:mb-2 drop-shadow-md truncate">{trip.name}</h1>
                <p className="text-base md:text-xl text-white/90 flex items-center gap-2 font-medium">
                  <MapPin size={18} /> {trip.destination}, {trip.country || 'Japan'}
                </p>
              </div>
              
              <div className="flex justify-between md:justify-start gap-4 md:gap-8 bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Dates</p>
                  <p className="text-white font-semibold flex items-center gap-2"><Calendar size={16}/> {trip.duration} Days</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Travelers</p>
                  <p className="text-white font-semibold flex items-center gap-2"><Users size={16}/> {trip.travelers}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Budget</p>
                  <p className="text-white font-semibold text-lg">{formatINR(trip.budget)}</p>
                </div>
              </div>
            </div>
          </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column (Span 2) */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-text mb-2">About this trip</h3>
            <p className="text-text-secondary leading-relaxed">{trip.description}</p>
          </div>

          <TripTimeline events={events} />
          <TripGallery images={mockImages} />
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-8">
          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-[20px] border border-border/50 h-[300px] overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <MapPin size={48} className="mb-2 drop-shadow-md text-primary" />
              <Button variant="primary" size="sm" className="shadow-xl shadow-black/20">Open Map View</Button>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm">
            <h3 className="font-heading font-bold text-lg text-text mb-4">Trip Organizer</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-white" />
              </div>
              <div>
                <p className="font-semibold text-text">{trip.organizer}</p>
                <p className="text-sm text-text-secondary">Pro Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal 
        isOpen={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        tripName={trip.name}
        isDeleting={isDeleting}
      />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
