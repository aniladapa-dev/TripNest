import { motion } from 'framer-motion';
import { CloudRain, Sun, Wind, Droplets } from 'lucide-react';

export default function WeatherWidget({ weather }) {
  if (!weather) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-semibold text-white/90">{weather.location || 'Paris, France'}</h3>
            <p className="text-xs text-white/70 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <motion.div 
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Sun className="w-12 h-12 text-yellow-300 drop-shadow-md" />
          </motion.div>
        </div>

        <div className="flex items-end gap-2 mb-6">
          <span className="text-5xl font-heading font-bold">{weather.temp}°</span>
          <span className="text-xl text-white/80 mb-1">{weather.condition}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <Droplets size={16} className="text-blue-200" />
            <div className="text-xs">
              <p className="text-white/60">Humidity</p>
              <p className="font-semibold">{weather.humidity}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <Wind size={16} className="text-blue-200" />
            <div className="text-xs">
              <p className="text-white/60">Wind</p>
              <p className="font-semibold">{weather.wind}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <p className="text-sm italic flex gap-2">
            <span className="text-yellow-300">💡</span> 
            {weather.advice}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
