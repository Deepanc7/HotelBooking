package com.example.HotelBookingFinal.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.HotelBookingFinal.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {
}
