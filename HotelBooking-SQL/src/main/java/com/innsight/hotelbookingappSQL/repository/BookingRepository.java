package com.innsight.hotelbookingappSQL.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.innsight.hotelbookingappSQL.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}