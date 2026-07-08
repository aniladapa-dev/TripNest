import { useEffect, useState, memo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Custom hook for animated counter
const useCounter = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return count;
};

const StatCard = memo(({ title, value, prefix = '', suffix = '', icon: Icon, trend, trendValue, colorClass }) => {
  const count = useCounter(value, 1.5);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden rounded-[20px] bg-white border border-border/50 p-6 shadow-sm hover:shadow-lg transition-all group"
    >
      {/* Background Glow */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-2xl ${colorClass}`}></div>

      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} bg-opacity-10 text-current`}>
          <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trendValue}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-text-secondary text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-heading font-bold text-text">
          {prefix}{typeof value === 'number' ? count.toLocaleString(prefix === '₹' ? 'en-IN' : undefined) : value}{suffix}
        </p>
      </div>
      
      {/* Mini Trend Graph line (decorative) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
    </motion.div>
  );
});

export default StatCard;
