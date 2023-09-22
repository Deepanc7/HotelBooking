package com.example.HotelBookingInnsight.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.HotelBookingInnsight.model.Booking;
import com.example.HotelBookingInnsight.repository.BookingRepository;

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

    public List<Booking> getBookingsByEmail(String email) {
        List<Booking> bookings = new ArrayList<>();
        for (Booking booking : getAllBookings()) {
            if (booking.getUserEmail().equals(email)) {
                bookings.add(booking);
            }
        }
        return bookings;
    }

    public void deleteBookingById(String id) {
        bookingRepository.deleteById(id);
    }

}

