package com.tripnest.trip.mapper;

import com.tripnest.trip.dto.DestinationResponse;
import com.tripnest.trip.entity.Destination;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DestinationMapper {

    DestinationMapper INSTANCE = Mappers.getMapper(DestinationMapper.class);

    DestinationResponse toResponse(Destination destination);

    List<DestinationResponse> toResponseList(List<Destination> destinations);
}
