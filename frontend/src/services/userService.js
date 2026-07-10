import { apiClient } from './apiClient';

export const userService = {
  getUserProfile: async () => {
    return await apiClient.get('/users/profile');
  },

  updateUserProfile: async (profileData) => {
    return await apiClient.put('/users/profile', profileData);
  },

  getTravelHistory: async () => {
    return await apiClient.get('/users/profile/history');
  }
};
