import { apiClient } from './apiClient';
import { tripService } from './tripService';

const USE_MOCK_API = false;

// Time formatting helper to convert "HH:MM:SS" or "HH:MM" to "hh:mm AM/PM"
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

export const dashboardService = {
  getStats: async () => {
    if (USE_MOCK_API) {
      return {
        upcomingTrips: 3,
        countriesVisited: 12,
        totalBudget: 1250000,
        totalExpenses: 350000,
        travelDays: 45,
        achievements: 8
      };
    }

    try {
      const trips = await tripService.getTrips();
      // Sort trips chronologically by startDate
      trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      
      const upcomingTrips = trips.filter(t => t.status === 'Upcoming' || t.status === 'Planning').length;
      const completedTrips = trips.filter(t => t.status === 'Completed');
      const uniqueCountries = new Set(completedTrips.map(t => t.country).filter(Boolean));
      const totalBudget = trips.reduce((acc, t) => acc + (t.budget || 0), 0);
      const travelDays = trips.reduce((acc, t) => acc + (t.duration || 0), 0);

      return {
        upcomingTrips: upcomingTrips,
        countriesVisited: uniqueCountries.size,
        totalBudget: totalBudget,
        totalExpenses: 0,
        travelDays: travelDays,
        achievements: trips.length > 0 ? trips.length + 2 : 0
      };
    } catch (error) {
      console.warn("Failed to compute live dashboard stats, using fallback mock", error);
      return {
        upcomingTrips: 0,
        countriesVisited: 0,
        totalBudget: 0,
        totalExpenses: 0,
        travelDays: 0,
        achievements: 0
      };
    }
  },

  getRecentTrips: async () => {
    if (USE_MOCK_API) {
      return [];
    }

    try {
      const trips = await tripService.getTrips();
      // Sort trips chronologically by startDate
      trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      return trips.slice(0, 3).map(t => ({
        id: String(t.id),
        destination: `${t.destination}, ${t.country}`,
        dates: `${t.startDate} - ${t.endDate}`,
        startDate: t.startDate,
        endDate: t.endDate,
        budget: String(t.budget),
        status: t.status,
        progress: t.status === 'Completed' ? 100 : (t.status === 'Upcoming' ? 40 : 15),
        image: t.image,
        travelers: t.travelers
      }));
    } catch (error) {
      console.error("Failed to get recent trips for dashboard", error);
      return [];
    }
  },

  getUpcomingItinerary: async () => {
    if (USE_MOCK_API) {
      return [];
    }

    try {
      const trips = await tripService.getTrips();
      // Sort trips chronologically by startDate
      trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      const upcoming = trips.find(t => t.status === 'Upcoming' || t.status === 'Planning');
      if (upcoming) {
        const timeline = await tripService.getTripTimeline(upcoming.id);
        
        // Match only today's date (formatted as YYYY-MM-DD local)
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        const todayDay = (timeline.days || []).find(d => {
          if (!d.activities || d.activities.length === 0) return false;
          // Check if activity date matches today
          return d.activities[0].activityDate === todayStr;
        });

        if (todayDay) {
          return todayDay.activities.map(act => {
            let location = '';
            if (act.description && act.description.includes(' | ')) {
              location = act.description.split(' | ')[0] || '';
            }
            
            let type = 'Sightseeing';
            if (act.type === 'DINING') type = 'Dining';
            else if (act.type === 'TRAVEL') type = 'Transportation';
            else if (act.type === 'ACCOMMODATION') type = 'Accommodation';

            return {
              time: formatTime12h(act.startTime),
              period: parseInt(act.startTime.split(':')[0]) < 12 ? 'Morning' : (parseInt(act.startTime.split(':')[0]) < 17 ? 'Afternoon' : 'Evening'),
              activity: act.title,
              location: location || upcoming.destination,
              type: type
            };
          });
        }
      }
    } catch (error) {
      console.warn("Failed to get live upcoming itinerary for dashboard", error);
    }

    // Return empty itinerary if no active activities are found to let the UI show "Free day!"
    return [];
  },

  getActivityFeed: async () => {
    try {
      const trips = await tripService.getTrips();
      if (trips && trips.length > 0) {
        // Sort trips chronologically by startDate
        trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        const latestTrip = trips[0];
        const feed = [
          { id: 1, type: 'trip', title: `Trip to ${latestTrip.destination} created`, time: 'Recently', icon: 'Plane' }
        ];
        
        const timeline = await tripService.getTripTimeline(latestTrip.id);
        const dayWithActs = (timeline.days || []).find(d => d.activities && d.activities.length > 0);
        if (dayWithActs && dayWithActs.activities.length > 0) {
          const latestAct = dayWithActs.activities[0];
          feed.push({ id: 2, type: 'activity', title: `Activity "${latestAct.title}" planned`, time: 'Recently', icon: 'CheckCircle' });
        } else {
          feed.push({ id: 2, type: 'explore', title: 'Start planning your day-wise itinerary', time: 'Get started', icon: 'FileText' });
        }
        
        feed.push({ id: 3, type: 'document', title: 'Organize your travel documents', time: 'Setup', icon: 'FileText' });
        return feed;
      }
    } catch (e) {
      console.warn("Failed to get dynamic activity feed", e);
    }
    
    return [
      { id: 1, type: 'trip', title: 'No trips created yet', time: 'Get started', icon: 'Plane' }
    ];
  },

  getWeather: async () => {
    if (USE_MOCK_API) {
      return { location: 'Paris, France', temp: 22, condition: 'Sunny', humidity: '45%', wind: '12 km/h', advice: 'Perfect weather for sightseeing!' };
    }

    try {
      const trips = await tripService.getTrips();
      // Sort trips chronologically by startDate
      trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      const upcoming = trips.find(t => t.status === 'Upcoming' || t.status === 'Planning');
      if (upcoming) {
        const destinations = await apiClient.get('/destinations');
        const matchedDest = (destinations || []).find(d => d.name.toLowerCase() === upcoming.destination.toLowerCase());
        if (matchedDest) {
          const weather = await apiClient.get(`/destinations/${matchedDest.id}/weather`);
          return {
            location: `${upcoming.destination}, ${upcoming.country}`,
            temp: Math.round(weather.temperature) || 24,
            condition: weather.condition || 'Sunny',
            humidity: weather.humidity ? `${weather.humidity}%` : '50%',
            wind: weather.windSpeed ? `${weather.windSpeed} km/h` : '10 km/h',
            advice: 'Perfect weather for sightseeing!'
          };
        }
      }
    } catch (error) {
      console.warn("Failed to retrieve live weather data, using default", error);
    }

    return {
      location: 'Paris, France',
      temp: 22,
      condition: 'Sunny',
      humidity: '45%',
      wind: '12 km/h',
      advice: 'Perfect weather for sightseeing!'
    };
  }
};
