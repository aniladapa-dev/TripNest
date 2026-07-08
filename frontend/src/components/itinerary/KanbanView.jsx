import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, DollarSign, Activity, CheckCircle, XCircle, MoreHorizontal, Plane, Utensils, Home } from 'lucide-react';

const STATUS_CONFIG = {
  'Planned': { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: MoreHorizontal },
  'In Progress': { color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: Activity },
  'Completed': { color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle },
  'Cancelled': { color: 'bg-red-500/10 text-red-500 border-red-500/20', icon: XCircle }
};

const CATEGORY_ICONS = {
  'flight': Plane,
  'accommodation': Home,
  'activity': Activity,
  'dining': Utensils,
  'default': MapPin
};

export default function KanbanView({ activities = [] }) {
  const statuses = ['Planned', 'In Progress', 'Completed', 'Cancelled'];

  const getActivitiesByStatus = (status) => {
    return activities.filter(activity => activity.status === status);
  };

  return (
    <div className="w-full h-full overflow-x-auto no-scrollbar bg-background">
      <div className="flex gap-6 min-w-max p-6">
        {statuses.map((status, index) => {
          const columnActivities = getActivitiesByStatus(status);
          const StatusIcon = STATUS_CONFIG[status]?.icon || MoreHorizontal;
          const statusStyle = STATUS_CONFIG[status]?.color || 'bg-secondary text-text';
          
          return (
            <motion.div 
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
              className="w-[320px] flex flex-col gap-4 shrink-0"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg border ${statusStyle}`}>
                    <StatusIcon size={16} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-semibold text-text">{status}</h3>
                </div>
                <span className="text-xs font-bold text-text-secondary bg-secondary px-2.5 py-1 rounded-full">
                  {columnActivities.length}
                </span>
              </div>
              
              {/* Cards Container */}
              <div className="flex flex-col gap-3 min-h-[150px]">
                {columnActivities.map((activity, i) => {
                  const Icon = CATEGORY_ICONS[activity.category?.toLowerCase()] || CATEGORY_ICONS.default;
                  
                  return (
                    <motion.div
                      key={activity.id || i}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="p-4 rounded-xl border border-border bg-background shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)] hover:border-primary/30 transition-all cursor-pointer flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <h4 className="font-medium text-text leading-tight line-clamp-2">
                          {activity.title}
                        </h4>
                        <div className="p-2 rounded-full bg-secondary text-text-secondary shrink-0">
                          <Icon size={14} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-text-secondary mt-1">
                        <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                          <Clock size={12} className="text-primary" />
                          <span className="font-medium">{activity.time || 'TBD'}</span>
                        </div>
                        {activity.cost && (
                          <div className="flex items-center gap-1 font-semibold text-text bg-secondary/50 px-2 py-1 rounded-md">
                            <DollarSign size={12} className="text-accent" />
                            <span>{activity.cost}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
                
                {columnActivities.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl bg-secondary/10"
                  >
                    <p className="text-text-secondary text-sm font-medium">Drop items here</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
