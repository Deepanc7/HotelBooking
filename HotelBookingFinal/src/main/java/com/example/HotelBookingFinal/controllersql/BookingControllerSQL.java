package com.example.HotelBookingFinal.controllersql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.HotelBookingFinal.modelsql.BookingSQL;
import com.example.HotelBookingFinal.servicesql.BookingServiceSQL;

@RestController
public class BookingControllerSQL {

    private final BookingServiceSQL bookingService;

    @Autowired 
    private UserControllerSQL userauth;
    
    @Autowired
    public BookingControllerSQL(BookingServiceSQL bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("api/bookings")
    public BookingSQL createBooking(@RequestBody BookingSQL booking) {
        return bookingService.createBooking(booking);
    }
    
    @GetMapping("/getBookings/{user_id}")
    public List<BookingSQL> getBookingsByUserId(@PathVariable String user_id,@RequestHeader(value="Authorization", defaultValue="")String auth) throws Exception {
    	userauth.verify(auth);
    	return bookingService.getBookingsByUserId(user_id);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBookingById(id);
    }
}
