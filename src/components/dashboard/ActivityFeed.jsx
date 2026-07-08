import { motion } from 'framer-motion';
import { Plane, CreditCard, FileText, UserPlus, Bell } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import { memo } from 'react';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'Plane': return <Plane size={16} />;
    case 'CreditCard': return <CreditCard size={16} />;
    case 'FileText': return <FileText size={16} />;
    case 'UserPlus': return <UserPlus size={16} />;
    default: return <Bell size={16} />;
  }
};

const getColor = (type) => {
  switch (type) {
    case 'trip': return 'bg-blue-100 text-blue-600';
    case 'expense': return 'bg-orange-100 text-orange-600';
    case 'document': return 'bg-emerald-100 text-emerald-600';
    case 'social': return 'bg-purple-100 text-purple-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const ActivityFeed = memo(({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm h-full flex flex-col">
        <h3 className="font-heading font-bold text-lg text-text mb-4">Recent Activity</h3>
        <div className="flex-1">
          <EmptyState title="No activity yet" message="When you plan trips, add expenses, or invite friends, the activity will show up here." />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-lg text-text">Recent Activity</h3>
        <button className="text-sm font-semibold text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 group cursor-pointer"
          >
            <div className={`p-2.5 rounded-xl ${getColor(activity.type)} shrink-0 group-hover:scale-110 transition-transform`}>
              {getIcon(activity.icon)}
            </div>
            <div>
              <p className="text-sm font-medium text-text leading-snug group-hover:text-primary transition-colors">{activity.title}</p>
              <p className="text-xs text-text-muted mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default ActivityFeed;
