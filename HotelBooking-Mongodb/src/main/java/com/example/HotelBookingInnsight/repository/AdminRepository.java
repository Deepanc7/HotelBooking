package com.example.HotelBookingInnsight.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.HotelBookingInnsight.model.Admin;
public interface AdminRepository extends MongoRepository<Admin, ObjectId>{
	@Query(value = "{'email': ?0}", fields = "{'email': 1, 'password': 1}")
	Admin findAdmin(String email);
}
