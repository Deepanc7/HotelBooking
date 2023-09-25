package com.example.HotelBookingInnsight.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelBookingInnsight.model.Booking;
import com.example.HotelBookingInnsight.service.BookingService;

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
    
    @GetMapping("/getBookings/{email}")
    public List<Booking> getBookingsByEmail(@PathVariable String email,@RequestHeader(value="Authorization", defaultValue="")String auth) throws Exception {
    	userauth.verify(auth);
    	return bookingService.getBookingsByEmail(email);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteBooking(@PathVariable String id) {
        bookingService.deleteBookingById(id);
    }
}
