import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { itineraryService } from '../../services/itineraryService';
import { tripService } from '../../services/tripService'; // to get trip details
import ItineraryHeader from '../../components/itinerary/ItineraryHeader';
import DaySelector from '../../components/itinerary/DaySelector';
import { ItinerarySkeletons } from '../../components/itinerary/ItinerarySkeletons';

// Views
import TimelineView from '../../components/itinerary/TimelineView';
import CalendarView from '../../components/itinerary/CalendarView';
import KanbanView from '../../components/itinerary/KanbanView';

// Modals/Widgets
import ActivityModal from '../../components/itinerary/ActivityModal';
import ReminderCenter from '../../components/itinerary/ReminderCenter';

export default function ItineraryDashboard() {
  const location = useLocation();
  // Attempt to grab tripId from URL query params (e.g. ?tripId=t123)
  const searchParams = new URLSearchParams(location.search);
  const tripId = searchParams.get('tripId') || 't1'; // fallback mock tripId
  
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [reminders, setReminders] = useState([]);
  
  // State
  const [viewMode, setViewMode] = useState('timeline'); // timeline, calendar, kanban
  const [selectedDay, setSelectedDay] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  // Mock Days
  const mockDays = [
    { id: 'd1', dateFormatted: 'Sep 1, 2024 (Sun)' },
    { id: 'd2', dateFormatted: 'Sep 2, 2024 (Mon)' },
    { id: 'd3', dateFormatted: 'Sep 3, 2024 (Tue)' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app we'd fetch based on tripId
        const [tripData, acts, rems] = await Promise.all([
          tripService.getTripById(tripId).catch(() => ({ name: 'Kyoto Adventure', destination: 'Kyoto, Japan', status: 'Upcoming', duration: 14 })),
          itineraryService.getActivitiesByTrip(tripId),
          itineraryService.getReminders(tripId)
        ]);
        
        setTrip(tripData);
        setActivities(acts);
        setReminders(rems);
      } catch (error) {
        console.error("Failed to load itinerary", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [tripId]);

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

  const filteredActivities = selectedDay === 'all' 
    ? activities 
    : activities.filter(a => a.date === '2024-09-02'); // Mock filter for day 2

  const renderView = () => {
    switch (viewMode) {
      case 'calendar':
        return <CalendarView activities={filteredActivities} />;
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
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            onAddActivity={handleAddActivity} 
          />

          <div className="flex flex-col lg:flex-row gap-6 relative">
            {/* Left Sidebar: Reminders & Days */}
            <div className="w-full lg:w-72 space-y-6 shrink-0 lg:sticky lg:top-24 h-max">
              <ReminderCenter reminders={reminders} />
              
              {/* Day Selector only relevant for timeline, but can stay globally */}
              <DaySelector 
                days={mockDays} 
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
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
