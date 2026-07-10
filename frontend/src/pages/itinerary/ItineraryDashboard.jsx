import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ListTodo } from 'lucide-react';

import { itineraryService } from '../../services/itineraryService';
import { tripService } from '../../services/tripService';
import ItineraryHeader from '../../components/itinerary/ItineraryHeader';
import DaySelector from '../../components/itinerary/DaySelector';
import { ItinerarySkeletons } from '../../components/itinerary/ItinerarySkeletons';
import EmptyState from '../../components/ui/EmptyState';

// Views
import TimelineView from '../../components/itinerary/TimelineView';
import CalendarView from '../../components/itinerary/CalendarView';
import KanbanView from '../../components/itinerary/KanbanView';

// Modals/Widgets
import ActivityModal from '../../components/itinerary/ActivityModal';
import ReminderCenter from '../../components/itinerary/ReminderCenter';

export default function ItineraryDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tripId = searchParams.get('tripId');
  
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  
  // State
  const [viewMode, setViewMode] = useState('timeline'); // timeline, calendar, kanban
  const [selectedDay, setSelectedDay] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        let activeTripId = tripId;
        const trips = await tripService.getTrips();
        setAllTrips(trips);
        
        // If tripId is not specified or is not found in the user's active trips
        if (!activeTripId || trips.every(t => String(t.id) !== String(activeTripId))) {
          if (trips && trips.length > 0) {
            activeTripId = trips[0].id;
            // Update URL query string to match the selected active trip
            navigate(`/dashboard/itinerary?tripId=${activeTripId}`, { replace: true });
          } else {
            activeTripId = null;
          }
        }
        
        if (activeTripId) {
          const [tripData, acts, rems] = await Promise.all([
            tripService.getTripById(activeTripId),
            itineraryService.getActivitiesByTrip(activeTripId),
            itineraryService.getReminders(activeTripId)
          ]);
          
          setTrip(tripData);
          setActivities(acts);
          setReminders(rems);
        } else {
          setTrip(null);
          setActivities([]);
          setReminders([]);
        }
      } catch (error) {
        console.error("Failed to load itinerary", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [tripId, navigate]);

  const handleAddActivity = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  const handleDeleteActivity = async (id) => {
    await itineraryService.deleteActivity(id);
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const handleSaveActivity = async (data) => {
    if (editingActivity) {
      const updated = await itineraryService.updateActivity(editingActivity.id, data);
      setActivities(prev => prev.map(a => a.id === updated.id ? updated : a));
    } else {
      const added = await itineraryService.addActivity(data);
      setActivities(prev => [...prev, added]);
    }
    setIsModalOpen(false);
  };

  // Generate dynamic days array from trip startDate and endDate
  const getTripDays = () => {
    if (!trip || !trip.startDate || !trip.endDate) return [];
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = [];
    let dayNum = 1;
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateFormatted = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        weekday: 'short'
      });
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        id: dateStr,
        dayNumber: dayNum++,
        dateFormatted: dateFormatted
      });
    }
    return days;
  };

  const sortedActivities = [...activities].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    const timeA = a.startTime || '';
    const timeB = b.startTime || '';
    return timeA.localeCompare(timeB);
  });

  const filteredActivities = selectedDay === 'all' 
    ? sortedActivities 
    : sortedActivities.filter(a => a.date === selectedDay);

  const renderView = () => {
    switch (viewMode) {
      case 'calendar':
        return <CalendarView activities={filteredActivities} trip={trip} />;
      case 'kanban':
        return <KanbanView activities={filteredActivities} />;
      case 'timeline':
      default:
        return (
          <TimelineView 
            activities={filteredActivities} 
            onEditActivity={handleEditActivity}
            onDeleteActivity={handleDeleteActivity}
          />
        );
    }
  };

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
          <ItinerarySkeletons />
        </motion.div>
      ) : !trip ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="min-h-[60vh] flex items-center justify-center bg-white rounded-[24px] border border-border/50 p-6"
        >
          <EmptyState 
            icon={ListTodo}
            title="No Active Trip Found"
            message="You need to create a trip first before you can plan its day-wise itinerary."
            actionLabel="Create a Trip"
            onAction={() => navigate('/dashboard/trips/create')}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 pb-8"
        >
          {/* Header */}
          <ItineraryHeader 
            trip={trip} 
            trips={allTrips}
            activities={activities}
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            onAddActivity={handleAddActivity} 
          />

          <div className="flex flex-col lg:flex-row gap-6 relative">
            {/* Left Sidebar: Reminders & Days */}
            <div className="w-full lg:w-72 space-y-6 shrink-0 lg:sticky lg:top-24 h-max">
              <ReminderCenter reminders={reminders} />
              
              <DaySelector 
                days={getTripDays()} 
                selectedDay={selectedDay} 
                onSelectDay={setSelectedDay} 
              />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode + selectedDay}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[24px] border border-border/50 shadow-sm p-6 min-h-[500px]"
                >
                  {renderView()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <ActivityModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveActivity}
            activity={editingActivity}
            trip={trip}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
