package com.example.HotelBookingInnsight.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelBookingInnsight.model.Booking;
import com.example.HotelBookingInnsight.model.Hotel;
import com.example.HotelBookingInnsight.service.HotelService;

import ch.qos.logback.core.model.Model;

@CrossOrigin(origins = "*")
@RestController
public class HotelController {
    private final HotelService hotelService;

    @Autowired
    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }
    
    @GetMapping("/hotels")
    public List<Hotel> getAllHotels(Model model) {
        List<Hotel> hotels = hotelService.getAllHotels();
        return hotels;
    }
    
    @GetMapping("/hotelById/{hotel_id}")
    public Optional<Hotel> getBookingsByUserId(@PathVariable String hotel_id) {
    	return hotelService.getHotelByUserId(hotel_id);
    }

    @GetMapping("/api/hotels/search")
    public List<Hotel> searchHotels(
        @RequestParam("query") String query,
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "pageSize", defaultValue = "50") int pageSize
    ) {
        return hotelService.searchHotels(query, page, pageSize);
    }
}
