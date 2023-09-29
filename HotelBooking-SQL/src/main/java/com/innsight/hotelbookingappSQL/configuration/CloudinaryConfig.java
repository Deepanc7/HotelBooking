package com.innsight.hotelbookingappSQL.configuration;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {
	@Value("${cloudinary.cloud_name}")
	private String cloudinaryCloudName;

	@Value("${cloudinary.api_key}")
	private String cloudinaryApiKey;

	@Value("${cloudinary.api_secret}")
	private String cloudinaryApiSecret;

	@Bean
	public Cloudinary getCloudinary() {

		Map<String, String> config = new HashMap<>();
		config.put("cloud_name", cloudinaryCloudName);
		config.put("api_key", cloudinaryApiKey);
		config.put("api_secret", cloudinaryApiSecret);
		return new Cloudinary(config);
	}
}

