package com.innsight.hotelbookingappSQL.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innsight.hotelbookingappSQL.model.Hotel;
import com.innsight.hotelbookingappSQL.service.HotelService;

import ch.qos.logback.core.model.Model;

@RestController
@CrossOrigin(origins = "http://localhost:5000")
public class HotelController {
    private final HotelService hotelService;

    @Autowired
    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }
    
    @GetMapping("/hotels")
    public List<Hotel> getAllHotels(Model model) {
        return hotelService.getAllHotels();
    }
    
    @PostMapping("/addHotels") 
    public List<Hotel> addhotels(@RequestBody List<Hotel> hotels) {
        return hotelService.createHotels(hotels);
    }
    
    @GetMapping("/hotelById/{hotel_id}")
    public Optional<Hotel> getBookingsByUserId(@PathVariable Long hotel_id) {
    	return hotelService.getHotelByUserId(hotel_id);
    }
    
    @GetMapping("/api/hotels/search")
    public List<Hotel> searchHotels(
            @RequestParam("query") String query,
            Pageable pageable
    ) {
        return hotelService.searchHotels(query.trim(), pageable);
    }
    
    
}
