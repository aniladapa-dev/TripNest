import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapPin, Calendar as CalendarIcon, Users, Wallet, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

import WizardStepper from '../../components/trips/WizardStepper';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { tripService } from '../../services/tripService';
import { formatINR } from '../../utils/currency';

const STEPS = [
  { id: 'basics', label: 'Basic Info', icon: MapPin },
  { id: 'dates', label: 'Dates & Type', icon: CalendarIcon },
  { id: 'travelers', label: 'Travelers', icon: Users },
  { id: 'budget', label: 'Budget', icon: Wallet },
  { id: 'confirm', label: 'Confirmation', icon: CheckCircle2 }
];

export default function CreateTrip() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      travelType: 'Leisure'
    }
  });

  const watchAllFields = watch();

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (currentStep === 0) fieldsToValidate = ['name', 'destination', 'country'];
    if (currentStep === 1) fieldsToValidate = ['startDate', 'endDate'];
    if (currentStep === 2) fieldsToValidate = ['travelers'];
    if (currentStep === 3) fieldsToValidate = ['budget'];

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data) => {
    if (currentStep !== STEPS.length - 1) {
      handleNext();
      return;
    }
    
    setIsSubmitting(true);
    try {
      await tripService.createTrip(data);
      window.dispatchEvent(new Event('tripUpdated'));
      // Wait a moment for success animation
      setTimeout(() => navigate('/dashboard/trips'), 2000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  // Form Step Components
  const StepBasics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-text mb-6">Where are you going?</h2>
      <Input
        label="Trip Name"
        placeholder="e.g. Summer in Paris"
        error={errors.name?.message}
        {...register('name', { required: 'Trip name is required' })}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Destination City/Region"
          placeholder="e.g. Paris"
          error={errors.destination?.message}
          {...register('destination', { required: 'Destination is required' })}
        />
        <Input
          label="Country"
          placeholder="e.g. France"
          error={errors.country?.message}
          {...register('country', { required: 'Country is required' })}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-text-secondary mb-2">Cover Image URL (Optional)</label>
        <input
          className="w-full p-4 bg-gray-50 border border-border rounded-xl text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="https://images.unsplash.com/..."
          {...register('image')}
        />
      </div>
    </div>
  );

  const StepDates = () => {
    const startDateValue = watch('startDate');
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-text mb-6">When is the trip?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Start Date"
            type="date"
            error={errors.startDate?.message}
            {...register('startDate', { required: 'Start date is required' })}
          />
          <Input
            label="End Date"
            type="date"
            min={startDateValue}
            error={errors.endDate?.message}
            {...register('endDate', { 
              required: 'End date is required',
              validate: value => {
                if (!startDateValue) return true;
                if (new Date(value) < new Date(startDateValue)) {
                  return 'End date cannot be before start date';
                }
                return true;
              }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-secondary mb-4">Travel Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Leisure', 'Business', 'Adventure', 'Family'].map(type => (
              <label key={type} className="cursor-pointer">
                <input type="radio" value={type} {...register('travelType')} className="peer sr-only" />
                <div className="p-4 text-center rounded-xl border border-border bg-white peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all font-medium text-text-secondary hover:bg-gray-50 shadow-sm">
                  {type}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const StepTravelers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-text mb-6">Who is going?</h2>
      <Input
        label="Number of Travelers"
        type="number"
        min="1"
        error={errors.travelers?.message}
        {...register('travelers', { 
          required: 'Number of travelers is required',
          min: { value: 1, message: 'Must be at least 1' }
        })}
      />
    </div>
  );

  const StepBudget = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-text mb-6">What's the budget?</h2>
      <Input
        label="Total Estimated Budget (INR)"
        type="number"
        min="0"
        placeholder="e.g. 150000"
        error={errors.budget?.message}
        {...register('budget', { 
          required: 'Budget is required',
          min: { value: 0, message: 'Cannot be negative' }
        })}
      />
    </div>
  );

  const StepConfirm = () => (
    <div className="text-center py-8">
      {isSubmitting ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-text mb-2">Trip Created!</h2>
          <p className="text-text-secondary">Packing your bags and redirecting to the dashboard...</p>
        </motion.div>
      ) : (
        <div className="text-left space-y-6 bg-gray-50 p-6 rounded-2xl border border-border">
          <h2 className="text-2xl font-heading font-bold text-text mb-4 text-center">Ready to explore?</h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-muted font-medium mb-1">Destination</p>
              <p className="font-semibold text-text">{watchAllFields.destination}, {watchAllFields.country}</p>
            </div>
            <div>
              <p className="text-text-muted font-medium mb-1">Dates</p>
              <p className="font-semibold text-text">{watchAllFields.startDate} to {watchAllFields.endDate}</p>
            </div>
            <div>
              <p className="text-text-muted font-medium mb-1">Travelers</p>
              <p className="font-semibold text-text">{watchAllFields.travelers} ({watchAllFields.travelType})</p>
            </div>
            <div>
              <p className="text-text-muted font-medium mb-1">Budget</p>
              <p className="font-semibold text-text">{formatINR(watchAllFields.budget)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return StepBasics();
      case 1: return StepDates();
      case 2: return StepTravelers();
      case 3: return StepBudget();
      case 4: return StepConfirm();
      default: return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text">Plan a New Trip</h1>
        <p className="text-text-secondary">Let's get the basics down first.</p>
      </div>

      <div className="bg-white rounded-[24px] shadow-xl shadow-primary/5 border border-border p-6 sm:p-10">
        <WizardStepper steps={STEPS} currentStep={currentStep} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {!isSubmitting && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}
              >
                <ArrowLeft size={18} className="mr-2" /> Back
              </Button>
              
              {currentStep < STEPS.length - 1 ? (
                <Button type="button" variant="primary" glow onClick={handleNext}>
                  Next Step <ArrowRight size={18} className="ml-2" />
                </Button>
              ) : (
                <Button type="submit" variant="primary" glow className="bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600">
                  <CheckCircle2 size={18} className="mr-2" /> Create Trip
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
