package com.example.HotelBookingFinal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

//@ComponentScan(basePackages = {                                              //for mongodb
//        "com.example.HotelBookingFinal.controller",
//        "com.example.HotelBookingFinal.service",
//        "com.example.HotelBookingFinal.model",
//        "com.example.HotelBookingFinal.repository"
//})
@ComponentScan(basePackages = {                                              //for sql
        "com.example.HotelBookingFinal.controllersql",
        "com.example.HotelBookingFinal.servicesql",
        "com.example.HotelBookingFinal.modelsql",
        "com.example.HotelBookingFinal.repositorysql"
})
@SpringBootApplication
public class HotelBookingFinalApplication {

    public static void main(String[] args) {
        SpringApplication.run(HotelBookingFinalApplication.class, args);
    }

}
