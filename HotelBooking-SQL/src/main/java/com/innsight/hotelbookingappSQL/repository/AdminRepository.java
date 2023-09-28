package com.innsight.hotelbookingappSQL.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.innsight.hotelbookingappSQL.model.Admin;
public interface AdminRepository extends JpaRepository<Admin, Integer>{
	Admin findByEmail(String email);
}
