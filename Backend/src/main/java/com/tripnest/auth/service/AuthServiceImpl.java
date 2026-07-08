package com.tripnest.auth.service;

import com.tripnest.auth.dto.AuthResponse;
import com.tripnest.auth.dto.LoginRequest;
import com.tripnest.auth.dto.RegisterRequest;
import com.tripnest.common.dto.ApiResponse;
import com.tripnest.exception.BadRequestException;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.security.jwt.JwtTokenProvider;
import com.tripnest.security.user.CustomUserDetails;
import com.tripnest.user.entity.Role;
import com.tripnest.user.entity.User;
import com.tripnest.user.entity.UserRole;
import com.tripnest.user.mapper.UserMapper;
import com.tripnest.user.repository.RoleRepository;
import com.tripnest.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.tripnest.auth.dto.ForgotPasswordRequest;
import com.tripnest.auth.dto.ResetPasswordRequest;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserMapper userMapper;

    public AuthServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtTokenProvider tokenProvider,
                           UserMapper userMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
    public ApiResponse<String> registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        // Map DTO to Entity
        User user = userMapper.registerRequestToUser(registerRequest);

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Assign default role (Traveler)
        Role userRole = roleRepository.findByName(UserRole.TRAVELER)
                .orElseThrow(() -> new ResourceNotFoundException("Default TRAVELER role not found"));
        user.setRoles(Collections.singleton(userRole));

        // Save
        userRepository.save(user);

        return ApiResponse.success("User registered successfully as TRAVELER");
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<AuthResponse> authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        AuthResponse authResponse = AuthResponse.builder()
                .token(jwt)
                .username(userDetails.getUsername())
                .email(userDetails.getUser().getEmail())
                .roles(roles)
                .build();

        return ApiResponse.success(authResponse, "Authentication successful");
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<String> forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        // Generate stateless reset JWT token (expires in 15 mins)
        String resetToken = tokenProvider.generateResetToken(user.getEmail());

        return ApiResponse.success(resetToken, "Password reset token generated successfully");
    }

    @Override
    @Transactional
    public ApiResponse<String> resetPassword(ResetPasswordRequest request) {
        if (!tokenProvider.validateResetToken(request.getToken())) {
            throw new BadRequestException("Invalid or expired password reset token");
        }

        String email = tokenProvider.getEmailFromResetToken(request.getToken());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        // Update password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return ApiResponse.success("Password reset successfully");
    }
}
