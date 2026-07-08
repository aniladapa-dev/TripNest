package com.tripnest.trip.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripnest.security.config.PasswordConfig;
import com.tripnest.security.config.SecurityConfig;
import com.tripnest.security.jwt.JwtTokenProvider;
import com.tripnest.security.user.CustomUserDetailsService;
import com.tripnest.trip.dto.ActivityResponse;
import com.tripnest.trip.dto.CreateActivityRequest;
import com.tripnest.trip.dto.UpdateActivityRequest;
import com.tripnest.trip.entity.ActivityType;
import com.tripnest.trip.service.ActivityService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ActivityController.class)
@Import({SecurityConfig.class, PasswordConfig.class})
public class ActivityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ActivityService activityService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    @WithMockUser(username = "johndoe")
    public void testAddActivitySuccess() throws Exception {
        CreateActivityRequest request = new CreateActivityRequest();
        request.setTitle("Louvre Tour");
        request.setDescription("Morning tour of Louvre");
        request.setType(ActivityType.SIGHTSEEING);
        request.setActivityDate(LocalDate.of(2026, 8, 1));
        request.setStartTime(LocalTime.of(9, 0));
        request.setEndTime(LocalTime.of(12, 0));
        request.setCost(50.0);

        ActivityResponse response = ActivityResponse.builder()
                .id(200L)
                .tripId(100L)
                .title("Louvre Tour")
                .description("Morning tour of Louvre")
                .type(ActivityType.SIGHTSEEING)
                .activityDate(LocalDate.of(2026, 8, 1))
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(12, 0))
                .cost(50.0)
                .build();

        when(activityService.addActivity(eq(100L), any(CreateActivityRequest.class), eq("johndoe"))).thenReturn(response);

        mockMvc.perform(post("/api/v1/trips/100/activities")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Activity added successfully")))
                .andExpect(jsonPath("$.data.id", is(200)))
                .andExpect(jsonPath("$.data.title", is("Louvre Tour")))
                .andExpect(jsonPath("$.data.cost", is(50.0)));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testUpdateActivitySuccess() throws Exception {
        UpdateActivityRequest request = new UpdateActivityRequest();
        request.setTitle("Eiffel Dinner");
        request.setDescription("Sunset dinner");
        request.setType(ActivityType.DINING);
        request.setActivityDate(LocalDate.of(2026, 8, 1));
        request.setStartTime(LocalTime.of(18, 0));
        request.setEndTime(LocalTime.of(20, 30));
        request.setCost(120.0);

        ActivityResponse response = ActivityResponse.builder()
                .id(200L)
                .tripId(100L)
                .title("Eiffel Dinner")
                .description("Sunset dinner")
                .type(ActivityType.DINING)
                .activityDate(LocalDate.of(2026, 8, 1))
                .startTime(LocalTime.of(18, 0))
                .endTime(LocalTime.of(20, 30))
                .cost(120.0)
                .build();

        when(activityService.updateActivity(eq(100L), eq(200L), any(UpdateActivityRequest.class), eq("johndoe")))
                .thenReturn(response);

        mockMvc.perform(put("/api/v1/trips/100/activities/200")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Activity updated successfully")))
                .andExpect(jsonPath("$.data.title", is("Eiffel Dinner")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testDeleteActivitySuccess() throws Exception {
        doNothing().when(activityService).deleteActivity(100L, 200L, "johndoe");

        mockMvc.perform(delete("/api/v1/trips/100/activities/200")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Activity deleted successfully")));
    }
}
