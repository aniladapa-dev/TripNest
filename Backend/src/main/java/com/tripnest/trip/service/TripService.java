package com.tripnest.trip.service;

import com.tripnest.trip.dto.CreateTripRequest;
import com.tripnest.trip.dto.TripResponse;
import com.tripnest.trip.dto.UpdateTripRequest;

import com.tripnest.trip.dto.ShareTripRequest;
import com.tripnest.trip.dto.TripTimelineResponse;

import java.util.List;

public interface TripService {
    TripResponse createTrip(CreateTripRequest request, String ownerUsername);
    TripResponse updateTrip(Long id, UpdateTripRequest request, String username);
    void deleteTrip(Long id, String username);
    TripResponse getTripDetails(Long id, String username);
    List<TripResponse> getUserTrips(String username);
    void shareTrip(Long id, ShareTripRequest request, String ownerUsername);
    void unshareTrip(Long id, ShareTripRequest request, String ownerUsername);
    TripTimelineResponse getTripTimeline(Long id, String username);
}
