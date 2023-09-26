package com.example.HotelBookingFinal.repositorysql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HotelBookingFinal.modelsql.BookingSQL;

@Repository
public interface BookingRepositorySQL extends JpaRepository<BookingSQL, Long> {
}