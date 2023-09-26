package com.example.HotelBookingFinal.servicesql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.HotelBookingFinal.modelsql.BookingSQL;
import com.example.HotelBookingFinal.repositorysql.BookingRepositorySQL;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceSQL {

    private final BookingRepositorySQL bookingRepository;

    @Autowired
    public BookingServiceSQL(BookingRepositorySQL bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public BookingSQL createBooking(BookingSQL booking) {
        return bookingRepository.save(booking);
    }

    public List<BookingSQL> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<BookingSQL> getBookingsByUserId(String userId) {
        List<BookingSQL> bookings = new ArrayList<>();
        for (BookingSQL booking : getAllBookings()) {
            if (booking.getUserId().equals(userId)) {
                bookings.add(booking);
            }
        }
        return bookings;
    }

    public void deleteBookingById(Long id) {
        bookingRepository.deleteById(id);
    }

}

