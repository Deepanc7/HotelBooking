package com.innsight.hotelbookingappSQL.repository;


import org.springframework.data.domain.Pageable;

import java.util.List;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.innsight.hotelbookingappSQL.model.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
	
	Page<Hotel> findByHotelNameContainingIgnoreCaseOrAddressStreetAddressContainingIgnoreCaseOrAddressCityContainingIgnoreCaseOrAddressStateProvinceContainingIgnoreCaseOrAddressPostalCodeContainingIgnoreCaseOrAddressCountryContainingIgnoreCase(String hotelName, String streetAddress, String city, String stateProvince, String postalCode, String country, Pageable pageable);
}