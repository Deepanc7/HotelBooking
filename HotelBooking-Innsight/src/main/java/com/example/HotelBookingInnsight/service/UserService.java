package com.example.HotelBookingInnsight.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.HotelBookingInnsight.model.User;
import com.example.HotelBookingInnsight.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> getAllUsers() {
    	return userRepository.findAll();
    }

    public User createUser(User user) {
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }

    public boolean doesEmailExist(String email) {
        return userRepository.findByEmail(email) != null;
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }
    
    public String getUserNameByEmail(String email) {
        return userRepository.findUserNameByEmail(email);
    }
    
}
