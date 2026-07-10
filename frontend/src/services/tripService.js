import { apiClient } from './apiClient';

// Helper to determine destination images based on name
const getDestinationImage = (name) => {
  const n = (name || '').toLowerCase();
  if (n.includes('bali')) return '/images/destinations/bali_destination_1783347854372.jpg';
  if (n.includes('dubai')) return '/images/destinations/dubai_destination_1783347868029.jpg';
  if (n.includes('paris')) return '/images/destinations/paris_destination_1783347842867.jpg';
  if (n.includes('santorini')) return '/images/destinations/santorini_destination_1783347901421.jpg';
  if (n.includes('switzer')) return '/images/destinations/switzerland_destination_1783347889687.jpg';
  if (n.includes('tokyo') || n.includes('kyoto')) return '/images/destinations/tokyo_destination_1783347878638.jpg';
  return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop';
};

// Map backend TripResponse to frontend trip model
const mapBackendTripToFrontend = (t) => {
  if (!t) return null;
  
  // Unpack traveler count from title if present
  let title = t.title || '';
  let travelersCount = 1;
  if (title.includes(' | travelers: ')) {
    const parts = title.split(' | travelers: ');
    title = parts[0] || '';
    travelersCount = parseInt(parts[1], 10) || 1;
  }

  // Calculate duration
  let duration = 0;
  if (t.startDate && t.endDate) {
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  }

  // Map status
  let status = 'Planning';
  if (t.status === 'ACTIVE') status = 'Upcoming';
  else if (t.status === 'COMPLETED') status = 'Completed';
  else if (t.status === 'CANCELLED') status = 'Cancelled';

  return {
    id: t.id,
    name: title,
    destination: t.destinationName || '',
    country: t.destinationCountry || '',
    startDate: t.startDate,
    endDate: t.endDate,
    budget: t.budget || 0,
    status: status,
    duration: duration,
    image: getDestinationImage(t.destinationName),
    travelers: travelersCount,
    owner: t.ownerUsername || ''
  };
};

export const tripService = {
  getTrips: async () => {
    try {
      const data = await apiClient.get('/trips');
      return (data || []).map(mapBackendTripToFrontend);
    } catch (error) {
      console.error("Failed to load trips", error);
      return [];
    }
  },

  getTripById: async (id) => {
    try {
      const data = await apiClient.get(`/trips/${id}`);
      return mapBackendTripToFrontend(data);
    } catch (error) {
      console.error(`Failed to load trip ${id}`, error);
      throw error;
    }
  },

  createTrip: async (tripData) => {
    try {
      const destinations = await apiClient.get('/destinations');
      // Find matching destination name
      const query = (tripData.destination || '').toLowerCase();
      const matched = (destinations || []).find(d => d.name.toLowerCase() === query);
      const destId = matched ? matched.id : 1; // Default to Paris (ID 1) if not found

      // Pack traveler count into the title
      const titleWithTravelers = `${tripData.name} | travelers: ${tripData.travelers || 1}`;

      const payload = {
        title: titleWithTravelers,
        destinationId: destId,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        budget: parseFloat(tripData.budget) || 0.0
      };

      const data = await apiClient.post('/trips', payload);
      return mapBackendTripToFrontend(data);
    } catch (error) {
      console.error("Failed to create trip", error);
      throw error;
    }
  },

  updateTrip: async (id, tripData) => {
    try {
      const destinations = await apiClient.get('/destinations');
      const query = (tripData.destination || '').toLowerCase();
      const matched = (destinations || []).find(d => d.name.toLowerCase() === query);
      const destId = matched ? matched.id : 1;

      // Pack traveler count into the title
      const titleWithTravelers = `${tripData.name} | travelers: ${tripData.travelers || 1}`;

      let backendStatus = 'PLANNED';
      const fStatus = (tripData.status || '').toLowerCase();
      if (fStatus === 'upcoming' || fStatus === 'active') backendStatus = 'ACTIVE';
      else if (fStatus === 'completed') backendStatus = 'COMPLETED';
      else if (fStatus === 'cancelled') backendStatus = 'CANCELLED';

      const payload = {
        title: titleWithTravelers,
        destinationId: destId,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        budget: parseFloat(tripData.budget) || 0.0,
        status: backendStatus
      };

      const data = await apiClient.put(`/trips/${id}`, payload);
      return mapBackendTripToFrontend(data);
    } catch (error) {
      console.error(`Failed to update trip ${id}`, error);
      throw error;
    }
  },

  deleteTrip: async (id) => {
    try {
      await apiClient.delete(`/trips/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete trip ${id}`, error);
      throw error;
    }
  },

  getTripTimeline: async (tripId) => {
    try {
      // Returns ItineraryResponse DTO
      return await apiClient.get(`/trips/${tripId}/timeline`);
    } catch (error) {
      console.error(`Failed to get timeline for trip ${tripId}`, error);
      // Return empty format
      return { days: [] };
    }
  }
};
