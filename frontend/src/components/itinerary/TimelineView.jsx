import React from 'react';
import { motion } from 'framer-motion';
import ActivityCard from './ActivityCard';
import EmptyState from '../ui/EmptyState';

const TimelineView = ({ activities = [], onEditActivity, onDeleteActivity }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="py-12">
        <EmptyState 
          title="No activities yet" 
          description="Your itinerary is empty. Start adding activities to plan your perfect trip!" 
        />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 350, damping: 25 } 
    }
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto w-full">
      <motion.div 
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Timeline connector line */}
        <div className="absolute left-[48px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-border via-border to-transparent -translate-x-1/2 z-0" />

        <div className="flex flex-col gap-8 relative z-10">
          {activities.map((activity, index) => (
            <motion.div key={activity.id || index} variants={itemVariants}>
              <ActivityCard 
                activity={activity} 
                onEdit={onEditActivity} 
                onDelete={onDeleteActivity} 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineView;
