package com.tripnest.trip.service;

import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.trip.dto.DestinationResponse;
import com.tripnest.trip.dto.WeatherResponse;
import com.tripnest.trip.entity.Destination;
import com.tripnest.trip.mapper.DestinationMapper;
import com.tripnest.trip.repository.DestinationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class DestinationServiceImpl implements DestinationService {

    private final DestinationRepository destinationRepository;
    private final DestinationMapper destinationMapper;

    public DestinationServiceImpl(DestinationRepository destinationRepository, DestinationMapper destinationMapper) {
        this.destinationRepository = destinationRepository;
        this.destinationMapper = destinationMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DestinationResponse> getAllDestinations(String search, Boolean popular) {
        List<Destination> destinations;

        if (popular != null && popular) {
            destinations = destinationRepository.findByPopularTrue();
        } else if (StringUtils.hasText(search)) {
            destinations = destinationRepository.findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(search, search);
        } else {
            destinations = destinationRepository.findAll();
        }

        return destinationMapper.toResponseList(destinations);
    }

    @Override
    @Transactional(readOnly = true)
    public DestinationResponse getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with ID: " + id));
        return destinationMapper.toResponse(destination);
    }

    @Override
    @Transactional(readOnly = true)
    public WeatherResponse getWeatherForDestination(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found with ID: " + id));

        // Deterministic mock weather calculations based on location ID
        double temp = 20.0 + (id % 7);
        int humidity = 40 + (int)(id % 45);
        String condition = (id % 2 == 1) ? "Sunny" : "Cloudy";
        String desc = (id % 2 == 1) ? "Clear skies with light breeze" : "Overcast skies with mild wind";

        return WeatherResponse.builder()
                .temperature(temp)
                .humidity(humidity)
                .condition(condition)
                .description(desc)
                .build();
    }
}
