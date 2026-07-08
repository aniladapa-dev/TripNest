package com.tripnest.trip.repository;

import com.tripnest.trip.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    @Query("SELECT DISTINCT t FROM Trip t " +
           "LEFT JOIN FETCH t.destination " +
           "LEFT JOIN FETCH t.owner " +
           "LEFT JOIN FETCH t.travelers " +
           "WHERE t.owner.username = :username " +
           "OR EXISTS (SELECT u FROM t.travelers u WHERE u.username = :username)")
    List<Trip> findAllByUser(@Param("username") String username);
}
