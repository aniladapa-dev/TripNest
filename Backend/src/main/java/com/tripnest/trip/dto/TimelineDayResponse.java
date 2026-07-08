package com.tripnest.trip.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimelineDayResponse {
    private Integer dayNumber;
    private LocalDate date;
    
    @Builder.Default
    private List<ActivityResponse> activities = new ArrayList<>();
}
