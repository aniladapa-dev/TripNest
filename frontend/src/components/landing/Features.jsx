import { motion } from 'framer-motion';
import {
  Map,
  Wallet,
  Calendar,
  CloudSun,
  FileText,
  Receipt,
  UsersRound,
  BarChart3,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ScrollReveal from '../ui/ScrollReveal';

const features = [
  {
    icon: Map,
    title: 'Trip Planning',
    desc: 'Create detailed trip plans with smart suggestions and AI-powered recommendations.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Wallet,
    title: 'Budget Tracking',
    desc: 'Track expenses in real-time with smart categorization and spending insights.',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Calendar,
    title: 'Day-wise Itinerary',
    desc: 'Organize your trip day by day with drag-and-drop simplicity.',
    gradient: 'from-violet-500 to-violet-600',
  },
  {
    icon: CloudSun,
    title: 'Weather Updates',
    desc: 'Real-time weather forecasts for all your destinations.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: FileText,
    title: 'Travel Documents',
    desc: 'Store and organize all travel documents securely in one place.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: Receipt,
    title: 'Expense Tracking',
    desc: 'Split expenses with travel companions effortlessly.',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: UsersRound,
    title: 'Group Collaboration',
    desc: 'Plan together with friends and family in real-time.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Visualize your travel patterns and spending habits.',
    gradient: 'from-sky-500 to-blue-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24">
      <SectionHeading
        title="Everything You Need to Travel Smart"
        subtitle="Powerful tools designed to make your travel planning effortless and enjoyable."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6 mt-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-[20px] p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Top gradient bar */}
                <div
                  className={`h-1 absolute top-0 inset-x-0 bg-gradient-to-r ${feature.gradient}`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-lg">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary mt-2">
                  {feature.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
