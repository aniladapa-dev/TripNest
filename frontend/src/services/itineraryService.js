import { apiClient } from './apiClient';

// Helper to get tripId from URL query string
const getQueryTripId = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const tripIdStr = searchParams.get('tripId') || '1';
  const cleanId = parseInt(tripIdStr.replace(/[^\d]/g, ''), 10);
  return isNaN(cleanId) ? 1 : cleanId;
};

// Time formatting helper: convert 24h string ("09:00:00" or "09:00") to 12h string ("09:00 AM")
const formatTime12h = (timeStr) => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] || '00';
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

// Time formatting helper: convert 12h string ("09:00 AM") to 24h string ("09:00:00")
const formatTime24h = (time12h) => {
  if (!time12h) return '00:00:00';
  if (!time12h.toLowerCase().includes('am') && !time12h.toLowerCase().includes('pm')) {
    return time12h.length === 5 ? `${time12h}:00` : time12h;
  }
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier.toLowerCase() === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
};

// Parse duration string (e.g. "2h", "45m") to minutes
const parseDurationToMinutes = (durationStr) => {
  if (!durationStr) return 60; // Default: 1 hour
  const match = durationStr.toLowerCase().match(/(\d+)\s*(h|m|hour|min)?/);
  if (!match) return 60;
  const val = parseInt(match[1], 10);
  const unit = match[2];
  if (unit && (unit.startsWith('m') || unit === 'min')) {
    return val;
  }
  return val * 60;
};

// Calculate end time string ("HH:MM:SS") from start time and duration
const calculateEndTime = (startTime24h, durationStr) => {
  const [hours, minutes] = startTime24h.split(':').map(Number);
  const durMin = parseDurationToMinutes(durationStr);
  const totalMin = hours * 60 + minutes + durMin;
  const endHours = Math.floor(totalMin / 60) % 24;
  const endMinutes = totalMin % 60;
  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}:00`;
};

// Map frontend activity model to backend CreateActivityRequest/UpdateActivityRequest
const mapFrontendActivityToBackend = (act) => {
  const startTime24h = formatTime24h(act.time || '10:00 AM');
  const endTime24h = calculateEndTime(startTime24h, act.duration);
  
  let backendType = 'OTHER';
  const cat = (act.category || '').toLowerCase();
  if (cat.includes('sight')) backendType = 'SIGHTSEEING';
  else if (cat.includes('din')) backendType = 'DINING';
  else if (cat.includes('hotel') || cat.includes('accom')) backendType = 'ACCOMMODATION';
  else if (cat.includes('flight') || cat.includes('transport') || cat.includes('travel')) backendType = 'TRAVEL';

  // Pack location and notes into description since backend doesn't support them explicitly
  const description = `${act.location || ''} | ${act.notes || ''}`;

  return {
    title: act.title,
    description: description,
    type: backendType,
    activityDate: act.date,
    startTime: startTime24h,
    endTime: endTime24h,
    cost: parseFloat(act.cost) || 0.0
  };
};

// Map backend ActivityResponse to frontend activity model
const mapBackendActivityToFrontend = (act) => {
  if (!act) return null;

  // Unpack location and notes
  let location = '';
  let notes = act.description || '';
  if (act.description && act.description.includes(' | ')) {
    const parts = act.description.split(' | ');
    location = parts[0] || '';
    notes = parts.slice(1).join(' | ') || '';
  }

  // Map backend enum to category
  let category = 'Custom';
  if (act.type === 'SIGHTSEEING') category = 'Sightseeing';
  else if (act.type === 'DINING') category = 'Dining';
  else if (act.type === 'ACCOMMODATION') category = 'Hotel';
  else if (act.type === 'TRAVEL') category = 'Flight';

  // Calculate duration string
  let duration = '1h';
  if (act.startTime && act.endTime) {
    const [sH, sM] = act.startTime.split(':').map(Number);
    const [eH, eM] = act.endTime.split(':').map(Number);
    const diffMin = (eH * 60 + eM) - (sH * 60 + sM);
    if (diffMin > 0) {
      const h = Math.floor(diffMin / 60);
      const m = diffMin % 60;
      duration = h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`;
    }
  }

  return {
    id: act.id,
    title: act.title,
    category: category,
    date: act.activityDate,
    time: formatTime12h(act.startTime),
    startTime: act.startTime,
    duration: duration,
    location: location,
    cost: act.cost,
    priority: 'Medium',
    status: 'Planned',
    notes: notes
  };
};

const mockReminders = [
  { id: 'r1', title: 'Check-in for flight', dueTime: 'Aug 31, 10:00 AM', status: 'Completed' },
  { id: 'r2', title: 'Pack passports and tickets', dueTime: 'Aug 31, 08:00 PM', status: 'Overdue' },
  { id: 'r3', title: 'Confirm hotel reservation', dueTime: 'Sep 01, 12:00 PM', status: 'Upcoming' },
];

export const itineraryService = {
  getActivitiesByTrip: async (tripId) => {
    try {
      const timeline = await apiClient.get(`/trips/${tripId}/timeline`);
      if (timeline && timeline.days) {
        return timeline.days.flatMap(day => 
          (day.activities || []).map(mapBackendActivityToFrontend)
        );
      }
      return [];
    } catch (error) {
      console.error("Failed to load activities from backend", error);
      return [];
    }
  },
  
  getReminders: async (tripId) => {
    // Return mock reminders since backend doesn't have reminder tables yet
    return [...mockReminders];
  },

  addActivity: async (activity) => {
    const tripId = getQueryTripId();
    const payload = mapFrontendActivityToBackend(activity);
    const data = await apiClient.post(`/trips/${tripId}/activities`, payload);
    return mapBackendActivityToFrontend(data);
  },

  updateActivity: async (id, updates) => {
    const tripId = getQueryTripId();
    const payload = mapFrontendActivityToBackend(updates);
    const data = await apiClient.put(`/trips/${tripId}/activities/${id}`, payload);
    return mapBackendActivityToFrontend(data);
  },

  deleteActivity: async (id) => {
    const tripId = getQueryTripId();
    await apiClient.delete(`/trips/${tripId}/activities/${id}`);
    return true;
  },

  getActivityById: async (id) => {
    const tripId = getQueryTripId();
    const timeline = await apiClient.get(`/trips/${tripId}/timeline`);
    const allActivities = (timeline?.days || []).flatMap(d => d.activities || []);
    const match = allActivities.find(act => String(act.id) === String(id));
    if (!match) throw new Error("Activity not found");
    return mapBackendActivityToFrontend(match);
  }
};
