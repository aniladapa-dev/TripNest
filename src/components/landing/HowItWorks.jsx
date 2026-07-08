import { motion } from 'framer-motion';
import { PlusCircle, UserPlus, ListChecks, Plane } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';

const steps = [
  {
    icon: PlusCircle,
    title: 'Create Trip',
    desc: 'Set your destination, dates, and preferences to get started.',
  },
  {
    icon: UserPlus,
    title: 'Invite Friends',
    desc: 'Add your travel companions to collaborate on the plan.',
  },
  {
    icon: ListChecks,
    title: 'Plan Itinerary',
    desc: 'Build your day-by-day schedule with smart suggestions.',
  },
  {
    icon: Plane,
    title: 'Travel!',
    desc: 'Set off on your adventure with everything organized.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <SectionHeading
        title="How It Works"
        subtitle="Start planning your dream trip in four simple steps."
      />

      {/* Desktop layout (lg+) */}
      <div className="hidden lg:flex justify-between items-start max-w-5xl mx-auto px-6 mt-16 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <ScrollReveal key={step.title} delay={index * 0.2}>
              <div className="flex-1 flex flex-col items-center text-center relative">
                {/* Circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/20 relative z-10">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.25 + 0.3, ease: 'easeOut' }}
                    className="absolute top-8 h-[2px] bg-gradient-to-r from-primary/30 to-secondary/30 left-[58%] right-[-42%] origin-left z-0"
                  />
                )}

                {/* Title */}
                <h3 className="font-heading font-semibold text-lg mt-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary mt-2 max-w-[180px]">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Mobile layout (<lg) */}
      <div className="lg:hidden max-w-md mx-auto px-6 mt-16 space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <ScrollReveal key={step.title} delay={index * 0.15}>
              <div className="flex items-start gap-4 relative">
                {/* Left border line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[28px] top-16 bottom-[-32px] w-[2px] bg-gradient-to-b from-primary/30 to-secondary/30" />
                )}

                {/* Circle */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 relative z-10">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text */}
                <div className="pt-2">
                  <h3 className="font-heading font-semibold text-lg">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
