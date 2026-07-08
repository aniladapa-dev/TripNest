package com.tripnest.user.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @Size(max = 50, message = "First name must not exceed 50 characters")
    private String firstName;

    @Size(max = 50, message = "Last name must not exceed 50 characters")
    private String lastName;

    @Size(max = 500, message = "Travel preferences must not exceed 500 characters")
    private String travelPreferences;

    @Size(max = 500, message = "Favorite destinations must not exceed 500 characters")
    private String favoriteDestinations;
}
