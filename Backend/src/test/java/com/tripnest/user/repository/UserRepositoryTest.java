package com.tripnest.user.repository;

import com.tripnest.user.entity.Role;
import com.tripnest.user.entity.User;
import com.tripnest.user.entity.UserPreference;
import com.tripnest.user.entity.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void testCreateAndFindUserWithRolesAndPreferences() {
        // 1. Seed Roles
        Role travelerRole = roleRepository.save(Role.builder().name(UserRole.TRAVELER).build());
        Role adminRole = roleRepository.save(Role.builder().name(UserRole.ADMINISTRATOR).build());

        // 2. Create User preference
        UserPreference preference = UserPreference.builder()
                .travelPreferences("budget,nature")
                .favoriteDestinations("Kyoto,Rome")
                .build();

        // 3. Create User
        User user = User.builder()
                .username("john_doe")
                .email("john@example.com")
                .password("hashed_password_123")
                .firstName("John")
                .lastName("Doe")
                .roles(Set.of(travelerRole))
                .build();

        user.setPreference(preference); // Set bidirectional mapping

        // Save User
        User savedUser = userRepository.save(user);
        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getPreference().getId()).isNotNull();

        // 4. Retrieve User
        Optional<User> foundUserOpt = userRepository.findByUsername("john_doe");
        assertThat(foundUserOpt).isPresent();

        User foundUser = foundUserOpt.get();
        assertThat(foundUser.getEmail()).isEqualTo("john@example.com");
        assertThat(foundUser.getFirstName()).isEqualTo("John");
        assertThat(foundUser.getRoles()).hasSize(1);
        assertThat(foundUser.getRoles().iterator().next().getName()).isEqualTo(UserRole.TRAVELER);

        // Verify Preferences
        assertThat(foundUser.getPreference()).isNotNull();
        assertThat(foundUser.getPreference().getTravelPreferences()).isEqualTo("budget,nature");
        assertThat(foundUser.getPreference().getFavoriteDestinations()).isEqualTo("Kyoto,Rome");

        // Verify exists check
        assertThat(userRepository.existsByUsername("john_doe")).isTrue();
        assertThat(userRepository.existsByEmail("john@example.com")).isTrue();
        assertThat(userRepository.existsByUsername("nonexistent")).isFalse();
    }
}
