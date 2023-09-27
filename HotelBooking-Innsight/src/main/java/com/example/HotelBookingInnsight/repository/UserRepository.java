package com.example.HotelBookingInnsight.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.HotelBookingInnsight.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    Optional<User> findUserByEmail(String email);
    String findUserNameByEmail(String email);
}
