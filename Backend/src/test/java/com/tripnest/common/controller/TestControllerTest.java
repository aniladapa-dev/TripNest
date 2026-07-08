package com.tripnest.common.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripnest.common.dto.TestDto;
import com.tripnest.security.config.PasswordConfig;
import com.tripnest.security.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.boot.test.mock.mockito.MockBean;
import com.tripnest.security.jwt.JwtAuthenticationFilter;
import com.tripnest.security.jwt.JwtTokenProvider;
import com.tripnest.security.user.CustomUserDetailsService;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = TestController.class)
@Import({SecurityConfig.class, PasswordConfig.class})
public class TestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    @WithMockUser
    public void testSuccessEndpoint() throws Exception {
        mockMvc.perform(get("/api/v1/test/success")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("Operation completed successfully")))
                .andExpect(jsonPath("$.data", is("Successfully accessed test endpoint")));
    }

    @Test
    @WithMockUser
    public void testNotFoundEndpoint() throws Exception {
        mockMvc.perform(get("/api/v1/test/error/not-found")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Test Resource Not Found")))
                .andExpect(jsonPath("$.timestamp", notNullValue()));
    }

    @Test
    @WithMockUser
    public void testBadRequestEndpoint() throws Exception {
        mockMvc.perform(get("/api/v1/test/error/bad-request")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Test Bad Request message")));
    }

    @Test
    @WithMockUser
    public void testUnauthorizedEndpoint() throws Exception {
        mockMvc.perform(get("/api/v1/test/error/unauthorized")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Test Unauthorized message")));
    }

    @Test
    @WithMockUser
    public void testInternalErrorEndpoint() throws Exception {
        mockMvc.perform(get("/api/v1/test/error/internal")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("An unexpected error occurred. Please try again later.")));
    }

    @Test
    @WithMockUser
    public void testValidationFailure() throws Exception {
        TestDto invalidDto = new TestDto();
        invalidDto.setName(""); // Invalid
        invalidDto.setAge(17);  // Invalid

        mockMvc.perform(post("/api/v1/test/validation")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Validation failed")))
                .andExpect(jsonPath("$.errors.name", is("Name must not be blank")))
                .andExpect(jsonPath("$.errors.age", is("Age must be at least 18")));
    }
}
