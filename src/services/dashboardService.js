// Mock data for Dashboard
import { apiClient } from './apiClient';

const USE_MOCK_API = true;

export const dashboardService = {
  getStats: async () => {
    if (!USE_MOCK_API) return await apiClient.get('/dashboard/stats');
    return {
      upcomingTrips: 3,
      countriesVisited: 12,
      totalBudget: 1250000,
      totalExpenses: 350000,
      travelDays: 45,
      achievements: 8
    };
  },

  getRecentTrips: async () => {
    if (!USE_MOCK_API) return await apiClient.get('/dashboard/recent-trips');
    return [
      {
        id: '1',
        destination: 'Kyoto, Japan',
        dates: 'Oct 12 - Oct 20, 2024',
        budget: '250000',
        status: 'Planning',
        progress: 40,
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: '2',
        destination: 'Amalfi Coast, Italy',
        dates: 'Jun 05 - Jun 15, 2024',
        budget: '320000',
        status: 'Booked',
        progress: 85,
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=600&auto=format&fit=crop'
      },
      {
        id: '3',
        destination: 'Banff, Canada',
        dates: 'Dec 10 - Dec 18, 2024',
        budget: '180000',
        status: 'Dreaming',
        progress: 10,
        image: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=600&auto=format&fit=crop'
      }
    ];
  },

  getUpcomingItinerary: async () => {
    if (!USE_MOCK_API) return await apiClient.get('/dashboard/upcoming-itinerary');
    return [
      {
        time: '09:00 AM',
        period: 'Morning',
        activity: 'Fushimi Inari Shrine Visit',
        location: 'Kyoto, Japan',
        type: 'Sightseeing'
      },
      {
        time: '01:00 PM',
        period: 'Afternoon',
        activity: 'Traditional Tea Ceremony',
        location: 'Gion District',
        type: 'Experience'
      },
      {
        time: '07:30 PM',
        period: 'Evening',
        activity: 'Dinner at Pontocho Alley',
        location: 'Pontocho, Kyoto',
        type: 'Dining'
      }
    ];
  },

  getActivityFeed: async () => {
    if (!USE_MOCK_API) return await apiClient.get('/dashboard/activity-feed');
    return [
      { id: 1, type: 'trip', title: 'Kyoto Trip created', time: '2 hours ago', icon: 'Plane' },
      { id: 2, type: 'expense', title: 'Flight tickets added (₹8,500)', time: '5 hours ago', icon: 'CreditCard' },
      { id: 3, type: 'document', title: 'Hotel booking confirmation uploaded', time: '1 day ago', icon: 'FileText' },
      { id: 4, type: 'social', title: 'Sarah joined Amalfi Coast trip', time: '2 days ago', icon: 'UserPlus' }
    ];
  },

  getWeather: async () => {
    if (!USE_MOCK_API) return await apiClient.get('/dashboard/weather');
    return {
      temp: 22,
      condition: 'Sunny',
      humidity: '45%',
      wind: '12 km/h',
      advice: 'Perfect weather for sightseeing!'
    };
  }
};
