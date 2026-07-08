import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { tripService } from '../../services/tripService';
import SearchFilterBar from '../../components/trips/SearchFilterBar';
import TripCard from '../../components/trips/TripCard';
import DeleteModal from '../../components/trips/DeleteModal';
import { TripGridSkeleton, TripListSkeleton } from '../../components/trips/TripSkeletons';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Delete Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const data = await tripService.getTrips({
          search: searchQuery,
          status: statusFilter,
          sort: sortOrder
        });
        setTrips(data);
      } catch (error) {
        console.error("Failed to fetch trips", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small debounce for search
    const timer = setTimeout(() => {
      fetchTrips();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, statusFilter, sortOrder]);

  const handleDeleteRequest = (trip) => {
    setTripToDelete(trip);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!tripToDelete) return;
    setIsDeleting(true);
    try {
      await tripService.deleteTrip(tripToDelete.id);
      setTrips(trips.filter(t => t.id !== tripToDelete.id));
      setDeleteModalOpen(false);
      setTripToDelete(null);
    } catch (error) {
      console.error("Failed to delete", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text">My Trips</h1>
          <p className="text-text-secondary mt-1">Manage and organize all your travel adventures.</p>
        </div>
        <Link to="/dashboard/trips/create">
          <Button variant="primary" glow className="flex items-center gap-2">
            <Plus size={18} /> Create New Trip
          </Button>
        </Link>
      </div>

      {/* ── Filters ── */}
      <SearchFilterBar 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        sortOrder={sortOrder} setSortOrder={setSortOrder}
        viewMode={viewMode} setViewMode={setViewMode}
      />

      {/* ── Content Area ── */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === 'grid' ? <TripGridSkeleton count={6} /> : <TripListSkeleton count={4} />}
            </motion.div>
          ) : trips.length > 0 ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "flex flex-col gap-4"
              }
            >
              {trips.map((trip) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  viewMode={viewMode}
                  variant="manage"
                  onDeleteRequest={handleDeleteRequest} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[400px]"
            >
              <EmptyState 
                title={searchQuery ? "No matching trips found" : "No trips found"}
                message={searchQuery 
                  ? `We couldn't find any trips matching "${searchQuery}". Try adjusting your filters.`
                  : "You haven't planned any trips in this category yet. Time to start dreaming!"
                }
                actionLabel={searchQuery ? "Clear Filters" : "Create your first trip"}
                onAction={() => {
                  if (searchQuery || statusFilter !== 'All') {
                    setSearchQuery('');
                    setStatusFilter('All');
                  } else {
                    window.location.href = '/dashboard/trips/create';
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Delete Modal ── */}
      <DeleteModal 
        isOpen={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        tripName={tripToDelete?.name}
        isDeleting={isDeleting}
      />
    </div>
  );
}
