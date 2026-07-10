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

// Map backend DestinationResponse to frontend destination model
const mapBackendDestination = (d) => {
  if (!d) return null;
  return {
    id: String(d.id),
    name: d.name,
    country: d.country,
    rating: 4.8, // static rating since backend doesn't track rating
    reviews: 1250,
    bestSeason: 'Spring & Autumn',
    estBudget: 150000,
    duration: '5-7 Days',
    image: getDestinationImage(d.name),
    category: d.popular ? 'Historical' : 'Trending',
    description: d.description,
    attractionsList: d.attractions ? d.attractions.split(',').map(s => s.trim()) : []
  };
};

const mockHotels = [
  { id: 'h1', name: 'Ritz-Carlton Kyoto', rating: 4.9, pricePerNight: 85000, distance: '1.2 km from center', image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=400&auto=format&fit=crop', amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'] },
  { id: 'h2', name: 'Kyoto Granbell Hotel', rating: 4.6, pricePerNight: 12500, distance: '0.5 km from center', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5b5df?q=80&w=400&auto=format&fit=crop', amenities: ['WiFi', 'Restaurant'] },
];

const mockRestaurants = [
  { id: 'r1', name: 'Kikunoi', cuisine: 'Traditional Kaiseki', rating: 4.9, costForTwo: 35000, distance: '2.5 km', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop' },
  { id: 'r2', name: 'Gion Kyoto Ramen', cuisine: 'Local Ramen', rating: 4.7, costForTwo: 1800, distance: '0.8 km', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=400&auto=format&fit=crop' },
];

export const destinationService = {
  getTrendingDestinations: async () => {
    try {
      const data = await apiClient.get('/destinations');
      return (data || []).map(mapBackendDestination);
    } catch (error) {
      console.error("Failed to load destinations", error);
      return [];
    }
  },
  
  getDestinationDetails: async (id) => {
    try {
      // If id is a string like "dest1", parse or extract numeric part
      const cleanId = parseInt(String(id).replace(/[^\d]/g, ''), 10);
      const destId = isNaN(cleanId) ? 1 : cleanId;

      const data = await apiClient.get(`/destinations/${destId}`);
      return mapBackendDestination(data);
    } catch (error) {
      console.error("Failed to load destination details", error);
      // Fallback
      return {
        id: String(id),
        name: 'Kyoto',
        country: 'Japan',
        rating: 4.8,
        reviews: 120,
        bestSeason: 'Spring & Autumn',
        estBudget: 150000,
        duration: '5-7 Days',
        image: getDestinationImage('Kyoto'),
        category: 'Historical',
        description: 'Historical city in Japan with ancient temples and shrines.',
        attractionsList: ['Fushimi Inari', 'Golden Pavilion']
      };
    }
  },
  
  getAttractions: async (destId) => {
    try {
      const cleanId = parseInt(String(destId).replace(/[^\d]/g, ''), 10);
      const idVal = isNaN(cleanId) ? 1 : cleanId;
      const data = await apiClient.get(`/destinations/${idVal}`);
      if (data && data.attractions) {
        return data.attractions.split(',').map((att, idx) => ({
          id: `att-${destId}-${idx}`,
          name: att.trim(),
          rating: 4.8,
          timeRequired: '2-3 hours',
          entryFee: 0,
          description: `Famous attraction in the region.`,
          image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=400&auto=format&fit=crop'
        }));
      }
    } catch (e) {
      console.warn("Failed to get attractions, using mock", e);
    }
    return [
      { id: 'att1', name: 'Fushimi Inari Taisha', rating: 4.9, timeRequired: '2-3 hours', entryFee: 0, description: 'Famous shrine with thousands of vermilion torii gates.', image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=400&auto=format&fit=crop' },
      { id: 'att2', name: 'Kinkaku-ji (Golden Pavilion)', rating: 4.8, timeRequired: '1-2 hours', entryFee: 400, description: 'Zen Buddhist temple covered in gold leaf.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop' },
    ];
  },
  
  getHotels: async (destId) => {
    return mockHotels;
  },
  
  getRestaurants: async (destId) => {
    return mockRestaurants;
  }
};
