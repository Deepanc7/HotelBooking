package com.example.HotelBookingFinal.servicesql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.HotelBookingFinal.modelsql.UserSQL;
import com.example.HotelBookingFinal.repositorysql.UserRepositorySQL;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceSQL {

    private final UserRepositorySQL userRepository;

    @Autowired
    public UserServiceSQL(UserRepositorySQL userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<UserSQL> getAllUsers() {
        return userRepository.findAll();
    }

    public UserSQL createUser(UserSQL user) {
        return userRepository.save(user);
    }

    public boolean doesEmailExist(String email) {
        return userRepository.findByEmail(email) != null;
    }
    
    public Optional<UserSQL> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }
    
    public String getUserNameByEmail(String email) {
        UserSQL user = userRepository.findByEmail(email);
        return user != null ? user.getName() : null;
    }
}
