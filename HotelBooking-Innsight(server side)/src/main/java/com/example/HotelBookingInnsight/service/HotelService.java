package com.example.HotelBookingInnsight.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.HotelBookingInnsight.model.Hotel;
import com.example.HotelBookingInnsight.model.Room;
import com.example.HotelBookingInnsight.repository.HotelRepository;

import java.text.DecimalFormat;
import java.util.List;

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
        // Create a query to search on multiple fields using regex
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

        // Use the query to perform the search
        searchQuery.with(PageRequest.of(page, pageSize));
        return mongoTemplate.find(searchQuery, Hotel.class);
    }
}



