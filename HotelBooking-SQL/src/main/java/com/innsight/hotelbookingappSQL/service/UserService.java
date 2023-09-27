package com.innsight.hotelbookingappSQL.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innsight.hotelbookingappSQL.model.User;
import com.innsight.hotelbookingappSQL.repository.UserRepository;

import java.util.List;
import java.util.Optional;

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
        return userRepository.save(user);
    }

    public boolean doesEmailExist(String email) {
        return userRepository.findByEmail(email) != null;
    }
    
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }
    
    public String getUserNameByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user != null ? user.getName() : null;
    }
}
