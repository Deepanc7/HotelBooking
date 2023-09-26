package com.example.HotelBookingFinal.servicesql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.HotelBookingFinal.modelsql.HotelSQL;
import com.example.HotelBookingFinal.modelsql.RoomSQL;
import com.example.HotelBookingFinal.repositorysql.HotelRepositorySQL;
import com.example.HotelBookingFinal.repositorysql.RoomRepositorySQL;

import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class HotelServiceSQL {

    private final HotelRepositorySQL hotelRepository;
    private final RoomRepositorySQL roomRepository;

    @Autowired
    public HotelServiceSQL(HotelRepositorySQL hotelRepository, RoomRepositorySQL roomRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }


    public List<HotelSQL> getAllHotels() {
        List<HotelSQL> hotels = hotelRepository.findAll();
        return hotels;
    }
    

    private double calculateLowestRoomPrice(HotelSQL hotel) {
        double lowestPrice = Double.MAX_VALUE;

        for (RoomSQL room : hotel.getRooms()) {
            if (room.getBaseRate() < lowestPrice) {
                lowestPrice = room.getBaseRate();
            }
        }
        return Math.round(lowestPrice);
    }


	public List<HotelSQL> createHotels(List<HotelSQL> hotels) {
		for (HotelSQL hotel : hotels) {			
			for (RoomSQL room : hotel.getRooms()) {
                    room.setHotel(hotel);
                }
			double lowestPrice = calculateLowestRoomPrice(hotel);
            hotel.setLowestPrice(lowestPrice);
            
            hotelRepository.save(hotel);
		}
		
		return hotelRepository.findAll();
	}
	
	public Optional<HotelSQL> getHotelByUserId(Long hotel_id) {
		return hotelRepository.findById(hotel_id);
	}
	
	public List<HotelSQL> searchHotels(String query, Pageable pageable) {
	    Page<HotelSQL> pageResponse = hotelRepository.findByHotelNameContainingIgnoreCaseOrAddressStreetAddressContainingIgnoreCaseOrAddressCityContainingIgnoreCaseOrAddressStateProvinceContainingIgnoreCaseOrAddressPostalCodeContainingIgnoreCaseOrAddressCountryContainingIgnoreCase(query, query, query, query, query, query, pageable);
	    
	    List<HotelSQL> hotelList = pageResponse.getContent();

	    return hotelList;
	}
}
