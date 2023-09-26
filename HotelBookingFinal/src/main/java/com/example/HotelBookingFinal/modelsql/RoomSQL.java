package com.example.HotelBookingFinal.modelsql;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "room")
public class RoomSQL {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private HotelSQL hotel;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    private String type;

    @Column(name = "baseRate")
    private Float baseRate;

    @Column(name = "roomImage")
    private String roomImage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public HotelSQL getHotel() {
        return hotel;
    }

    public void setHotel(HotelSQL hotel) {
        this.hotel = hotel;
    }

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
