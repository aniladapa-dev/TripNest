package com.tripnest.trip.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ShareTripRequest {

    @NotBlank(message = "Username or email must not be blank")
    private String usernameOrEmail;
}
