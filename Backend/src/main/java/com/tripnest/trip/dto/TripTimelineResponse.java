package com.tripnest.trip.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripTimelineResponse {
    private Long tripId;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<TimelineDayResponse> days;
}
