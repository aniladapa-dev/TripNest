import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function DestinationRecommendations() {
  const recommendations = [
    { name: 'Swiss Alps', image: '/images/destinations/switzerland_destination_1783347889687.jpg', price: '₹2,20,000', rating: '4.9' },
    { name: 'Paris', image: '/images/destinations/paris_destination_1783347842867.jpg', price: '₹1,50,000', rating: '5.0' },
  ];

  return (
    <div className="bg-white rounded-[20px] border border-border/50 p-6 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-lg text-text">Recommended For You</h3>
      </div>

      <div className="space-y-4 flex-1">
        {recommendations.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-text group-hover:text-primary transition-colors">{item.name}</h4>
              <div className="flex items-center gap-2 text-xs mt-1 text-text-secondary">
                <span className="flex items-center gap-1 text-amber-500 font-semibold"><Star size={12} className="fill-amber-500" /> {item.rating}</span>
                <span>•</span>
                <span>Est. {item.price}</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
              <ArrowRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-6 text-sm py-2">
        Explore More
      </Button>
    </div>
  );
}
