package com.tripnest.security.jwt;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

public class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    public void setUp() {
        jwtTokenProvider = new JwtTokenProvider();
        // A sufficiently long Base64 key for HMAC-SHA
        String testSecret = "dGhpcy1pcy1hLXNhZmV0eS1zZWNyZXQta2V5LXRvLWJlLXVzZWQtZm9yLXRlc3RpbmctcHVycG9zZXMtb25seQ==";
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecret", testSecret);
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpirationInMs", 3600000L);
    }

    @Test
    public void testPasswordResetTokenIsolation() {
        String email = "ram@example.com";
        String resetToken = jwtTokenProvider.generateResetToken(email);

        assertNotNull(resetToken);
        // Reset token must be valid for password reset
        assertTrue(jwtTokenProvider.validateResetToken(resetToken));
        assertEquals(email, jwtTokenProvider.getEmailFromResetToken(resetToken));

        // Reset token must NOT be valid as a general authentication token!
        assertFalse(jwtTokenProvider.validateToken(resetToken));
    }
}
