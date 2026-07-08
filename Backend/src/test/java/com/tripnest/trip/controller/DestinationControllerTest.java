package com.tripnest.trip.controller;

import com.tripnest.security.config.PasswordConfig;
import com.tripnest.security.config.SecurityConfig;
import com.tripnest.security.jwt.JwtTokenProvider;
import com.tripnest.security.user.CustomUserDetailsService;
import com.tripnest.trip.dto.DestinationResponse;
import com.tripnest.trip.dto.WeatherResponse;
import com.tripnest.trip.service.DestinationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = DestinationController.class)
@Import({SecurityConfig.class, PasswordConfig.class})
public class DestinationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DestinationService destinationService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    public void testGetAllDestinationsSuccess() throws Exception {
        DestinationResponse dest1 = DestinationResponse.builder()
                .id(1L)
                .name("Paris")
                .country("France")
                .popular(true)
                .build();
        DestinationResponse dest2 = DestinationResponse.builder()
                .id(2L)
                .name("Tokyo")
                .country("Japan")
                .popular(true)
                .build();

        when(destinationService.getAllDestinations(null, null)).thenReturn(List.of(dest1, dest2));

        mockMvc.perform(get("/api/v1/destinations")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", hasSize(2)))
                .andExpect(jsonPath("$.data[0].name", is("Paris")))
                .andExpect(jsonPath("$.data[1].name", is("Tokyo")));
    }

    @Test
    public void testGetDestinationByIdSuccess() throws Exception {
        DestinationResponse dest = DestinationResponse.builder()
                .id(1L)
                .name("Paris")
                .country("France")
                .description("City of love")
                .popular(true)
                .build();

        when(destinationService.getDestinationById(1L)).thenReturn(dest);

        mockMvc.perform(get("/api/v1/destinations/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.name", is("Paris")))
                .andExpect(jsonPath("$.data.country", is("France")));
    }

    @Test
    public void testGetWeatherForDestinationSuccess() throws Exception {
        WeatherResponse weather = WeatherResponse.builder()
                .temperature(25.5)
                .humidity(60)
                .condition("Sunny")
                .description("Clear skies")
                .build();

        when(destinationService.getWeatherForDestination(1L)).thenReturn(weather);

        mockMvc.perform(get("/api/v1/destinations/1/weather")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.temperature", is(25.5)))
                .andExpect(jsonPath("$.data.condition", is("Sunny")));
    }
}
