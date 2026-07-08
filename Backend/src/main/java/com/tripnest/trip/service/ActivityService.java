package com.tripnest.trip.service;

import com.tripnest.trip.dto.ActivityResponse;
import com.tripnest.trip.dto.CreateActivityRequest;
import com.tripnest.trip.dto.UpdateActivityRequest;

public interface ActivityService {
    ActivityResponse addActivity(Long tripId, CreateActivityRequest request, String username);
    ActivityResponse updateActivity(Long tripId, Long activityId, UpdateActivityRequest request, String username);
    void deleteActivity(Long tripId, Long activityId, String username);
}
