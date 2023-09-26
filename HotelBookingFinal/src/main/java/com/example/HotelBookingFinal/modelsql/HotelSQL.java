package com.example.HotelBookingFinal.modelsql;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "hotel")
public class HotelSQL {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hotelId")
    private String hotelId;
    
    @Column(name = "hotelName")
    private String hotelName;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "hotelImage")
    private String hotelImage;
    
    @Column(name = "parkingIncluded")
    private Boolean parkingIncluded;
    
    @Column(name = "rating")
    private Float rating;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<RoomSQL> rooms;
    
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
            name = "hotel_tag",
            joinColumns = @JoinColumn(name = "hotel_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<TagSQL> tag;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private AddressSQL address;

    @Column(name = "lowestPrice")
    private double lowestPrice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHotelId() {
        return hotelId;
    }

    public void setHotelId(String hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHotelImage() {
        return hotelImage;
    }

    public void setHotelImage(String hotelImage) {
        this.hotelImage = hotelImage;
    }

    public Boolean getParkingIncluded() {
        return parkingIncluded;
    }

    public void setParkingIncluded(Boolean parkingIncluded) {
        this.parkingIncluded = parkingIncluded;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public List<RoomSQL> getRooms() {
        return rooms;
    }

    public void setRooms(List<RoomSQL> rooms) {
        this.rooms = rooms;
    }

    public void addRoom(RoomSQL room) {
        if (rooms == null) {
            rooms = new ArrayList<>();
        }
        rooms.add(room);
        room.setHotel(this);
    }

    public List<TagSQL> getTags() {
        return tag;
    }

    public void setTags(List<TagSQL> tag) {
        this.tag = tag;
    }

    public AddressSQL getAddress() {
        return address;
    }

    public void setAddress(AddressSQL address) {
        this.address = address;
    }

    public double getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(double lowestPrice) {
        this.lowestPrice = lowestPrice;
    }
}
