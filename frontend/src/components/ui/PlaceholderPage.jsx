import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

const localImages = [
  '/images/destinations/tokyo_destination_1783347878638.jpg',
  '/images/destinations/bali_destination_1783347854372.jpg',
  '/images/destinations/switzerland_destination_1783347889687.jpg',
  '/images/destinations/dubai_destination_1783347868029.jpg',
  '/images/destinations/paris_destination_1783347842867.jpg',
  '/images/destinations/santorini_destination_1783347901421.jpg'
];

export default function PlaceholderPage({ 
  title, 
  description, 
  icon: Icon,
  actionLabel = "Explore Dashboard" 
}) {
  const safeImage = localImages[title.length % localImages.length];

  return (
    <div className="space-y-6 pb-8 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-heading font-bold text-text">{title}</h1>
            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full border border-accent/20 flex items-center gap-1">
              <Sparkles size={12} /> Coming Soon
            </span>
          </div>
          <p className="text-text-secondary mt-2 max-w-2xl">{description}</p>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[24px] border border-border shadow-sm overflow-hidden"
      >
        <div className="grid lg:grid-cols-2">
          {/* Left: Illustration */}
          <div className="relative h-64 lg:h-auto bg-gray-100 overflow-hidden">
            <img 
              src={safeImage} 
              alt={title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4">
                <Icon size={24} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">We're building something special</h3>
              <p className="text-white/80 text-sm max-w-sm">
                Our engineers are hard at work bringing the {title} module to life. 
                Stay tuned for an incredible experience.
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="p-8 lg:p-10 flex flex-col justify-center bg-background/50">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon size={16} className="text-primary" />
              </span>
              What to expect
            </h4>
            
            <ul className="space-y-4 mb-8">
              {[
                'Premium user experience and seamless interactions',
                'Advanced features tailored for your travel needs',
                'Real-time updates and smart AI suggestions',
                'Beautiful visualizations and insights'
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto border-t border-border/60 pt-6">
              <p className="text-sm font-medium text-text-muted mb-4 uppercase tracking-wider">Quick Links</p>
              <div className="flex gap-4">
                <Link to="/dashboard" className="flex-1">
                  <Button variant="primary" glow className="w-full justify-between">
                    {actionLabel} <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/dashboard/trips" className="flex-1">
                  <Button variant="outline" className="w-full">
                    My Trips
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
