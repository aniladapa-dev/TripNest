package com.tripnest.trip.mapper;

import com.tripnest.trip.dto.TripResponse;
import com.tripnest.trip.entity.Trip;
import com.tripnest.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TripMapper {

    TripMapper INSTANCE = Mappers.getMapper(TripMapper.class);

    @Mapping(source = "destination.id", target = "destinationId")
    @Mapping(source = "destination.name", target = "destinationName")
    @Mapping(source = "destination.country", target = "destinationCountry")
    @Mapping(source = "owner.username", target = "ownerUsername")
    @Mapping(source = "travelers", target = "travelerUsernames")
    TripResponse toResponse(Trip trip);

    List<TripResponse> toResponseList(List<Trip> trips);

    default Set<String> mapTravelers(Set<User> travelers) {
        if (travelers == null) {
            return Collections.emptySet();
        }
        return travelers.stream()
                .map(User::getUsername)
                .collect(Collectors.toSet());
    }
}
