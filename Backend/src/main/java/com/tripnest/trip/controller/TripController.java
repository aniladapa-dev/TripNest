package com.tripnest.trip.controller;

import com.tripnest.common.dto.ApiResponse;
import com.tripnest.trip.dto.CreateTripRequest;
import com.tripnest.trip.dto.TripResponse;
import com.tripnest.trip.dto.UpdateTripRequest;
import com.tripnest.trip.dto.ShareTripRequest;
import com.tripnest.trip.dto.TripTimelineResponse;
import com.tripnest.trip.service.TripService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/trips")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TripResponse>> createTrip(
            Authentication authentication,
            @Valid @RequestBody CreateTripRequest request) {
        String username = authentication.getName();
        TripResponse response = tripService.createTrip(request, username);
        return ResponseEntity.ok(ApiResponse.success(response, "Trip created successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TripResponse>> getTripDetails(
            Authentication authentication,
            @PathVariable Long id) {
        String username = authentication.getName();
        TripResponse response = tripService.getTripDetails(id, username);
        return ResponseEntity.ok(ApiResponse.success(response, "Trip details retrieved successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TripResponse>> updateTrip(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody UpdateTripRequest request) {
        String username = authentication.getName();
        TripResponse response = tripService.updateTrip(id, request, username);
        return ResponseEntity.ok(ApiResponse.success(response, "Trip updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTrip(
            Authentication authentication,
            @PathVariable Long id) {
        String username = authentication.getName();
        tripService.deleteTrip(id, username);
        return ResponseEntity.ok(ApiResponse.success(null, "Trip deleted successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TripResponse>>> getUserTrips(Authentication authentication) {
        String username = authentication.getName();
        List<TripResponse> response = tripService.getUserTrips(username);
        return ResponseEntity.ok(ApiResponse.success(response, "User trips retrieved successfully"));
    }

    @PostMapping("/{id}/share")
    public ResponseEntity<ApiResponse<Void>> shareTrip(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody ShareTripRequest request) {
        String ownerUsername = authentication.getName();
        tripService.shareTrip(id, request, ownerUsername);
        return ResponseEntity.ok(ApiResponse.success(null, "Trip shared successfully"));
    }

    @PostMapping("/{id}/unshare")
    public ResponseEntity<ApiResponse<Void>> unshareTrip(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody ShareTripRequest request) {
        String ownerUsername = authentication.getName();
        tripService.unshareTrip(id, request, ownerUsername);
        return ResponseEntity.ok(ApiResponse.success(null, "Trip unshared successfully"));
    }

    @GetMapping("/{id}/timeline")
    public ResponseEntity<ApiResponse<TripTimelineResponse>> getTripTimeline(
            Authentication authentication,
            @PathVariable Long id) {
        String username = authentication.getName();
        TripTimelineResponse response = tripService.getTripTimeline(id, username);
        return ResponseEntity.ok(ApiResponse.success(response, "Trip timeline retrieved successfully"));
    }
}
