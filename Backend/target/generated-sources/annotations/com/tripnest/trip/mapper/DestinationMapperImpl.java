package com.tripnest.trip.mapper;

import com.tripnest.trip.dto.DestinationResponse;
import com.tripnest.trip.entity.Destination;
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
public class DestinationMapperImpl implements DestinationMapper {

    @Override
    public DestinationResponse toResponse(Destination destination) {
        if ( destination == null ) {
            return null;
        }

        DestinationResponse.DestinationResponseBuilder destinationResponse = DestinationResponse.builder();

        destinationResponse.id( destination.getId() );
        destinationResponse.name( destination.getName() );
        destinationResponse.country( destination.getCountry() );
        destinationResponse.description( destination.getDescription() );
        destinationResponse.attractions( destination.getAttractions() );
        destinationResponse.popular( destination.isPopular() );

        return destinationResponse.build();
    }

    @Override
    public List<DestinationResponse> toResponseList(List<Destination> destinations) {
        if ( destinations == null ) {
            return null;
        }

        List<DestinationResponse> list = new ArrayList<DestinationResponse>( destinations.size() );
        for ( Destination destination : destinations ) {
            list.add( toResponse( destination ) );
        }

        return list;
    }
}
