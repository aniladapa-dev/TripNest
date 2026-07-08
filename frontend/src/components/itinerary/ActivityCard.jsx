import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Utensils, 
  Coffee, 
  Plane, 
  Bed, 
  CheckCircle, 
  Clock, 
  Wallet,
  MoreVertical,
  Edit2,
  Trash2
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

const categoryConfig = {
  Sightseeing: { icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  Dining: { icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  Breakfast: { icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-500/10' },
  Flight: { icon: Plane, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  Hotel: { icon: Bed, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  default: { icon: CheckCircle, color: 'text-[var(--primary)]', bg: 'bg-[var(--primary)]/10' }
};

const priorityConfig = {
  High: 'bg-red-500/10 text-red-600 border-red-500/20',
  Med: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  Low: 'bg-green-500/10 text-green-600 border-green-500/20',
};

const ActivityCard = ({ activity, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const catConfig = categoryConfig[activity?.category] || categoryConfig.default;
  const Icon = catConfig.icon;

  return (
    <div className="flex w-full gap-4 relative group">
      {/* Left side: Time & Icon node */}
      <div className="flex flex-col items-center w-24 shrink-0 gap-3 pt-4 z-10">
        <span className="text-sm font-bold text-[var(--text)] tracking-tight">
          {activity?.time || '00:00'}
        </span>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${catConfig.bg} ${catConfig.color} ring-[6px] ring-[var(--background)] backdrop-blur-md shadow-sm transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={24} />
        </div>
      </div>

      {/* Main Content Card */}
      <motion.div 
        whileHover={{ y: -4 }}
        className="glass-card flex-1 p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/10 relative"
      >
        <div className="flex justify-between items-start gap-4 pr-8">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[var(--text)]">{activity?.title || 'Untitled Activity'}</h3>
            
            {activity?.location && (
              <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] mt-1.5">
                <MapPin size={16} className="shrink-0" />
                <span className="truncate">{activity.location}</span>
              </div>
            )}
          </div>
          
          {/* Priority Badge */}
          {activity?.priority && (
            <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-semibold ${priorityConfig[activity.priority]}`}>
              {activity.priority}
            </span>
          )}
        </div>

        {activity?.description && (
          <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
            {activity.description}
          </p>
        )}

        {/* Footer Details */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-[var(--border)]/50">
          {activity?.duration && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium bg-[var(--background)]/50 px-2.5 py-1.5 rounded-lg">
              <Clock size={14} />
              <span>{activity.duration}</span>
            </div>
          )}
          {activity?.cost && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium bg-[var(--background)]/50 px-2.5 py-1.5 rounded-lg">
              <Wallet size={14} />
              <span>{formatINR(activity.cost)}</span>
            </div>
          )}
        </div>

        {/* Right Actions Dropdown */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg hover:bg-[var(--background)] text-[var(--text-secondary)] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 data-[active=true]:opacity-100"
            data-active={showMenu}
          >
            <MoreVertical size={20} />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-10 w-36 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden z-20"
              >
                <div className="p-1 flex flex-col gap-0.5">
                  <button 
                    onClick={() => { setShowMenu(false); onEdit?.(activity); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--text)] font-medium hover:bg-[var(--background)] rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button 
                    onClick={() => { setShowMenu(false); onDelete?.(activity); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 font-medium hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(ActivityCard);
