package com.cdac.complaint_system.BharatFix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.complaint_system.BharatFix.dto.AuthRequestDTO;
import com.cdac.complaint_system.BharatFix.dto.AuthResponseDTO;
import com.cdac.complaint_system.BharatFix.entites.User;
import com.cdac.complaint_system.BharatFix.services.UserService;
import com.cdac.complaint_system.BharatFix.utility.JwtUtils;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	UserService userService;

	@PostMapping("/login")
	public AuthResponseDTO login(@RequestBody AuthRequestDTO request) {
		authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

	User user = userService.getUserByUsername(request.getUsername());
	String token = jwtUtils.generateToken(user.getUsername(), user.getRole().name());
		
		return new AuthResponseDTO(token);
	}
}
