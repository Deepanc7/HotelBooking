package com.innsight.hotelbookingappSQL.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.innsight.hotelbookingappSQL.model.Hotel;
import com.innsight.hotelbookingappSQL.service.HotelService;

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
        return hotelService.getAllHotels();
    }
    
    @PostMapping("/addHotels") 
    public List<Hotel> addhotel(@RequestBody List<Hotel> hotels) {
        return hotelService.createHotels(hotels);
    }
    
    
}
