package com.example.HotelBookingFinal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.HotelBookingFinal.model.Hotel;
import com.example.HotelBookingFinal.model.Room;
import com.example.HotelBookingFinal.repository.HotelRepository;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;

@Service
public class HotelService {
    private final HotelRepository hotelRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public HotelService(HotelRepository hotelRepository, MongoTemplate mongoTemplate) {
        this.hotelRepository = hotelRepository;
        this.mongoTemplate = mongoTemplate;
    }
    
    public List<Hotel> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findAll();

        for (Hotel hotel : hotels) {
            double lowestPrice = calculateLowestRoomPrice(hotel);
            hotel.setLowestPrice(lowestPrice);
        }

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

    public List<Hotel> searchHotels(String query, int page, int pageSize) {
        Query searchQuery = new Query();
        Criteria criteria = new Criteria();
        criteria.orOperator(
            Criteria.where("Address.StreetAddress").regex(query, "i"),
            Criteria.where("Address.City").regex(query, "i"),
            Criteria.where("Address.StateProvince").regex(query, "i"),
            Criteria.where("Address.PostalCode").regex(query, "i"),
            Criteria.where("Address.Country").regex(query, "i"),
            Criteria.where("HotelName").regex(query, "i")
        );
        searchQuery.addCriteria(criteria);
        
        searchQuery.with(PageRequest.of(page, pageSize));
        return mongoTemplate.find(searchQuery, Hotel.class);
    }

	public Optional<Hotel> getHotelByUserId(String hotel_id) {
		return hotelRepository.findById(hotel_id);
	}
}



