// Dummy Authentication Service

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password) => {
    await delay(1500); // Simulate network latency
    if (email === 'error@tripnest.com') {
      throw new Error('Invalid email or password');
    }
    return { user: { id: 1, name: 'John Doe', email }, token: 'mock-jwt-token' };
  },

  register: async (userData) => {
    await delay(2000);
    if (userData.email === 'taken@tripnest.com') {
      throw new Error('Email is already registered');
    }
    return { user: { id: 2, ...userData }, token: 'mock-jwt-token' };
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
    await delay(1200);
    if (email === 'error@tripnest.com') {
      throw new Error('Account not found');
    }
    return { success: true };
  },

  resetPassword: async (newPassword) => {
    await delay(1500);
    return { success: true };
  }
};
