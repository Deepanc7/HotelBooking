package com.example.HotelBookingFinal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.HotelBookingFinal.model.Booking;
import com.example.HotelBookingFinal.repository.BookingRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUserId(String userId) {
        List<Booking> bookings = new ArrayList<>();
        for (Booking booking : getAllBookings()) {
            if (booking.getUserId().equals(userId)) {
                bookings.add(booking);
            }
        }
        return bookings;
    }

    public void deleteBookingById(String id) {
        bookingRepository.deleteById(id);
    }

}

