package com.example.HotelBookingInnsight.controller;

import org.mindrot.jbcrypt.BCrypt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.HotelBookingInnsight.model.User;
import com.example.HotelBookingInnsight.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.crypto.SecretKey;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	private static final String SECRET_KEY_STRING = "Hotel-Booking-Website-Innsight-SecretKey";
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());
	
	@PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody User user) {
        if (userService.doesEmailExist(user.getEmail())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }
        String salt = BCrypt.gensalt();

        user.setPassword(BCrypt.hashpw(user.getPassword(), salt));


        User newUser = userService.createUser(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }


	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest,
			HttpServletResponse response) {
		String email = loginRequest.get("email");
		String password = loginRequest.get("password");

		if (authenticateUser(email, password)) {
			String jwtToken = generateJwtToken(email);

			Map<String, String> responseBody = new HashMap<>();
			responseBody.put("message", "Set cookie");
			responseBody.put("jwt", jwtToken);
			return ResponseEntity.ok().body(responseBody);
		} else {
			Map<String, String> responseBody = new HashMap<>();
			responseBody.put("message", "Authentication failed");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
		}
	}

	private boolean authenticateUser(String email, String password) {
		List<User> users = userService.getAllUsers();
		for (int i = 0; i < users.size(); i++) {
			if (users.get(i).getEmail().equals(email)) {
				boolean passwordMatch = BCrypt.checkpw(password, users.get(i).getPassword());
				if (passwordMatch) {
					return true;
				}
			}
		}
		return false;
	}

	private String generateJwtToken(String email) {
		return Jwts.builder().setSubject(email).signWith(SECRET_KEY, SignatureAlgorithm.HS256).compact();
	}
	
	@PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request, HttpServletResponse response) {
        String jwtToken = extractJwtTokenFromHeader(request);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Logout successful");
        return ResponseEntity.ok(responseBody);
    }

    private String extractJwtTokenFromHeader(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Extract the token without the "Bearer " prefix
        }
        return null;
    }

    public void verify(String authorization) throws Exception {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(authorization);
        } catch (Exception e) {
            e.printStackTrace();  // Print the stack trace for debugging
            throw new Exception("JWT verification failed: " + e.getMessage());
        }
    }
	
	@GetMapping("/by-email/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		Optional<User> userOptional = userService.getUserByEmail(email);
		return userOptional.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

    @GetMapping("/getUser")
    public ResponseEntity<User> getUserEmail(HttpServletRequest request, HttpServletResponse response) {
    	String jwtToken = extractJwtTokenFromHeader(request);
    	if(jwtToken==null) {
    		jwtToken="";
    	}
        String email = decodeJwtAndGetEmail(jwtToken);
        Optional<User> user=userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    private String decodeJwtAndGetEmail(String jwtToken) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(jwtToken).getBody();
        return claims.getSubject();
    }
    
    
}
