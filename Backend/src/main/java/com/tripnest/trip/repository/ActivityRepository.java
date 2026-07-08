package com.tripnest.trip.repository;

import com.tripnest.trip.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByTripId(Long tripId);

    List<Activity> findByTripIdOrderByActivityDateAscStartTimeAsc(Long tripId);
}
