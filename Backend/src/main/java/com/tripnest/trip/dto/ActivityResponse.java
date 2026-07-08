package com.tripnest.trip.dto;

import com.tripnest.trip.entity.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityResponse {
    private Long id;
    private Long tripId;
    private String title;
    private String description;
    private ActivityType type;
    private LocalDate activityDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Double cost;
}
