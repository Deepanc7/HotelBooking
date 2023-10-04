package com.innsight.hotelbookingappSQL.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

import com.innsight.hotelbookingappSQL.model.Hotel;
import com.innsight.hotelbookingappSQL.model.HotelSql;
import com.innsight.hotelbookingappSQL.model.Room;
import com.innsight.hotelbookingappSQL.model.Tag;
import com.innsight.hotelbookingappSQL.repository.HotelRepository;
import com.innsight.hotelbookingappSQL.repository.RoomRepository;
import com.innsight.hotelbookingappSQL.service.CloudinaryService;
import com.innsight.hotelbookingappSQL.service.HotelService;

@RestController
@CrossOrigin(origins = "*")
public class AdminHotelController {
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Autowired
	private HotelRepository hotelRepository;

	@Autowired
	private HotelService hotelService;
	
	@Autowired
	private RoomRepository roomRepository;
	
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
	        Hotel savedHotel = hotelRepository.save(hotel);
	        for (Room room : hotel.getRooms()) {
	            room.setHotel(hotel);
	            roomRepository.save(room);
	        }

	        return ResponseEntity.ok("Hotel and room data added successfully");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error adding hotel and room data: " + e.getMessage());
	    }
	}
	
	@GetMapping("/hotels/{hotelId}")
	public HotelSql getHotel(@PathVariable Long hotelId) {
	    Optional<Hotel> hotelOptional = hotelRepository.findById(hotelId);

	    if (hotelOptional.isPresent()) {
	        Hotel hotel = hotelOptional.get();
	        List<String> tagNames = hotel.getTags()
	                .stream()
	                .map(Tag::getName)
	                .collect(Collectors.toList());

	        HotelSql hotelSql = new HotelSql(
	        	    hotel.getId(),
	        	    hotel.getHotelId(),
	        	    hotel.getHotelName(),
	        	    hotel.getDescription(),
	        	    hotel.getHotelImage(),
	        	    hotel.getParkingIncluded(),
	        	    hotel.getRating(),
	        	    hotel.getAdmin(),
	        	    hotel.getRooms(),
	        	    tagNames,
	        	    hotel.getAddress(),
	        	    hotel.getLowestPrice()
	        	);

	        return hotelSql;
	    }
	    return null;
	}


	@PutMapping("/hotels/{hotelId}")
	public ResponseEntity<String> updateHotel(@PathVariable Long hotelId, @RequestBody Hotel updatedHotel) {
		hotelService.updateHotel(hotelId, updatedHotel);
		return ResponseEntity.ok("Hotel updated successfully");
	}

	@DeleteMapping("/hotels/{hotelId}")
	public ResponseEntity<String> deleteHotel(@PathVariable Long hotelId) {
		try {
			hotelService.deleteHotelById(hotelId);
			return ResponseEntity.ok("Hotel deleted successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting hotel: " + e.getMessage());
		}
	}
}
