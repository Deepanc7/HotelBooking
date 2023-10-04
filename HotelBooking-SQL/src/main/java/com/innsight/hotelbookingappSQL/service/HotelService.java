package com.innsight.hotelbookingappSQL.service;

import com.innsight.hotelbookingappSQL.model.Hotel;
import com.innsight.hotelbookingappSQL.model.Room;
import com.innsight.hotelbookingappSQL.model.Tag;
import com.innsight.hotelbookingappSQL.repository.HotelRepository;
import com.innsight.hotelbookingappSQL.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

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
	
	public Optional<Hotel> getHotelByUserId(Long hotel_id) {
		return hotelRepository.findById(hotel_id);
	}
	
	public List<Hotel> searchHotels(String query, Pageable pageable) {
	    Page<Hotel> pageResponse = hotelRepository.findByHotelNameContainingIgnoreCaseOrAddressStreetAddressContainingIgnoreCaseOrAddressCityContainingIgnoreCaseOrAddressStateProvinceContainingIgnoreCaseOrAddressPostalCodeContainingIgnoreCaseOrAddressCountryContainingIgnoreCase(query, query, query, query, query, query, pageable);
	    
	    List<Hotel> hotelList = pageResponse.getContent();

	    return hotelList;
	}
	
	
	public void deleteHotelById(Long hotelId) {
        hotelRepository.deleteById(hotelId);
    }
	
    public Hotel updateHotel(Long hotelId, Hotel updatedHotel) {
    	try {
        Optional<Hotel> existingHotel = hotelRepository.findById(hotelId);
        if (existingHotel.isPresent()) {
            Hotel hotelToUpdate = existingHotel.get();

            hotelToUpdate.setHotelName(updatedHotel.getHotelName());
            hotelToUpdate.setDescription(updatedHotel.getDescription());
            hotelToUpdate.setAddress(updatedHotel.getAddress());
            hotelToUpdate.setRating(updatedHotel.getRating());
            hotelToUpdate.setParkingIncluded(updatedHotel.getParkingIncluded());
            hotelToUpdate.setTags(updatedHotel.getTags());
            hotelToUpdate.setRooms(updatedHotel.getRooms());
            hotelToUpdate.setHotelId(updatedHotel.getHotelId());

            return hotelRepository.save(hotelToUpdate);
        }
    	}
    	catch (Exception e) {
            e.printStackTrace();
            
        }
		return null;
        
    }
}
