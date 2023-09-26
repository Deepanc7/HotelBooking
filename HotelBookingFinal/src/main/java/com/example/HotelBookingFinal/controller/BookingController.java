package com.example.HotelBookingFinal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelBookingFinal.model.Booking;
import com.example.HotelBookingFinal.service.BookingService;

//@CrossOrigin(origins = "*")
@RestController
public class BookingController {

    private final BookingService bookingService;

    @Autowired 
    private UserController userauth;
    
    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("api/bookings")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }
    
    @GetMapping("/getBookings/{user_id}")
    public List<Booking> getBookingsByUserId(@PathVariable String user_id,@RequestHeader(value="Authorization", defaultValue="")String auth) throws Exception {
    	userauth.verify(auth);
    	return bookingService.getBookingsByUserId(user_id);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteBooking(@PathVariable String id) {
        bookingService.deleteBookingById(id);
    }
}
