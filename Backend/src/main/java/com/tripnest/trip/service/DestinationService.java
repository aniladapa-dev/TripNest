package com.tripnest.trip.service;

import com.tripnest.trip.dto.DestinationResponse;
import com.tripnest.trip.dto.WeatherResponse;

import java.util.List;

public interface DestinationService {
    List<DestinationResponse> getAllDestinations(String search, Boolean popular);
    DestinationResponse getDestinationById(Long id);
    WeatherResponse getWeatherForDestination(Long id);
}
