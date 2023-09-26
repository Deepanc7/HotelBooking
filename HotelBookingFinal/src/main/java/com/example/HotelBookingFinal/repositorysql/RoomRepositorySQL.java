package com.example.HotelBookingFinal.repositorysql;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.HotelBookingFinal.modelsql.HotelSQL;
import com.example.HotelBookingFinal.modelsql.RoomSQL;


public interface RoomRepositorySQL extends JpaRepository<RoomSQL, Long> {

	List<RoomSQL> findByHotel(HotelSQL hotel);
}