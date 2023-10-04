package com.innsight.hotelbookingappSQL.model;

import java.util.ArrayList;
import java.util.List;


public class HotelSql {

    private Long id;
    private String hotelId;
    private String hotelName;
    private String description;

    private String hotelImage;

    private Boolean parkingIncluded;
    
    private Float rating;

	private Admin admin;

    public HotelSql(Long id, String hotelId, String hotelName, String description, String hotelImage,
			Boolean parkingIncluded, Float rating, Admin admin, List<Room> rooms, List<String> tag, Address address,
			double lowestPrice) {
		super();
		this.id = id;
		this.hotelId = hotelId;
		this.hotelName = hotelName;
		this.description = description;
		this.hotelImage = hotelImage;
		this.parkingIncluded = parkingIncluded;
		this.rating = rating;
		this.admin = admin;
		this.rooms = rooms;
		this.tag = tag;
		this.address = address;
		this.lowestPrice = lowestPrice;
	}

	private List<Room> rooms;
    private List<String> tag;

    private Address address;

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

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public void addRoom(Room room) {
        if (rooms == null) {
            rooms = new ArrayList<>();
        }
        rooms.add(room);
//        room.setHotel(this);
    }

    public List<String> getTags() {
        return tag;
    }

    public void setTags(List<String> tag) {
        this.tag = tag;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public double getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(double lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
}
