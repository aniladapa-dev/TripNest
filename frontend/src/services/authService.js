import { apiClient } from './apiClient';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password) => {
    const payload = {
      usernameOrEmail: email,
      password: password
    };
    
    // Call backend login
    const data = await apiClient.post('/auth/login', payload);
    
    // Save token and user details to localStorage
    if (data && data.token) {
      localStorage.setItem('tripnest_token', data.token);
      localStorage.setItem('tripnest_user', JSON.stringify({
        username: data.username,
        email: data.email,
        roles: data.roles
      }));
    }
    
    return data;
  },

  register: async (userData) => {
    // Split Full Name into First and Last names
    const nameParts = (userData.name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || 'Traveler';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    // Clean and derive username from email prefix (e.g. john.doe from john.doe@email.com)
    let username = (userData.email || '').split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');
    if (username.length < 3) {
      username = username + '123';
    }

    const payload = {
      username: username,
      email: userData.email,
      password: userData.password,
      firstName: firstName,
      lastName: lastName
    };

    // Call backend register
    return await apiClient.post('/auth/register', payload);
  },

  verifyOTP: async (otp) => {
    await delay(1000);
    if (otp === '000000') {
      throw new Error('Invalid verification code');
    }
    return { success: true };
  },

  resendOTP: async (email) => {
    await delay(1000);
    return { success: true, message: 'OTP resent successfully' };
  },

  forgotPassword: async (email) => {
    const data = await apiClient.post('/auth/forgot-password', { email });
    // The backend returns a stateless password reset token as data
    if (data) {
      localStorage.setItem('tripnest_reset_token', data);
    }
    return { success: true };
  },

  resetPassword: async (newPassword) => {
    const resetToken = localStorage.getItem('tripnest_reset_token');
    if (!resetToken) {
      throw new Error('No password reset session active');
    }
    
    const payload = {
      token: resetToken,
      newPassword: newPassword
    };
    
    const data = await apiClient.post('/auth/reset-password', payload);
    localStorage.removeItem('tripnest_reset_token');
    return data;
  }
};
