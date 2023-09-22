package com.innsight.hotelbookingappSQL.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.innsight.hotelbookingappSQL.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
}