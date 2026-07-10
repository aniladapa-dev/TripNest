import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import Input from "../ui/Input";
import Button from "../ui/Button";

const CATEGORIES = ['Flight', 'Hotel', 'Dining', 'Sightseeing', 'Transport', 'Custom'];
const PRIORITIES = ['Low', 'Medium', 'High'];

const ActivityModal = ({ isOpen, onClose, onSave, activity, trip }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      category: 'Sightseeing',
      date: '',
      time: '',
      duration: '',
      location: '',
      cost: '',
      priority: 'Medium',
      notes: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (activity) {
        reset(activity);
      } else {
        reset({
          title: '',
          category: 'Sightseeing',
          date: '',
          time: '',
          duration: '',
          location: '',
          cost: '',
          priority: 'Medium',
          notes: ''
        });
      }
    }
  }, [isOpen, activity, reset]);

  const onSubmit = (data) => {
    onSave(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-2xl overflow-hidden bg-slate-900 border border-white/10 rounded-3xl shadow-2xl shadow-indigo-500/20 pointer-events-auto flex flex-col max-h-[90vh] sm:max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                  {activity ? 'Edit Activity' : 'Add New Activity'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-white/50 transition-colors rounded-full hover:bg-white/10 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="activity-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Activity Title</label>
                    <Input 
                      {...register('title', { required: 'Title is required' })}
                      placeholder="e.g. Eiffel Tower Visit"
                      className="w-full bg-white/5 border-white/10 focus:border-indigo-500 text-white placeholder-white/30"
                    />
                    {errors.title && <span className="text-xs text-red-400">{errors.title.message}</span>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Category</label>
                      <select 
                        {...register('category')}
                        className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Priority</label>
                      <select 
                        {...register('priority')}
                        className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                      >
                        {PRIORITIES.map(p => <option key={p} value={p} className="bg-slate-800">{p}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Date
                      </label>
                      <Input 
                        type="date" 
                        min={trip?.startDate}
                        max={trip?.endDate}
                        error={errors.date?.message}
                        {...register('date', { 
                          required: 'Date is required',
                          validate: value => {
                            if (!trip) return true;
                            const d = new Date(value);
                            const start = new Date(trip.startDate);
                            const end = new Date(trip.endDate);
                            if (d < start || d > end) {
                              return `Date must be between ${trip.startDate} and ${trip.endDate}`;
                            }
                            return true;
                          }
                        })} 
                        className="w-full bg-white/5 border-white/10 focus:border-indigo-500 text-white" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Time
                      </label>
                      <div className="flex gap-2">
                        <Input 
                          type="time" 
                          {...register('time')} 
                          className="w-full bg-white/5 border-white/10 focus:border-indigo-500 text-white" 
                        />
                        <Input 
                          placeholder="Duration (e.g. 2h)" 
                          {...register('duration')} 
                          className="w-full bg-white/5 border-white/10 focus:border-indigo-500 text-white placeholder-white/30" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Location
                      </label>
                      <Input 
                        {...register('location')} 
                        placeholder="Address or Place name" 
                        className="w-full bg-white/5 border-white/10 focus:border-indigo-500 text-white placeholder-white/30" 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" /> Cost (Optional)
                      </label>
                      <Input 
                        type="number" 
                        {...register('cost')} 
                        placeholder="0.00" 
                        className="w-full bg-white/5 border-white/10 focus:border-indigo-500 text-white placeholder-white/30" 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-white/70">Notes</label>
                      <textarea 
                        {...register('notes')}
                        rows={3}
                        placeholder="Any additional details..."
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-white/10 bg-white/5 gap-3">
                <Button 
                  onClick={onClose} 
                  variant="ghost" 
                  className="px-6 py-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  form="activity-form"
                  className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all font-medium border-0"
                >
                  Save Activity
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ActivityModal;
