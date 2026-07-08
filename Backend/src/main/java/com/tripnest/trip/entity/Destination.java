package com.tripnest.trip.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "destinations", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String country;

    @Column(length = 1000)
    private String description;

    @Column(length = 500)
    private String attractions;

    @Column(nullable = false)
    private boolean popular;
}
