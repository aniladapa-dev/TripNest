import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function WizardStepper({ steps, currentStep }) {
  return (
    <div className="w-full py-6 mb-8">
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
        
        {/* Active Progress Line */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive || isCompleted ? '#2563EB' : '#FFFFFF',
                  borderColor: isActive || isCompleted ? '#2563EB' : '#E2E8F0',
                  color: isActive || isCompleted ? '#FFFFFF' : '#94A3B8',
                  scale: isActive ? 1.2 : 1
                }}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-300"
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}
              </motion.div>
              
              <span className={`absolute top-10 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-primary' : isCompleted ? 'text-text-secondary' : 'text-text-muted'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
