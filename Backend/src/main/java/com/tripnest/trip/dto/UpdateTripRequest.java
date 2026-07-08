package com.tripnest.trip.dto;

import com.tripnest.trip.entity.TripStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTripRequest {

    @NotBlank(message = "Title must not be blank")
    @Size(max = 100, message = "Title must not exceed 100 characters")
    private String title;

    @NotNull(message = "Destination ID must not be null")
    private Long destinationId;

    @NotNull(message = "Start date must not be null")
    private LocalDate startDate;

    @NotNull(message = "End date must not be null")
    private LocalDate endDate;

    @NotNull(message = "Budget must not be null")
    @Min(value = 0, message = "Budget must be greater than or equal to 0")
    private Double budget;

    @NotNull(message = "Status must not be null")
    private TripStatus status;
}
