const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockActivities = [
  { id: 'a1', title: 'Flight to Paris', category: 'Flight', date: '2024-09-01', time: '10:00 AM', duration: '8h', location: 'JFK Airport', cost: 65000, priority: 'High', status: 'Completed', notes: 'Confirmation #AB123' },
  { id: 'a2', title: 'Hotel Check-in', category: 'Hotel', date: '2024-09-02', time: '02:00 PM', duration: '1h', location: 'Le Meurice, Paris', cost: 95000, priority: 'High', status: 'Planned', notes: 'Request a room with a view' },
  { id: 'a3', title: 'Eiffel Tower Visit', category: 'Sightseeing', date: '2024-09-02', time: '04:30 PM', duration: '3h', location: 'Champ de Mars, 5 Avenue Anatole France', cost: 4000, priority: 'Medium', status: 'Planned', notes: 'Booked tickets in advance' },
  { id: 'a4', title: 'Dinner at Le Jules Verne', category: 'Dining', date: '2024-09-02', time: '08:00 PM', duration: '2h', location: 'Eiffel Tower, Paris', cost: 15000, priority: 'High', status: 'Planned', notes: 'Reservation under Smith' },
  { id: 'a5', title: 'Louvre Museum', category: 'Sightseeing', date: '2024-09-03', time: '10:00 AM', duration: '4h', location: 'Rue de Rivoli, Paris', cost: 2500, priority: 'Medium', status: 'Planned', notes: 'Must see the Mona Lisa' },
];

const mockReminders = [
  { id: 'r1', title: 'Check-in for flight', dueTime: 'Aug 31, 10:00 AM', status: 'Completed' },
  { id: 'r2', title: 'Pack passports and tickets', dueTime: 'Aug 31, 08:00 PM', status: 'Overdue' },
  { id: 'r3', title: 'Confirm hotel reservation', dueTime: 'Sep 01, 12:00 PM', status: 'Upcoming' },
];

export const itineraryService = {
  getActivitiesByTrip: async (tripId) => {
    await delay(800);
    return [...mockActivities];
  },
  
  getReminders: async (tripId) => {
    await delay(600);
    return [...mockReminders];
  },

  addActivity: async (activity) => {
    await delay(1000);
    const newActivity = { ...activity, id: `a${Date.now()}`, status: 'Planned' };
    return newActivity;
  },

  updateActivity: async (id, updates) => {
    await delay(800);
    return { id, ...updates };
  },

  deleteActivity: async (id) => {
    await delay(600);
    return true;
  },

  getActivityById: async (id) => {
    await delay(500);
    return mockActivities.find(a => a.id === id) || mockActivities[0];
  }
};
