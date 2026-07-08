package com.tripnest.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripnest.auth.dto.AuthResponse;
import com.tripnest.auth.dto.LoginRequest;
import com.tripnest.auth.dto.RegisterRequest;
import com.tripnest.auth.dto.ForgotPasswordRequest;
import com.tripnest.auth.dto.ResetPasswordRequest;
import com.tripnest.auth.service.AuthService;
import com.tripnest.common.dto.ApiResponse;
import com.tripnest.security.config.PasswordConfig;
import com.tripnest.security.config.SecurityConfig;
import com.tripnest.security.jwt.JwtAuthenticationFilter;
import com.tripnest.security.jwt.JwtTokenProvider;
import com.tripnest.security.user.CustomUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class)
@Import({SecurityConfig.class, PasswordConfig.class})
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    @WithMockUser
    public void testRegisterUserSuccess() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("johndoe");
        request.setEmail("john@example.com");
        request.setPassword("password123");
        request.setFirstName("John");
        request.setLastName("Doe");

        when(authService.registerUser(any(RegisterRequest.class)))
                .thenReturn(ApiResponse.success("User registered successfully as TRAVELER"));

        mockMvc.perform(post("/api/v1/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Operation completed successfully")))
                .andExpect(jsonPath("$.data", is("User registered successfully as TRAVELER")));
    }

    @Test
    @WithMockUser
    public void testLoginSuccess() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setUsernameOrEmail("johndoe");
        request.setPassword("password123");

        AuthResponse authResponse = AuthResponse.builder()
                .token("mocked_jwt_token")
                .username("johndoe")
                .email("john@example.com")
                .roles(List.of("ROLE_TRAVELER"))
                .build();

        when(authService.authenticateUser(any(LoginRequest.class)))
                .thenReturn(ApiResponse.success(authResponse, "Authentication successful"));

        mockMvc.perform(post("/api/v1/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Authentication successful")))
                .andExpect(jsonPath("$.data.token", is("mocked_jwt_token")))
                .andExpect(jsonPath("$.data.username", is("johndoe")))
                .andExpect(jsonPath("$.data.email", is("john@example.com")));
    }

    @Test
    @WithMockUser
    public void testRegisterValidationFailure() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("jd"); // Too short
        request.setEmail("invalid-email"); // Invalid email
        request.setPassword(null); // Null

        mockMvc.perform(post("/api/v1/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Validation failed")))
                .andExpect(jsonPath("$.errors.username", is("Username must be between 3 and 50 characters")))
                .andExpect(jsonPath("$.errors.email", is("Email must be a valid email address")))
                .andExpect(jsonPath("$.errors.password", is("Password must not be blank")));
    }

    @Test
    @WithMockUser
    public void testForgotPasswordSuccess() throws Exception {
        ForgotPasswordRequest request = new ForgotPasswordRequest();
        request.setEmail("john@example.com");

        when(authService.forgotPassword(any(ForgotPasswordRequest.class)))
                .thenReturn(ApiResponse.success("mocked_reset_jwt_token", "Password reset token generated successfully"));

        mockMvc.perform(post("/api/v1/auth/forgot-password")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Password reset token generated successfully")))
                .andExpect(jsonPath("$.data", is("mocked_reset_jwt_token")));
    }

    @Test
    @WithMockUser
    public void testResetPasswordSuccess() throws Exception {
        ResetPasswordRequest request = new ResetPasswordRequest();
        request.setToken("mocked_reset_jwt_token");
        request.setNewPassword("newpassword123");

        when(authService.resetPassword(any(ResetPasswordRequest.class)))
                .thenReturn(ApiResponse.success("Password reset successfully"));

        mockMvc.perform(post("/api/v1/auth/reset-password")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Operation completed successfully")))
                .andExpect(jsonPath("$.data", is("Password reset successfully")));
    }
}
