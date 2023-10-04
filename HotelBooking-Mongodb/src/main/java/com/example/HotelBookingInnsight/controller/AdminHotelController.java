package com.example.HotelBookingInnsight.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.HotelBookingInnsight.model.Hotel;
import com.example.HotelBookingInnsight.repository.HotelRepository;
import com.example.HotelBookingInnsight.service.CloudinaryService;
import com.example.HotelBookingInnsight.service.HotelService;

@RestController
@CrossOrigin(origins = "http://localhost:5000")
public class AdminHotelController {

	@Autowired
	private CloudinaryService cloudinaryService;

	@Autowired
	private HotelRepository hotelRepository;

	@Autowired
	private HotelService hotelService;

	@PostMapping("/hotels/addHotel")
	public String uploadImage(@RequestParam("file") MultipartFile file) {
		String uploadedImgUrl = cloudinaryService.uploadImageToCloudinary(file);
		if (!uploadedImgUrl.equals("Upload Failed") && !uploadedImgUrl.equals("Empty File")) {
			System.out.println("uploadeddd imagggge" + uploadedImgUrl);
			return uploadedImgUrl;
		}
		return null;
	}

	@GetMapping("/getAllHotel")
	public List<Hotel> getAllHotels() {
		return hotelService.getAllHotels();
	}

	@PostMapping("/addhotel")
	public ResponseEntity<String> addHotel(@RequestBody Hotel hotel) {

		try {
			hotelRepository.save(hotel);
			return ResponseEntity.ok("Hotel added successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error adding hotel: " + e.getMessage());
		}
	}

	@GetMapping("/hotels/{hotelId}")
	public Optional<Hotel> getHotel(@PathVariable String hotelId) {
		System.out.println("hotellll" + hotelId);
		System.out.println("75 " + hotelRepository.findById(hotelId));
		return hotelRepository.findById(hotelId);
	}

	@PutMapping("/hotels/{hotelId}")
	public ResponseEntity<String> updateHotel(@PathVariable String hotelId, @RequestBody Hotel updatedHotel) {
		hotelService.updateHotel(hotelId, updatedHotel);
		return ResponseEntity.ok("Hotel updated successfully");
	}

	@DeleteMapping("/hotels/{hotelId}")
	public ResponseEntity<String> deleteHotel(@PathVariable String hotelId) {
		try {
			hotelService.deleteHotelById(hotelId);
			return ResponseEntity.ok("Hotel deleted successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting hotel: " + e.getMessage());
		}
	}

}
