package com.example.HotelBookingFinal.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.HotelBookingFinal.model.Hotel;


@Repository
public interface HotelRepository extends MongoRepository<Hotel, String> {
    // Define custom query methods for searching here
    Page<Hotel> findAllBy(TextCriteria criteria, Pageable pageable);
}
