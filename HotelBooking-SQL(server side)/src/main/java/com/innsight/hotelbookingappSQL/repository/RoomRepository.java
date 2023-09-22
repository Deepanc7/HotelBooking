package com.innsight.hotelbookingappSQL.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.innsight.hotelbookingappSQL.model.Hotel;
import com.innsight.hotelbookingappSQL.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

	List<Room> findByHotel(Hotel hotel);
}