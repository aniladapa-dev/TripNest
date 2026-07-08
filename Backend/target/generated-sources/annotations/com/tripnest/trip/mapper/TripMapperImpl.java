package com.tripnest.trip.mapper;

import com.tripnest.trip.dto.TripResponse;
import com.tripnest.trip.entity.Destination;
import com.tripnest.trip.entity.Trip;
import com.tripnest.user.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-07T18:46:54+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Ubuntu)"
)
@Component
public class TripMapperImpl implements TripMapper {

    @Override
    public TripResponse toResponse(Trip trip) {
        if ( trip == null ) {
            return null;
        }

        TripResponse.TripResponseBuilder tripResponse = TripResponse.builder();

        tripResponse.destinationId( tripDestinationId( trip ) );
        tripResponse.destinationName( tripDestinationName( trip ) );
        tripResponse.destinationCountry( tripDestinationCountry( trip ) );
        tripResponse.ownerUsername( tripOwnerUsername( trip ) );
        tripResponse.travelerUsernames( mapTravelers( trip.getTravelers() ) );
        tripResponse.id( trip.getId() );
        tripResponse.title( trip.getTitle() );
        tripResponse.startDate( trip.getStartDate() );
        tripResponse.endDate( trip.getEndDate() );
        tripResponse.budget( trip.getBudget() );
        tripResponse.status( trip.getStatus() );

        return tripResponse.build();
    }

    @Override
    public List<TripResponse> toResponseList(List<Trip> trips) {
        if ( trips == null ) {
            return null;
        }

        List<TripResponse> list = new ArrayList<TripResponse>( trips.size() );
        for ( Trip trip : trips ) {
            list.add( toResponse( trip ) );
        }

        return list;
    }

    private Long tripDestinationId(Trip trip) {
        if ( trip == null ) {
            return null;
        }
        Destination destination = trip.getDestination();
        if ( destination == null ) {
            return null;
        }
        Long id = destination.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String tripDestinationName(Trip trip) {
        if ( trip == null ) {
            return null;
        }
        Destination destination = trip.getDestination();
        if ( destination == null ) {
            return null;
        }
        String name = destination.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private String tripDestinationCountry(Trip trip) {
        if ( trip == null ) {
            return null;
        }
        Destination destination = trip.getDestination();
        if ( destination == null ) {
            return null;
        }
        String country = destination.getCountry();
        if ( country == null ) {
            return null;
        }
        return country;
    }

    private String tripOwnerUsername(Trip trip) {
        if ( trip == null ) {
            return null;
        }
        User owner = trip.getOwner();
        if ( owner == null ) {
            return null;
        }
        String username = owner.getUsername();
        if ( username == null ) {
            return null;
        }
        return username;
    }
}
