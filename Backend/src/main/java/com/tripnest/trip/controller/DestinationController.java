package com.tripnest.trip.controller;

import com.tripnest.common.dto.ApiResponse;
import com.tripnest.trip.dto.DestinationResponse;
import com.tripnest.trip.dto.WeatherResponse;
import com.tripnest.trip.service.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/destinations")
public class DestinationController {

    private final DestinationService destinationService;

    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DestinationResponse>>> getAllDestinations(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean popular) {
        List<DestinationResponse> destinations = destinationService.getAllDestinations(search, popular);
        return ResponseEntity.ok(ApiResponse.success(destinations, "Destinations retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DestinationResponse>> getDestinationById(@PathVariable Long id) {
        DestinationResponse destination = destinationService.getDestinationById(id);
        return ResponseEntity.ok(ApiResponse.success(destination, "Destination details retrieved successfully"));
    }

    @GetMapping("/{id}/weather")
    public ResponseEntity<ApiResponse<WeatherResponse>> getWeatherForDestination(@PathVariable Long id) {
        WeatherResponse weather = destinationService.getWeatherForDestination(id);
        return ResponseEntity.ok(ApiResponse.success(weather, "Weather details retrieved successfully"));
    }
}
