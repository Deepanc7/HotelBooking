package com.example.HotelBookingFinal.model;

import org.springframework.data.mongodb.core.mapping.Field;

public class Address {

    @Field(name = "StreetAddress")
    private String streetAddress;

    @Field(name = "City")
    private String city;

    @Field(name = "StateProvince")
    private String stateProvince;

    @Field(name = "PostalCode")
    private String postalCode;

    @Field(name = "Country")
    private String country;

    // Getters and setters for each field

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}