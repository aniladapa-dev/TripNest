package com.tripnest.common.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TestDto {

    @NotBlank(message = "Name must not be blank")
    private String name;

    @Min(value = 18, message = "Age must be at least 18")
    private int age;
}
