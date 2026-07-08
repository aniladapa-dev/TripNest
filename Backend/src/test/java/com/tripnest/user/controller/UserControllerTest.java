package com.tripnest.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripnest.security.config.PasswordConfig;
import com.tripnest.security.config.SecurityConfig;
import com.tripnest.security.jwt.JwtTokenProvider;
import com.tripnest.security.user.CustomUserDetailsService;
import com.tripnest.user.dto.UpdateProfileRequest;
import com.tripnest.user.dto.UserProfileResponse;
import com.tripnest.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
@Import({SecurityConfig.class, PasswordConfig.class})
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    @WithMockUser(username = "johndoe")
    public void testGetUserProfileSuccess() throws Exception {
        UserProfileResponse profileResponse = UserProfileResponse.builder()
                .id(1L)
                .username("johndoe")
                .email("john@example.com")
                .firstName("John")
                .lastName("Doe")
                .travelPreferences("budget")
                .favoriteDestinations("Rome")
                .build();

        when(userService.getUserProfile("johndoe")).thenReturn(profileResponse);

        mockMvc.perform(get("/api/v1/users/profile")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Profile retrieved successfully")))
                .andExpect(jsonPath("$.data.username", is("johndoe")))
                .andExpect(jsonPath("$.data.email", is("john@example.com")))
                .andExpect(jsonPath("$.data.firstName", is("John")))
                .andExpect(jsonPath("$.data.travelPreferences", is("budget")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testUpdateUserProfileSuccess() throws Exception {
        UpdateProfileRequest request = new UpdateProfileRequest();
        request.setFirstName("Johnny");
        request.setLastName("Doe");
        request.setTravelPreferences("adventure");
        request.setFavoriteDestinations("Tokyo");

        UserProfileResponse updatedProfile = UserProfileResponse.builder()
                .id(1L)
                .username("johndoe")
                .email("john@example.com")
                .firstName("Johnny")
                .lastName("Doe")
                .travelPreferences("adventure")
                .favoriteDestinations("Tokyo")
                .build();

        when(userService.updateUserProfile(eq("johndoe"), any(UpdateProfileRequest.class)))
                .thenReturn(updatedProfile);

        mockMvc.perform(put("/api/v1/users/profile")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Profile updated successfully")))
                .andExpect(jsonPath("$.data.firstName", is("Johnny")))
                .andExpect(jsonPath("$.data.travelPreferences", is("adventure")))
                .andExpect(jsonPath("$.data.favoriteDestinations", is("Tokyo")));
    }

    @Test
    @WithMockUser(username = "johndoe")
    public void testGetTravelHistorySuccess() throws Exception {
        mockMvc.perform(get("/api/v1/users/profile/history")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Travel history retrieved successfully")))
                .andExpect(jsonPath("$.data", hasSize(0)));
    }
}
