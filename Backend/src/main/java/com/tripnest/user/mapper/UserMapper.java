package com.tripnest.user.mapper;

import com.tripnest.auth.dto.RegisterRequest;
import com.tripnest.user.dto.UpdateProfileRequest;
import com.tripnest.user.dto.UserProfileResponse;
import com.tripnest.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "preference", ignore = true)
    User registerRequestToUser(RegisterRequest registerRequest);

    @Mapping(source = "preference.travelPreferences", target = "travelPreferences")
    @Mapping(source = "preference.favoriteDestinations", target = "favoriteDestinations")
    UserProfileResponse toProfileResponse(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "username", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "preference", ignore = true)
    void updateUserFromRequest(UpdateProfileRequest request, @MappingTarget User user);
}
