package com.example.HotelBookingInnsight.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.HotelBookingInnsight.model.Admin;
import com.example.HotelBookingInnsight.repository.AdminRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {
	@Autowired
	private AdminRepository adminRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Admin admin = adminRepository.findAdmin(username);
		if (admin == null) {
			throw new UsernameNotFoundException("User not found with email: " + username);
		}
		return admin;
	}

}