package com.tripnest.trip.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripnest.security.config.PasswordConfig;
import com.tripnest.security.config.SecurityConfig;
import com.tripnest.security.jwt.JwtTokenProvider;
import com.tripnest.security.user.CustomUserDetailsService;
import com.tripnest.trip.dto.CreateTripRequest;
import com.tripnest.trip.dto.TripResponse;
import com.tripnest.trip.dto.UpdateTripRequest;
import com.tripnest.trip.dto.ShareTripRequest;
import com.tripnest.trip.dto.TripTimelineResponse;
import com.tripnest.trip.dto.TimelineDayResponse;
import com.tripnest.trip.entity.TripStatus;
import com.tripnest.trip.service.TripService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = TripController.class)
@Import({SecurityConfig.class, PasswordConfig.class})
public class TripControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TripService tripService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    @WithMockUser(username = "johndoe")
    public void testCreateTripSuccess() throws Exception {
        CreateTripRequest request = new CreateTripRequest();
        request.setTitle("Summer in Paris");
        request.setDestinationId(1L);
        request.setStartDate(LocalDate.of(2026, 8, 1));
        request.setEndDate(LocalDate.of(2026, 8, 15));
        request.setBudget(2500.0);

        TripResponse response = TripResponse.builder()
                .id(100L)
                .title("Summer in Paris")
                .destinationId(1L)
                .destinationName("Paris")
                .destinationCountry("France")
                .startDate(LocalDate.of(2026, 8, 1))
                .endDate(LocalDate.of(2026, 8, 15))
                .budget(2500.0)
                .status(TripStatus.PLANNED)
                .ownerUsername("johndoe")
                .travelerUsernames(Set.of("johndoe"))
                .build();

        when(tripService.createTrip(any(CreateTripRequest.class), eq("johndoe"))).thenReturn(response);

        mockMvc.perform(post("/api/v1/trips")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Trip created successfully")))
                .andExpect(jsonPath("$.data.id", is(100)))
                .andExpect(jsonPath("$.data.title", is("Summer in Paris")))
                .andExpect(jsonPath("$.data.destinationName", is("Paris")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testGetTripDetailsSuccess() throws Exception {
        TripResponse response = TripResponse.builder()
                .id(100L)
                .title("Summer in Paris")
                .destinationId(1L)
                .destinationName("Paris")
                .destinationCountry("France")
                .startDate(LocalDate.of(2026, 8, 1))
                .endDate(LocalDate.of(2026, 8, 15))
                .budget(2500.0)
                .status(TripStatus.PLANNED)
                .ownerUsername("johndoe")
                .travelerUsernames(Set.of("johndoe"))
                .build();

        when(tripService.getTripDetails(100L, "johndoe")).thenReturn(response);

        mockMvc.perform(get("/api/v1/trips/100")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Trip details retrieved successfully")))
                .andExpect(jsonPath("$.data.title", is("Summer in Paris")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testUpdateTripSuccess() throws Exception {
        UpdateTripRequest request = new UpdateTripRequest();
        request.setTitle("Paris Autumn");
        request.setDestinationId(1L);
        request.setStartDate(LocalDate.of(2026, 9, 1));
        request.setEndDate(LocalDate.of(2026, 9, 15));
        request.setBudget(3000.0);
        request.setStatus(TripStatus.ACTIVE);

        TripResponse response = TripResponse.builder()
                .id(100L)
                .title("Paris Autumn")
                .destinationId(1L)
                .destinationName("Paris")
                .destinationCountry("France")
                .startDate(LocalDate.of(2026, 9, 1))
                .endDate(LocalDate.of(2026, 9, 15))
                .budget(3000.0)
                .status(TripStatus.ACTIVE)
                .ownerUsername("johndoe")
                .travelerUsernames(Set.of("johndoe"))
                .build();

        when(tripService.updateTrip(eq(100L), any(UpdateTripRequest.class), eq("johndoe"))).thenReturn(response);

        mockMvc.perform(put("/api/v1/trips/100")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Trip updated successfully")))
                .andExpect(jsonPath("$.data.title", is("Paris Autumn")))
                .andExpect(jsonPath("$.data.status", is("ACTIVE")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testDeleteTripSuccess() throws Exception {
        doNothing().when(tripService).deleteTrip(100L, "johndoe");

        mockMvc.perform(delete("/api/v1/trips/100")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Trip deleted successfully")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testGetUserTripsSuccess() throws Exception {
        TripResponse trip = TripResponse.builder()
                .id(100L)
                .title("Summer in Paris")
                .destinationName("Paris")
                .ownerUsername("johndoe")
                .build();

        when(tripService.getUserTrips("johndoe")).thenReturn(List.of(trip));

        mockMvc.perform(get("/api/v1/trips")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].title", is("Summer in Paris")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testShareTripSuccess() throws Exception {
        ShareTripRequest request = new ShareTripRequest();
        request.setUsernameOrEmail("traveler_bob");

        doNothing().when(tripService).shareTrip(eq(100L), any(ShareTripRequest.class), eq("johndoe"));

        mockMvc.perform(post("/api/v1/trips/100/share")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Trip shared successfully")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testUnshareTripSuccess() throws Exception {
        ShareTripRequest request = new ShareTripRequest();
        request.setUsernameOrEmail("traveler_bob");

        doNothing().when(tripService).unshareTrip(eq(100L), any(ShareTripRequest.class), eq("johndoe"));

        mockMvc.perform(post("/api/v1/trips/100/unshare")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Trip unshared successfully")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testGetTripTimelineSuccess() throws Exception {
        TimelineDayResponse day1 = TimelineDayResponse.builder()
                .dayNumber(1)
                .date(LocalDate.of(2026, 8, 1))
                .build();
        TimelineDayResponse day2 = TimelineDayResponse.builder()
                .dayNumber(2)
                .date(LocalDate.of(2026, 8, 2))
                .build();

        TripTimelineResponse response = TripTimelineResponse.builder()
                .tripId(100L)
                .title("Summer in Paris")
                .startDate(LocalDate.of(2026, 8, 1))
                .endDate(LocalDate.of(2026, 8, 2))
                .days(List.of(day1, day2))
                .build();

        when(tripService.getTripTimeline(100L, "johndoe")).thenReturn(response);

        mockMvc.perform(get("/api/v1/trips/100/timeline")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Trip timeline retrieved successfully")))
                .andExpect(jsonPath("$.data.days", hasSize(2)))
                .andExpect(jsonPath("$.data.days[0].dayNumber", is(1)))
                .andExpect(jsonPath("$.data.days[1].dayNumber", is(2)));
    }
}
