package com.example.HotelBookingFinal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;

import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "hotels")
public class Hotel {

    @Id
    private String id;

    @Field(targetType = FieldType.STRING)
    private String HotelId;

    @TextIndexed 
    @Field(targetType = FieldType.STRING, name = "HotelName")
    private String HotelName;

    @Field(targetType = FieldType.STRING)
    private String Description;

    @Field(targetType = FieldType.STRING)
    private String HotelImage;

    @Field(targetType = FieldType.STRING)
    private List<String> Tags;

    @Field(targetType = FieldType.BOOLEAN)
    private Boolean ParkingIncluded;

    @Field(targetType = FieldType.DOUBLE)
    private Float Rating;

    @Field(targetType = FieldType.STRING)
    private Address Address;

    @Field(targetType = FieldType.STRING)
    private List<Room> Rooms;
    // Getters and setters for each field
    
    @Field(targetType = FieldType.STRING)
    private double LowestPrice;
    
    public void setLowestPrice(double LowestPrice) {
    	this.LowestPrice=LowestPrice;
    }
    
    public double getLowestPrice() {
    	return this.LowestPrice;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHotelId() {
        return HotelId;
    }

    public void setHotelId(String hotelId) {
        HotelId = hotelId;
    }

    public String getHotelName() {
        return HotelName;
    }

    public void setHotelName(String hotelName) {
        HotelName = hotelName;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getHotelImage() {
        return HotelImage;
    }

    public void setHotelImage(String hotelImage) {
        HotelImage = hotelImage;
    }

    public List<String> getTags() {
        return Tags;
    }

    public void setTags(List<String> tags) {
        Tags = tags;
    }

    public Boolean getParkingIncluded() {
        return ParkingIncluded;
    }

    public void setParkingIncluded(Boolean parkingIncluded) {
        ParkingIncluded = parkingIncluded;
    }

    public Float getRating() {
        return Rating;
    }

    public void setRating(Float rating) {
        Rating = rating;
    }

    public Address getAddress() {
        return Address;
    }

    public void setAddress(Address address) {
        Address = address;
    }

    public List<Room> getRooms() {
        return Rooms;
    }

    public void setRooms(List<Room> rooms) {
        Rooms = rooms;
    }
}


