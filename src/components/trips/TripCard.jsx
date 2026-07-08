import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, MoreVertical, Edit, Copy, Share2, Trash2, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { formatINR } from '../../utils/currency';

const TripCard = memo(({ trip, variant = 'manage', viewMode = 'grid', onDeleteRequest }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'planning': return 'bg-orange-100 text-orange-600';
      case 'upcoming': 
      case 'booked': return 'bg-blue-100 text-blue-600';
      case 'completed': return 'bg-emerald-100 text-emerald-600';
      case 'archived': return 'bg-gray-100 text-gray-600';
      case 'dreaming': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const isList = viewMode === 'list' && variant === 'manage';
  const isDashboard = variant === 'dashboard';

  // Normalize data between dashboard mock and trips mock
  const tripName = trip.name || trip.destination;
  const tripLocation = trip.country ? `${trip.destination}, ${trip.country}` : trip.destination;
  const rawBudget = typeof trip.budget === 'string' ? parseFloat(trip.budget.replace(/[^0-9.-]+/g,"")) : trip.budget;
  const rawExpenses = trip.expenses || 0;
  const progressPercent = trip.progress !== undefined ? trip.progress : (Math.min((rawExpenses / rawBudget) * 100, 100) || 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-[20px] border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all overflow-hidden flex group relative ${isList ? 'flex-col md:flex-row' : 'flex-col'}`}
    >
      {/* ── Image Header ── */}
      <div className={`relative overflow-hidden shrink-0 ${isList ? 'h-48 md:h-full md:w-[240px]' : (isDashboard ? 'h-40 w-full' : 'h-48 w-full')}`}>
        <img 
          src={trip.image} 
          alt={trip.destination} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm ${getStatusColor(trip.status)}`}>
            {trip.status}
          </span>
        </div>

        {/* Quick Action Menu Trigger (Only for Manage variant) */}
        {!isDashboard && (
          <div className="absolute top-4 right-4" ref={menuRef}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-dark transition-colors border border-white/20"
            >
              <MoreVertical size={16} />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, transformOrigin: 'top right' }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-20 py-1"
              >
                <Link to={`/dashboard/trips/${trip.id}/edit`} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-gray-50 transition-colors">
                  <Edit size={14} className="text-text-secondary" /> Edit Trip
                </Link>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-gray-50 transition-colors">
                  <Copy size={14} className="text-text-secondary" /> Duplicate
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-gray-50 transition-colors">
                  <Share2 size={14} className="text-text-secondary" /> Share
                </button>
                <div className="h-px bg-border my-1"></div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    if (onDeleteRequest) onDeleteRequest(trip);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Title Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className={`text-white font-heading font-bold truncate drop-shadow-md ${isDashboard ? 'text-xl' : 'text-2xl'}`}>
            {tripName}
          </h3>
          {!isDashboard && (
            <p className="text-white/90 text-sm flex items-center gap-1 font-medium mt-1 truncate">
              <MapPin size={14} /> {tripLocation}
            </p>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className={`p-5 flex-1 flex flex-col bg-white z-10 relative ${isList ? 'md:border-l md:border-border/50' : ''}`}>
        
        {isDashboard ? (
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
            <Calendar size={16} className="text-primary" />
            {trip.dates || trip.startDate}
          </div>
        ) : (
          <div className={`flex items-center justify-between text-sm text-text-secondary mb-4 pb-4 border-b border-border/60 ${isList ? 'md:flex-col md:items-start md:gap-3 md:pb-0 md:border-b-0' : ''}`}>
            <div className="flex items-center gap-2 font-medium">
              <Calendar size={16} className="text-primary" />
              {trip.duration} Days
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Users size={16} className="text-primary" />
              {trip.travelers} {trip.travelers === 1 ? 'Person' : 'People'}
            </div>
          </div>
        )}
        
        <div className={`flex ${isDashboard ? 'justify-between items-center mb-6' : 'flex-col mb-4'}`}>
          <span className="text-text-muted text-sm">Est. Budget</span>
          <span className={`font-semibold text-text ${!isDashboard ? 'font-heading text-lg mt-1' : ''}`}>
            {formatINR(rawBudget)}
          </span>
        </div>

        {/* Expense/Planning Progress */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs font-semibold mb-2">
            {isDashboard ? (
               <span className="text-text-secondary">Planning Progress</span>
            ) : (
               <span className="text-text-secondary">Expenses: {formatINR(rawExpenses)}</span>
            )}
            <span className="text-primary">{Math.round(progressPercent)}% {isDashboard ? '' : 'Used'}</span>
          </div>
          <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${isDashboard ? 'h-2 mb-5' : 'h-1.5 mb-6'}`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-full rounded-full relative ${progressPercent > 90 && !isDashboard ? 'bg-red-500' : 'bg-primary'}`}
            >
              {isDashboard && (
                <div className="absolute inset-0 bg-white/20 w-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {isDashboard ? (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/dashboard/trips/${trip.id}/edit`)}>
                Edit
              </Button>
              <Button variant="primary" size="sm" className="w-full" onClick={() => navigate(`/dashboard/trips/${trip.id}`)}>
                View Plan
              </Button>
            </div>
          ) : (
            <Link to={`/dashboard/trips/${trip.id}`}>
              <Button variant="primary" className="w-full group-hover:shadow-lg group-hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                View Dashboard <ArrowRight size={16} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default TripCard;
