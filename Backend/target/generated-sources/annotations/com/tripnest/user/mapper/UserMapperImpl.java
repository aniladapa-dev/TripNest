package com.tripnest.user.mapper;

import com.tripnest.auth.dto.RegisterRequest;
import com.tripnest.user.dto.UpdateProfileRequest;
import com.tripnest.user.dto.UserProfileResponse;
import com.tripnest.user.entity.User;
import com.tripnest.user.entity.UserPreference;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-07T18:46:54+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Ubuntu)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User registerRequestToUser(RegisterRequest registerRequest) {
        if ( registerRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.username( registerRequest.getUsername() );
        user.email( registerRequest.getEmail() );
        user.password( registerRequest.getPassword() );
        user.firstName( registerRequest.getFirstName() );
        user.lastName( registerRequest.getLastName() );

        return user.build();
    }

    @Override
    public UserProfileResponse toProfileResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserProfileResponse.UserProfileResponseBuilder userProfileResponse = UserProfileResponse.builder();

        userProfileResponse.travelPreferences( userPreferenceTravelPreferences( user ) );
        userProfileResponse.favoriteDestinations( userPreferenceFavoriteDestinations( user ) );
        userProfileResponse.id( user.getId() );
        userProfileResponse.username( user.getUsername() );
        userProfileResponse.email( user.getEmail() );
        userProfileResponse.firstName( user.getFirstName() );
        userProfileResponse.lastName( user.getLastName() );

        return userProfileResponse.build();
    }

    @Override
    public void updateUserFromRequest(UpdateProfileRequest request, User user) {
        if ( request == null ) {
            return;
        }

        user.setFirstName( request.getFirstName() );
        user.setLastName( request.getLastName() );
    }

    private String userPreferenceTravelPreferences(User user) {
        if ( user == null ) {
            return null;
        }
        UserPreference preference = user.getPreference();
        if ( preference == null ) {
            return null;
        }
        String travelPreferences = preference.getTravelPreferences();
        if ( travelPreferences == null ) {
            return null;
        }
        return travelPreferences;
    }

    private String userPreferenceFavoriteDestinations(User user) {
        if ( user == null ) {
            return null;
        }
        UserPreference preference = user.getPreference();
        if ( preference == null ) {
            return null;
        }
        String favoriteDestinations = preference.getFavoriteDestinations();
        if ( favoriteDestinations == null ) {
            return null;
        }
        return favoriteDestinations;
    }
}
