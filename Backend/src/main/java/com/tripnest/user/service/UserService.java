package com.tripnest.user.service;

import com.tripnest.user.dto.UpdateProfileRequest;
import com.tripnest.user.dto.UserProfileResponse;

public interface UserService {
    UserProfileResponse getUserProfile(String username);
    UserProfileResponse updateUserProfile(String username, UpdateProfileRequest request);
}
