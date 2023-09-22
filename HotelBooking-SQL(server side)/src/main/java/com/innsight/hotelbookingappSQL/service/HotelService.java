package com.innsight.hotelbookingappSQL.service;

import com.innsight.hotelbookingappSQL.model.Hotel;
import com.innsight.hotelbookingappSQL.model.Room;
import com.innsight.hotelbookingappSQL.model.Tag;
import com.innsight.hotelbookingappSQL.repository.HotelRepository;
import com.innsight.hotelbookingappSQL.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public HotelService(HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }


    public List<Hotel> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();
        return hotels;
    }
    

    private double calculateLowestRoomPrice(Hotel hotel) {
        double lowestPrice = Double.MAX_VALUE;

        for (Room room : hotel.getRooms()) {
            if (room.getBaseRate() < lowestPrice) {
                lowestPrice = room.getBaseRate();
            }
        }
        return Math.round(lowestPrice);
    }


	public List<Hotel> createHotels(List<Hotel> hotels) {
		for (Hotel hotel : hotels) {			
			for (Room room : hotel.getRooms()) {
                    room.setHotel(hotel);
                }
			double lowestPrice = calculateLowestRoomPrice(hotel);
            hotel.setLowestPrice(lowestPrice);
            
            hotelRepository.save(hotel);
		}
		
		return hotelRepository.findAll();
	}
}
