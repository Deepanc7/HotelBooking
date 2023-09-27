package com.example.HotelBookingInnsight.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.HotelBookingInnsight.security.JwtHelperCls;
import com.example.HotelBookingInnsight.entity.JwtRequest;
import com.example.HotelBookingInnsight.entity.JwtResponse;

@RestController
@CrossOrigin(origins = "*")
public class AdminController {
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtHelperCls helper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/admin/logIn")
	public ResponseEntity<JwtResponse> adminLogin(@RequestBody JwtRequest request) {
		System.out.println(request.getEmail()+' '+request.getPassword());
		System.out.println(passwordEncoder.encode(request.getPassword()));
		this.doAuthenticate(request.getEmail(), request.getPassword());
		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		String token = this.helper.generateToken(userDetails.getUsername());
		JwtResponse response = new JwtResponse();
		response.setJwttoken(token);
		response.setEmail(userDetails.getUsername());
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	private void doAuthenticate(String email, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		try {
			manager.authenticate(authentication);
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}
	}

	@ExceptionHandler(BadCredentialsException.class)
	public String exceptionHandler() {
		return "Credentials Invalid !!";
	}
}
