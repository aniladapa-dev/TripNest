import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Map, Palmtree, Mountain, Tent, Building2, MapPin, Heart } from 'lucide-react';
import { destinationService } from '../../services/destinationService';
import DestinationCard from '../../components/destinations/DestinationCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SEO from '../../components/ui/SEO';

const CATEGORIES = [
  { name: 'Beaches', icon: Palmtree, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { name: 'Mountains', icon: Mountain, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Cities', icon: Building2, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { name: 'Historical', icon: MapPin, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { name: 'Camping', icon: Tent, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

export default function DestinationExplorer() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getTrendingDestinations();
        setDestinations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || dest.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-12">
      <SEO title="Explore Destinations" description="Discover beautiful destinations around the world." />
      {/* ── Hero Search Section ── */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[32px] overflow-hidden bg-dark text-white p-10 md:p-16 min-h-[400px] flex flex-col justify-center items-center text-center shadow-xl"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop')] opacity-30 mix-blend-overlay object-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl w-full">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Explore The World
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 drop-shadow-md">
            Where to next?
          </h1>
          
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search destinations, countries, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/90 backdrop-blur-xl border border-white/20 text-dark placeholder-gray-500 rounded-full py-4 pl-14 pr-6 outline-none focus:ring-4 focus:ring-primary/30 transition-all shadow-xl text-lg font-medium"
            />
          </div>
        </div>
      </motion.section>

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
            <Compass className="text-primary" /> Popular Categories
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveCategory('All')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all font-semibold ${
              activeCategory === 'All' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-white border border-border/50 text-text-secondary hover:bg-gray-50'
            }`}
          >
            <Map size={18} /> All Destinations
          </button>
          
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all font-semibold border ${
                activeCategory === cat.name ? 'bg-white shadow-md border-primary text-primary' : 'bg-white border-border/50 text-text-secondary hover:bg-gray-50'
              }`}
            >
              <cat.icon size={18} className={cat.color} /> {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── Destination Grid ── */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-heading font-bold mb-6">Trending Destinations</h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" className="text-primary" />
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-border/50">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-heading font-bold text-text mb-2">No destinations found</h3>
            <p className="text-text-secondary">Try adjusting your search criteria</p>
          </div>
        )}
      </section>
    </div>
  );
}
