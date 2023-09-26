package com.example.HotelBookingFinal.model;

import org.springframework.data.mongodb.core.mapping.Field;

public class Room {

    @Field(name = "Description")
    private String description;

    @Field(name = "Type")
    private String type;

    @Field(name = "BaseRate")
    private Float baseRate;

    @Field(name = "RoomImage")
    private String roomImage;

    // Getters and setters for each field

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Float getBaseRate() {
        return baseRate;
    }

    public void setBaseRate(Float baseRate) {
        this.baseRate = baseRate;
    }

    public String getRoomImage() {
        return roomImage;
    }

    public void setRoomImage(String roomImage) {
        this.roomImage = roomImage;
    }
}

