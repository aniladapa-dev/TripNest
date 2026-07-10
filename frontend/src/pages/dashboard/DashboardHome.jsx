import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Globe, Wallet, CheckCircle, Plus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { dashboardService } from '../../services/dashboardService';

import StatCard from '../../components/dashboard/StatCard';
import TripCard from '../../components/trips/TripCard';
import WeatherWidget from '../../components/dashboard/WeatherWidget';
import UpcomingItinerary from '../../components/dashboard/UpcomingItinerary';
import ExpenseOverview from '../../components/dashboard/ExpenseOverview';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import TravelCalendar from '../../components/dashboard/TravelCalendar';
import DestinationRecommendations from '../../components/dashboard/DestinationRecommendations';
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stats, trips, itinerary, activity, weather] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentTrips(),
          dashboardService.getUpcomingItinerary(),
          dashboardService.getActivityFeed(),
          dashboardService.getWeather(),
        ]);
        
        setData({ stats, trips, itinerary, activity, weather });
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setError("We couldn't load your dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getUpcomingTrip = () => {
    if (!data || !data.trips) return null;
    return data.trips.find(t => 
      t.status?.toLowerCase() === 'upcoming' || 
      t.status?.toLowerCase() === 'planning' || 
      t.status?.toLowerCase() === 'booked'
    );
  };

  const upcomingTrip = getUpcomingTrip();
  let daysAway = null;
  if (upcomingTrip) {
    const dateStr = upcomingTrip.dates ? upcomingTrip.dates.split(' - ')[0] : null;
    if (dateStr) {
      const startDate = new Date(dateStr);
      const today = new Date();
      today.setHours(0,0,0,0);
      const diffTime = startDate - today;
      daysAway = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DashboardSkeleton />
        </motion.div>
      ) : error ? (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[60vh] flex items-center justify-center"
        >
          <EmptyState 
            icon={LayoutDashboard}
            title="Failed to load dashboard"
            message={error}
            actionLabel="Retry"
            onAction={() => window.location.reload()}
          />
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 pb-8"
        >
          {/* ── Welcome Banner ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-primary to-secondary-dark rounded-[24px] p-8 sm:p-10 text-white overflow-hidden shadow-lg"
          >
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=800&auto=format&fit=crop')] opacity-20 mix-blend-overlay object-cover mask-image-gradient-l"></div>
            <div className="relative z-10 max-w-2xl">
              {upcomingTrip ? (
                <>
                  <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                    Your {upcomingTrip.destination.split(',')[0]} adventure is <span className="text-accent-light">{daysAway !== null && daysAway >= 0 ? `${daysAway} days` : 'soon'}</span> away!
                  </h1>
                  <p className="text-white/80 text-lg mb-8">
                    "The journey of a thousand miles begins with a single step." — Lao Tzu
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/dashboard/itinerary?tripId=${upcomingTrip.id}`)}
                      className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary backdrop-blur-md font-semibold"
                    >
                      View Itinerary
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate('/dashboard/trips/create')}
                      className="bg-accent hover:bg-accent-light text-white border-none font-semibold flex items-center gap-2"
                    >
                      <Plus size={18} /> New Trip
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                    Welcome to TripNest! Ready to plan your next adventure?
                  </h1>
                  <p className="text-white/80 text-lg mb-8">
                    Create day-wise travel itineraries, track your budgets, and keep your documents organized.
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      variant="primary" 
                      onClick={() => navigate('/dashboard/trips/create')}
                      className="bg-accent hover:bg-accent-light text-white border-none font-semibold flex items-center gap-2"
                    >
                      <Plus size={18} /> Plan Your First Trip
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* ── KPI Stat Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Upcoming Trips" value={data.stats.upcomingTrips} icon={Plane} colorClass="bg-blue-500" />
            <StatCard title="Countries Visited" value={data.stats.countriesVisited} icon={Globe} colorClass="bg-purple-500" />
            <StatCard title="Total Budget" value={data.stats.totalBudget} prefix="₹" icon={Wallet} colorClass="bg-emerald-500" trend="up" trendValue="15%" />
            <StatCard title="Achievements" value={data.stats.achievements} icon={CheckCircle} colorClass="bg-orange-500" />
          </div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column (Span 2) */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* Active Trips */}
              <section>
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-2xl font-heading font-bold text-text">Recent Trips</h2>
                  <button className="text-sm font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.trips.slice(0, 2).map((trip, i) => (
                    <TripCard key={trip.id} trip={trip} index={i} variant="dashboard" />
                  ))}
                </div>
              </section>

              {/* Expense & Activity Row */}
              <div className="flex flex-col gap-8">
                <ExpenseOverview />
                <ActivityFeed activities={data.activity} />
              </div>

            </div>

            {/* Right Column (Span 1) */}
            <div className="space-y-8">
              <WeatherWidget weather={data.weather} />
              <UpcomingItinerary itinerary={data.itinerary} trip={upcomingTrip} />
              <TravelCalendar trips={data.trips} />
              <DestinationRecommendations />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
