import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const ReminderItem = ({ reminder, onToggle }) => {
  const isOverdue = reminder.status === 'overdue';
  const isCompleted = reminder.status === 'completed';
  
  const statusColors = {
    overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
    upcoming: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-white/40'
  };

  const StatusIcon = {
    overdue: AlertCircle,
    upcoming: Clock,
    completed: CheckCircle2
  }[reminder.status] || Clock;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${statusColors[reminder.status] || statusColors.upcoming} ${isCompleted ? 'opacity-50 hover:opacity-100' : 'hover:bg-white/5'}`}
    >
      <button 
        onClick={() => onToggle && onToggle(reminder.id)}
        className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
          isCompleted 
            ? 'bg-emerald-500 border-emerald-500 text-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
            : 'border-current hover:bg-current/20'
        }`}
      >
        {isCompleted && <Check className="w-3.5 h-3.5" />}
      </button>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-medium truncate transition-colors ${isCompleted ? 'line-through text-white/50' : 'text-white'}`}>
          {reminder.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs opacity-80">
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{reminder.dueTime}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ReminderCenter = ({ reminders = [], onToggleReminder }) => {
  const overdue = reminders.filter(r => r.status === 'overdue');
  const upcoming = reminders.filter(r => r.status === 'upcoming');
  const completed = reminders.filter(r => r.status === 'completed');

  return (
    <div className="flex flex-col w-full max-w-sm overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400">
            <Bell className="w-5 h-5" />
            {overdue.length > 0 && (
              <span className="absolute top-0 right-0 flex w-3 h-3">
                <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">Reminder Center</h3>
            <p className="text-xs text-white/50">{reminders.length} total tasks</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6 overflow-y-auto max-h-[600px] custom-scrollbar">
        {reminders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center opacity-80"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="font-medium text-white text-lg">All caught up!</p>
            <p className="text-sm text-white/50 mt-1">No pending reminders for your trip.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {overdue.length > 0 && (
                <motion.div layout className="space-y-3">
                  <h4 className="text-xs font-semibold tracking-wider text-red-400 uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">Overdue</h4>
                  {overdue.map(reminder => (
                    <ReminderItem key={reminder.id} reminder={reminder} onToggle={onToggleReminder} />
                  ))}
                </motion.div>
              )}

              {upcoming.length > 0 && (
                <motion.div layout className="space-y-3">
                  <h4 className="text-xs font-semibold tracking-wider text-blue-400 uppercase drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">Upcoming</h4>
                  {upcoming.map(reminder => (
                    <ReminderItem key={reminder.id} reminder={reminder} onToggle={onToggleReminder} />
                  ))}
                </motion.div>
              )}

              {completed.length > 0 && (
                <motion.div layout className="space-y-3 mt-8">
                  <h4 className="text-xs font-semibold tracking-wider text-white/40 uppercase">Completed</h4>
                  {completed.map(reminder => (
                    <ReminderItem key={reminder.id} reminder={reminder} onToggle={onToggleReminder} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderCenter;
