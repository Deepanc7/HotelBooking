package com.example.HotelBookingInnsight.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.HotelBookingInnsight.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {
}
