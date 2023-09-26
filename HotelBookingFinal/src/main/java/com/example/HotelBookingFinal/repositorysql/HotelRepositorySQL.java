package com.example.HotelBookingFinal.repositorysql;


import org.springframework.data.domain.Pageable;

import java.util.List;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HotelBookingFinal.modelsql.HotelSQL;


@Repository
public interface HotelRepositorySQL extends JpaRepository<HotelSQL, Long> {
	
	Page<HotelSQL> findByHotelNameContainingIgnoreCaseOrAddressStreetAddressContainingIgnoreCaseOrAddressCityContainingIgnoreCaseOrAddressStateProvinceContainingIgnoreCaseOrAddressPostalCodeContainingIgnoreCaseOrAddressCountryContainingIgnoreCase(String hotelName, String streetAddress, String city, String stateProvince, String postalCode, String country, Pageable pageable);
}