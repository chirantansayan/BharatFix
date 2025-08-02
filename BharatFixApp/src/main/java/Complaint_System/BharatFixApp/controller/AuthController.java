package Complaint_System.BharatFixApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Complaint_System.BharatFixApp.dto.AuthRequestDTO;
import Complaint_System.BharatFixApp.dto.AuthResponseDTO;
import Complaint_System.BharatFixApp.entites.User;
import Complaint_System.BharatFixApp.services.UserService;
import Complaint_System.BharatFixApp.utility.JwtUtils;

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
