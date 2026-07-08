// Mock data and service for Trip Management Module
import { apiClient } from './apiClient';

const USE_MOCK_API = true; // Set to false to use Spring Boot backend

const initialTrips = [
  {
    id: 't1',
    name: 'Autumn in Kyoto',
    destination: 'Kyoto',
    country: 'Japan',
    startDate: '2024-10-12',
    endDate: '2024-10-20',
    duration: 8,
    travelers: 2,
    travelType: 'Couple',
    budget: 3500,
    expenses: 1200,
    status: 'Upcoming',
    progress: 85,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    organizer: 'Sarah Jenkins',
    description: 'A magical week experiencing the autumn leaves, traditional tea ceremonies, and ancient temples of Kyoto.'
  },
  {
    id: 't2',
    name: 'Amalfi Coast Retreat',
    destination: 'Amalfi Coast',
    country: 'Italy',
    startDate: '2024-06-05',
    endDate: '2024-06-15',
    duration: 10,
    travelers: 4,
    travelType: 'Friends',
    budget: 5000,
    expenses: 4800,
    status: 'Completed',
    progress: 100,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop',
    organizer: 'Sarah Jenkins',
    description: 'Sun, sea, and pasta. Exploring the beautiful coastal towns of Positano, Amalfi, and Ravello.'
  },
  {
    id: 't3',
    name: 'Winter Wonderland',
    destination: 'Banff',
    country: 'Canada',
    startDate: '2024-12-10',
    endDate: '2024-12-18',
    duration: 8,
    travelers: 3,
    travelType: 'Family',
    budget: 4200,
    expenses: 500,
    status: 'Planning',
    progress: 25,
    image: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=800&auto=format&fit=crop',
    organizer: 'Sarah Jenkins',
    description: 'Skiing, hot springs, and snowy mountains in the heart of the Canadian Rockies.'
  },
  {
    id: 't4',
    name: 'Bali Remote Work',
    destination: 'Ubud',
    country: 'Indonesia',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    duration: 28,
    travelers: 1,
    travelType: 'Solo',
    budget: 2500,
    expenses: 0,
    status: 'Archived',
    progress: 5,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
    organizer: 'Sarah Jenkins',
    description: 'A month of remote work, yoga, and exploring the rice terraces of Bali.'
  }
];

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const tripService = {
  // Get all trips
  getTrips: async (filters = {}) => {
    if (!USE_MOCK_API) {
      return await apiClient.get('/trips', { params: filters });
    }

    // Mock Implementation
    await delay(800); 
    
    let result = [...initialTrips];
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(search) || 
        t.destination.toLowerCase().includes(search) ||
        t.country.toLowerCase().includes(search)
      );
    }
    
    if (filters.status && filters.status !== 'All') {
      result = result.filter(t => t.status === filters.status);
    }

    if (filters.sort) {
      switch (filters.sort) {
        case 'newest':
          result.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
          break;
        case 'oldest':
          result.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
          break;
        case 'budget-high':
          result.sort((a, b) => b.budget - a.budget);
          break;
        case 'budget-low':
          result.sort((a, b) => a.budget - b.budget);
          break;
        case 'alphabetical':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }
    
    return result;
  },

  getTripById: async (id) => {
    if (!USE_MOCK_API) {
      return await apiClient.get(`/trips/${id}`);
    }

    await delay(600);
    const trip = initialTrips.find(t => t.id === id);
    if (!trip) throw new Error("Trip not found");
    return trip;
  },

  createTrip: async (tripData) => {
    if (!USE_MOCK_API) {
      return await apiClient.post('/trips', tripData);
    }

    await delay(1200);
    const newTrip = {
      ...tripData,
      id: `t${Date.now()}`,
      status: 'Planning',
      progress: 0,
      expenses: 0,
      image: tripData.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop'
    };
    return newTrip;
  },

  updateTrip: async (id, tripData) => {
    if (!USE_MOCK_API) {
      return await apiClient.put(`/trips/${id}`, tripData);
    }

    await delay(800);
    return { id, ...tripData };
  },

  deleteTrip: async (id) => {
    if (!USE_MOCK_API) {
      return await apiClient.delete(`/trips/${id}`);
    }

    await delay(800);
    return true; 
  }
};
