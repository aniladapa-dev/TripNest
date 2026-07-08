package com.tripnest.user.service;

import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.user.dto.UpdateProfileRequest;
import com.tripnest.user.dto.UserProfileResponse;
import com.tripnest.user.entity.User;
import com.tripnest.user.entity.UserPreference;
import com.tripnest.user.mapper.UserMapper;
import com.tripnest.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
        return userMapper.toProfileResponse(user);
    }

    @Override
    @Transactional
    public UserProfileResponse updateUserProfile(String username, UpdateProfileRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        // Update user properties
        userMapper.updateUserFromRequest(request, user);

        // Update or initialize preferences
        UserPreference preference = user.getPreference();
        if (preference == null) {
            preference = new UserPreference();
            user.setPreference(preference);
        }
        preference.setTravelPreferences(request.getTravelPreferences());
        preference.setFavoriteDestinations(request.getFavoriteDestinations());

        User savedUser = userRepository.save(user);
        return userMapper.toProfileResponse(savedUser);
    }
}
