import { motion } from 'framer-motion';
import { Target, Heart, Shield, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To simplify travel planning and empower everyone to explore the world with confidence and joy.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'We believe travel is better together. We build tools that foster connection and shared experiences.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Your data and travel plans are secure with us. We prioritize your privacy above all else.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We constantly push the boundaries of technology to bring you the smartest travel tools.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <SectionHeading
        title="About TripNest"
        subtitle="We're a team of passionate travelers and technologists on a mission to revolutionize how you experience the world."
      />

      <div className="max-w-7xl mx-auto px-6 mt-16 lg:grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal direction="left">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform -rotate-3 scale-105" />
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
              alt="Our Team"
              className="relative rounded-3xl object-cover h-[400px] w-full shadow-xl"
            />
          </div>
        </ScrollReveal>

        <div className="mt-12 lg:mt-0">
          <ScrollReveal direction="right">
            <h3 className="font-heading font-semibold text-3xl mb-6">
              Born from wanderlust, built for the modern traveler.
            </h3>
            <p className="text-text-secondary mb-6 text-lg">
              TripNest started in 2024 when our founders realized that planning a group trip was often more stressful than the vacation itself. We set out to create a single, elegant platform that handles everything from brainstorming destinations to splitting the final dinner bill.
            </p>
            <p className="text-text-secondary text-lg">
              Today, we help thousands of travelers plan smarter, save money, and focus on what truly matters: making unforgettable memories.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6 mt-24">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <ScrollReveal key={value.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/50 backdrop-blur-sm rounded-[20px] p-6 border border-white transition-shadow hover:shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.gradient} text-white flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {value.description}
                </p>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
