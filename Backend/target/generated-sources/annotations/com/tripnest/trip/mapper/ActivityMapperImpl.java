package com.tripnest.trip.mapper;

import com.tripnest.trip.dto.ActivityResponse;
import com.tripnest.trip.entity.Activity;
import com.tripnest.trip.entity.Trip;
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
public class ActivityMapperImpl implements ActivityMapper {

    @Override
    public ActivityResponse toResponse(Activity activity) {
        if ( activity == null ) {
            return null;
        }

        ActivityResponse.ActivityResponseBuilder activityResponse = ActivityResponse.builder();

        activityResponse.tripId( activityTripId( activity ) );
        activityResponse.id( activity.getId() );
        activityResponse.title( activity.getTitle() );
        activityResponse.description( activity.getDescription() );
        activityResponse.type( activity.getType() );
        activityResponse.activityDate( activity.getActivityDate() );
        activityResponse.startTime( activity.getStartTime() );
        activityResponse.endTime( activity.getEndTime() );
        activityResponse.cost( activity.getCost() );

        return activityResponse.build();
    }

    @Override
    public List<ActivityResponse> toResponseList(List<Activity> activities) {
        if ( activities == null ) {
            return null;
        }

        List<ActivityResponse> list = new ArrayList<ActivityResponse>( activities.size() );
        for ( Activity activity : activities ) {
            list.add( toResponse( activity ) );
        }

        return list;
    }

    private Long activityTripId(Activity activity) {
        if ( activity == null ) {
            return null;
        }
        Trip trip = activity.getTrip();
        if ( trip == null ) {
            return null;
        }
        Long id = trip.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
