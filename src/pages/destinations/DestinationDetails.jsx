import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Star, CloudSun, Calendar, MessageSquare, Clock, ShieldCheck, Map } from 'lucide-react';

import { destinationService } from '../../services/destinationService';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Placeholder components - wait for subagents to finish or use them if ready
import AttractionCard from '../../components/destinations/AttractionCard';
import HotelCard from '../../components/destinations/HotelCard';
import RestaurantCard from '../../components/destinations/RestaurantCard';
import TravelGuideWidget from '../../components/destinations/TravelGuideWidget';

export default function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [destData, attData, hotelData, restData] = await Promise.all([
          destinationService.getDestinationDetails(id),
          destinationService.getAttractions(id),
          destinationService.getHotels(id),
          destinationService.getRestaurants(id)
        ]);
        
        setDestination(destData);
        setAttractions(attData);
        setHotels(hotelData);
        setRestaurants(restData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner size="lg" className="text-primary" />
      </div>
    );
  }

  if (!destination) return null;

  return (
    <div className="pb-12 space-y-8">
      {/* ── Back Navigation ── */}
      <div>
        <Link to="/dashboard/destinations" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Back to Explorer
        </Link>
      </div>

      {/* ── Immersive Hero ── */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[32px] overflow-hidden h-[400px] shadow-sm group"
      >
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-4 border border-white/20 shadow-md">
              <MapPin size={14} /> {destination.country}
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white drop-shadow-lg mb-2">
              {destination.name}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className="flex items-center gap-1"><Star size={16} className="text-accent fill-accent"/> {destination.rating} ({destination.reviews} reviews)</span>
              <span className="flex items-center gap-1"><CloudSun size={16}/> 24°C Sunny</span>
            </div>
          </div>
          
          <Button variant="primary" glow className="shadow-black/20 font-bold whitespace-nowrap">
            Plan a Trip Here
          </Button>
        </div>
      </motion.div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-border/50 pb-2">
        {['overview', 'attractions', 'hotels', 'restaurants'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm capitalize transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-text-secondary hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white p-8 rounded-[24px] border border-border/50 shadow-sm">
                  <h3 className="text-xl font-heading font-bold mb-4">About {destination.name}</h3>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    Experience the perfect blend of tradition and modernity in {destination.name}. 
                    Known for its breathtaking landscapes, rich cultural heritage, and incredible culinary scene, 
                    this destination offers an unforgettable journey for every type of traveler.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2"><Map size={20} className="text-primary"/> Interactive Map</h3>
                  <div className="bg-gray-100 rounded-[24px] border border-border h-[400px] overflow-hidden relative shadow-inner">
                     <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                     <div className="absolute inset-0 flex items-center justify-center">
                       <Button variant="primary" className="shadow-xl">Explore Map View</Button>
                     </div>
                  </div>
                </section>
              </div>
              
              <div className="space-y-6">
                <TravelGuideWidget guide={{
                  culture: 'Respectful and polite society. Bowing is common.',
                  safety: 'Very high safety index. Safe to walk at night.',
                  packing: 'Comfortable walking shoes, seasonal layers, power adapter.'
                }} />
              </div>
            </div>
          )}

          {activeTab === 'attractions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attractions.map(att => <AttractionCard key={att.id} attraction={att} />)}
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
          )}

          {activeTab === 'restaurants' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map(rest => <RestaurantCard key={rest.id} restaurant={rest} />)}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
