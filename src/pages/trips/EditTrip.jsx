import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

import { tripService } from '../../services/tripService';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [trip, setTrip] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await tripService.getTripById(id);
        setTrip(data);
        // Pre-fill form
        reset(data);
      } catch (error) {
        console.error(error);
        navigate('/dashboard/trips');
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id, navigate, reset]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      await tripService.updateTrip(id, data);
      navigate(`/dashboard/trips/${id}`);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <LoadingSpinner size="lg" className="text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link to={`/dashboard/trips/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Back to Trip Details
        </Link>
        
        <AnimatePresence>
          {isDirty && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-sm font-medium border border-amber-200"
            >
              <AlertCircle size={16} /> Unsaved changes
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-border p-6 sm:p-10">
        <h1 className="text-3xl font-heading font-bold text-text mb-8">Edit Trip Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Section 1: Basics */}
          <section>
            <h3 className="text-lg font-bold text-text mb-4 pb-2 border-b border-border/50">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Trip Name"
                error={errors.name?.message}
                {...register('name', { required: 'Required' })}
              />
              <Input
                label="Destination"
                error={errors.destination?.message}
                {...register('destination', { required: 'Required' })}
              />
              <Input
                label="Country"
                error={errors.country?.message}
                {...register('country', { required: 'Required' })}
              />
              <Input
                label="Cover Image URL"
                {...register('image')}
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-text-secondary mb-2">Description</label>
              <textarea
                className="w-full p-4 bg-gray-50 border border-border rounded-xl text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px]"
                {...register('description')}
              />
            </div>
          </section>

          {/* Section 2: Details */}
          <section>
            <h3 className="text-lg font-bold text-text mb-4 pb-2 border-b border-border/50">Travel Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Start Date"
                type="date"
                error={errors.startDate?.message}
                {...register('startDate', { required: 'Required' })}
              />
              <Input
                label="End Date"
                type="date"
                error={errors.endDate?.message}
                {...register('endDate', { required: 'Required' })}
              />
              <Input
                label="Travelers"
                type="number"
                min="1"
                error={errors.travelers?.message}
                {...register('travelers', { required: 'Required' })}
              />
              <Input
                label="Budget (INR)"
                type="number"
                min="0"
                error={errors.budget?.message}
                {...register('budget', { required: 'Required' })}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-secondary mb-2">Status</label>
                <select
                  className="w-full p-4 bg-gray-50 border border-border rounded-xl text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  {...register('status')}
                >
                  <option value="Planning">Planning</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-6 border-t border-border">
            <Button 
              type="submit" 
              variant="primary" 
              glow
              disabled={isSaving || !isDirty}
              className="flex items-center gap-2 px-8"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
