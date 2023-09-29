package com.innsight.hotelbookingappSQL.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {
	
	@Autowired
	private Cloudinary cloudinary;

	public String uploadImageToCloudinary(MultipartFile file) {
		if (!file.isEmpty()) {
            try {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = (String) uploadResult.get("secure_url");
                return imageUrl;
                
            } catch (Exception e) {
                return "Upload Failed";
            }
        } else {
            return "Empty File";
        }
	}
}
