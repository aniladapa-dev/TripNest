package com.tripnest.trip.controller;

import com.tripnest.common.dto.ApiResponse;
import com.tripnest.trip.dto.ActivityResponse;
import com.tripnest.trip.dto.CreateActivityRequest;
import com.tripnest.trip.dto.UpdateActivityRequest;
import com.tripnest.trip.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/trips/{tripId}/activities")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ActivityResponse>> addActivity(
            Authentication authentication,
            @PathVariable Long tripId,
            @Valid @RequestBody CreateActivityRequest request) {
        String username = authentication.getName();
        ActivityResponse response = activityService.addActivity(tripId, request, username);
        return ResponseEntity.ok(ApiResponse.success(response, "Activity added successfully"));
    }

    @PutMapping("/{activityId}")
    public ResponseEntity<ApiResponse<ActivityResponse>> updateActivity(
            Authentication authentication,
            @PathVariable Long tripId,
            @PathVariable Long activityId,
            @Valid @RequestBody UpdateActivityRequest request) {
        String username = authentication.getName();
        ActivityResponse response = activityService.updateActivity(tripId, activityId, request, username);
        return ResponseEntity.ok(ApiResponse.success(response, "Activity updated successfully"));
    }

    @DeleteMapping("/{activityId}")
    public ResponseEntity<ApiResponse<Void>> deleteActivity(
            Authentication authentication,
            @PathVariable Long tripId,
            @PathVariable Long activityId) {
        String username = authentication.getName();
        activityService.deleteActivity(tripId, activityId, username);
        return ResponseEntity.ok(ApiResponse.success(null, "Activity deleted successfully"));
    }
}
