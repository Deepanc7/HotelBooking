package com.innsight.hotelbookingappSQL.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.innsight.hotelbookingappSQL.service.CloudinaryService;

@RestController
@CrossOrigin(origins = "*")
public class AdminHotelController {
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@PostMapping("/hotels/addHotel")
	public void uploadImage(@RequestParam("file") MultipartFile file) {
	    String uploadedImgUrl = cloudinaryService.uploadImageToCloudinary(file);
	    if(!uploadedImgUrl.equals("Upload Failed") && !uploadedImgUrl.equals("Empty File")) {
	    	System.out.println(uploadedImgUrl);
	    }
	}

}
