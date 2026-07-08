const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockDestinations = [
  { id: 'dest1', name: 'Kyoto', country: 'Japan', rating: 4.9, reviews: 1250, bestSeason: 'Spring (Mar - May)', estBudget: 150000, duration: '5-7 Days', image: '/images/destinations/tokyo_destination_1783347878638.jpg', category: 'Historical' },
  { id: 'dest2', name: 'Bali', country: 'Indonesia', rating: 4.8, reviews: 3200, bestSeason: 'Summer (Jun - Aug)', estBudget: 85000, duration: '7-10 Days', image: '/images/destinations/bali_destination_1783347854372.jpg', category: 'Beaches' },
  { id: 'dest3', name: 'Swiss Alps', country: 'Switzerland', rating: 4.9, reviews: 980, bestSeason: 'Winter (Dec - Feb)', estBudget: 220000, duration: '4-6 Days', image: '/images/destinations/switzerland_destination_1783347889687.jpg', category: 'Mountains' },
  { id: 'dest4', name: 'Dubai', country: 'UAE', rating: 4.7, reviews: 4500, bestSeason: 'Winter (Nov - Mar)', estBudget: 180000, duration: '3-5 Days', image: '/images/destinations/dubai_destination_1783347868029.jpg', category: 'Cities' },
];

const mockAttractions = [
  { id: 'att1', name: 'Fushimi Inari Taisha', rating: 4.9, timeRequired: '2-3 hours', entryFee: 0, description: 'Famous shrine with thousands of vermilion torii gates.', image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=400&auto=format&fit=crop' },
  { id: 'att2', name: 'Kinkaku-ji (Golden Pavilion)', rating: 4.8, timeRequired: '1-2 hours', entryFee: 400, description: 'Zen Buddhist temple covered in gold leaf.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop' },
];

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
    await delay(600);
    return mockDestinations;
  },
  
  getDestinationDetails: async (id) => {
    await delay(800);
    return mockDestinations.find(d => d.id === id) || mockDestinations[0];
  },
  
  getAttractions: async (destId) => {
    await delay(500);
    return mockAttractions;
  },
  
  getHotels: async (destId) => {
    await delay(500);
    return mockHotels;
  },
  
  getRestaurants: async (destId) => {
    await delay(500);
    return mockRestaurants;
  }
};
