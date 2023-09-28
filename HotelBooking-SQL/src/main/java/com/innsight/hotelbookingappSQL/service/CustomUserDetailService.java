package com.innsight.hotelbookingappSQL.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.innsight.hotelbookingappSQL.model.Admin;
import com.innsight.hotelbookingappSQL.repository.AdminRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {
	@Autowired
	private AdminRepository adminRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Admin admin = adminRepository.findByEmail(username);
		if (admin == null) {
			throw new UsernameNotFoundException("User not found with email: " + username);
		}
		return admin;
	}
}
