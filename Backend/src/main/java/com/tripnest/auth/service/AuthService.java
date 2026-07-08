package com.tripnest.auth.service;

import com.tripnest.auth.dto.AuthResponse;
import com.tripnest.auth.dto.LoginRequest;
import com.tripnest.auth.dto.RegisterRequest;
import com.tripnest.common.dto.ApiResponse;

import com.tripnest.auth.dto.ForgotPasswordRequest;
import com.tripnest.auth.dto.ResetPasswordRequest;

public interface AuthService {
    ApiResponse<String> registerUser(RegisterRequest registerRequest);
    ApiResponse<AuthResponse> authenticateUser(LoginRequest loginRequest);
    ApiResponse<String> forgotPassword(ForgotPasswordRequest request);
    ApiResponse<String> resetPassword(ResetPasswordRequest request);
}
