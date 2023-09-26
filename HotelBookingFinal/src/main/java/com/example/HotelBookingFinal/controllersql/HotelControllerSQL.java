package com.example.HotelBookingFinal.controllersql;

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

import com.example.HotelBookingFinal.modelsql.HotelSQL;
import com.example.HotelBookingFinal.servicesql.HotelServiceSQL;

import ch.qos.logback.core.model.Model;

@RestController
public class HotelControllerSQL {
    private final HotelServiceSQL hotelService;

    @Autowired
    public HotelControllerSQL(HotelServiceSQL hotelService) {
        this.hotelService = hotelService;
    }
    
    @GetMapping("/hotels")
    public List<HotelSQL> getAllHotels(Model model) {
        return hotelService.getAllHotels();
    }
    
    @PostMapping("/addHotels") 
    public List<HotelSQL> addhotels(@RequestBody List<HotelSQL> hotels) {
        return hotelService.createHotels(hotels);
    }
    
    @GetMapping("/hotelById/{hotel_id}")
    public Optional<HotelSQL> getBookingsByUserId(@PathVariable Long hotel_id) {
    	return hotelService.getHotelByUserId(hotel_id);
    }
    
    @GetMapping("/api/hotels/search")
    public List<HotelSQL> searchHotels(
            @RequestParam("query") String query,
            Pageable pageable
    ) {
        return hotelService.searchHotels(query.trim(), pageable);
    }
    
    
}
