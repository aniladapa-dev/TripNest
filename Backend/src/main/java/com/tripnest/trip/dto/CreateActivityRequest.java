package com.tripnest.trip.dto;

import com.tripnest.trip.entity.ActivityType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateActivityRequest {

    @NotBlank(message = "Title must not be blank")
    @Size(max = 100, message = "Title must not exceed 100 characters")
    private String title;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotNull(message = "Activity type must not be null")
    private ActivityType type;

    @NotNull(message = "Activity date must not be null")
    private LocalDate activityDate;

    @NotNull(message = "Start time must not be null")
    private LocalTime startTime;

    @NotNull(message = "End time must not be null")
    private LocalTime endTime;

    @NotNull(message = "Cost must not be null")
    @Min(value = 0, message = "Cost must be greater than or equal to 0")
    private Double cost;
}
