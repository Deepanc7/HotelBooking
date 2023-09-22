package com.example.HotelBookingInnsight.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelBookingInnsight.model.Hotel;
import com.example.HotelBookingInnsight.service.HotelService;

import ch.qos.logback.core.model.Model;

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

    @GetMapping("/api/hotels/search")
    public List<Hotel> searchHotels(
        @RequestParam("query") String query,
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "pageSize", defaultValue = "50") int pageSize
    ) {
        return hotelService.searchHotels(query, page, pageSize);
    }
}
