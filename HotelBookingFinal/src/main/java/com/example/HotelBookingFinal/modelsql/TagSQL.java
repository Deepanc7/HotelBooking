package com.example.HotelBookingFinal.modelsql;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tag")
public class TagSQL {

	@Id
	@JsonIgnore
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@JsonIgnore
	@ManyToMany(mappedBy = "tag")
    private List<HotelSQL> hotel;

    @Column(name = "name")
    private String name;
    
    public TagSQL() {
    }

    // Constructor with fields
    public TagSQL(String name) {
        this.name = name;
    }

    @JsonIgnore
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    @JsonIgnore
    public List<HotelSQL> getHotels() {
        return hotel;
    }

    public void setHotels(List<HotelSQL> hotel) {
        this.hotel = hotel;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}

