package com.tripnest.config;

import com.tripnest.trip.entity.Destination;
import com.tripnest.trip.repository.DestinationRepository;
import com.tripnest.user.entity.Role;
import com.tripnest.user.entity.UserRole;
import com.tripnest.user.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final DestinationRepository destinationRepository;

    public DatabaseSeeder(RoleRepository roleRepository, DestinationRepository destinationRepository) {
        this.roleRepository = roleRepository;
        this.destinationRepository = destinationRepository;
    }

    @Override
    public void run(String... args) {
        log.info("Checking database role tables initialization status...");
        Arrays.stream(UserRole.values()).forEach(roleName -> {
            if (roleRepository.findByName(roleName).isEmpty()) {
                log.info("Seeding system role: {}", roleName);
                roleRepository.save(Role.builder().name(roleName).build());
            }
        });
        log.info("Role table check complete.");

        log.info("Checking database destination tables initialization status...");
        if (destinationRepository.count() == 0) {
            log.info("Seeding system destinations...");
            List<Destination> destinations = List.of(
                    Destination.builder().name("Paris").country("France").description("The city of lights and love").attractions("Eiffel Tower, Louvre Museum").popular(true).build(),
                    Destination.builder().name("Tokyo").country("Japan").description("Ultramodern neon-lit city").attractions("Shibuya Crossing, Mount Fuji, Senso-ji Temple").popular(true).build(),
                    Destination.builder().name("Rome").country("Italy").description("Historical center of the Roman Empire").attractions("Colosseum, Vatican Museums").popular(true).build(),
                    Destination.builder().name("Bali").country("Indonesia").description("Tropical paradise beaches and temples").attractions("Ubud Monkey Forest, Tanah Lot").popular(false).build(),
                    Destination.builder().name("New York").country("USA").description("The Big Apple and Times Square").attractions("Statue of Liberty, Central Park").popular(false).build()
            );
            destinationRepository.saveAll(destinations);
            log.info("Destination table seeding complete.");
        } else {
            log.info("Destination table already initialized.");
        }
    }
}
