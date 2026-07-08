package com.tripnest.common.controller;

import com.tripnest.common.dto.ApiResponse;
import com.tripnest.common.dto.TestDto;
import com.tripnest.exception.BadRequestException;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.exception.UnauthorizedException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {

    @GetMapping("/success")
    public ResponseEntity<ApiResponse<String>> testSuccess() {
        return ResponseEntity.ok(ApiResponse.success("Successfully accessed test endpoint"));
    }

    @GetMapping("/error/not-found")
    public ResponseEntity<ApiResponse<Void>> testNotFound() {
        throw new ResourceNotFoundException("Test Resource Not Found");
    }

    @GetMapping("/error/bad-request")
    public ResponseEntity<ApiResponse<Void>> testBadRequest() {
        throw new BadRequestException("Test Bad Request message");
    }

    @GetMapping("/error/unauthorized")
    public ResponseEntity<ApiResponse<Void>> testUnauthorized() {
        throw new UnauthorizedException("Test Unauthorized message");
    }

    @GetMapping("/error/internal")
    public ResponseEntity<ApiResponse<Void>> testInternalError() {
        throw new RuntimeException("Unexpected test runtime error");
    }

    @PostMapping("/validation")
    public ResponseEntity<ApiResponse<TestDto>> testValidation(@Valid @RequestBody TestDto testDto) {
        return ResponseEntity.ok(ApiResponse.success(testDto, "Test DTO validated successfully"));
    }
}
