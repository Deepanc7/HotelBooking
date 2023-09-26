package com.example.HotelBookingFinal.repositorysql;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.HotelBookingFinal.modelsql.UserSQL;

public interface UserRepositorySQL extends JpaRepository<UserSQL, Long> {
    UserSQL findByEmail(String email);
}