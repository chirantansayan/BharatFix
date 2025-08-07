package com.cdac.complaint_system.BharatFix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.complaint_system.BharatFix.dto.UserDTO;
import com.cdac.complaint_system.BharatFix.entites.User;
import com.cdac.complaint_system.BharatFix.enums.Role;
import com.cdac.complaint_system.BharatFix.enums.UserStatus;
import com.cdac.complaint_system.BharatFix.exceptions.ResourceNotFoundException;
import com.cdac.complaint_system.BharatFix.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public User registerUser(UserDTO userDTO) {
		User user = new User();
		user.setUsername(userDTO.getUsername());
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		user.setEmail(userDTO.getEmail());
		user.setRole(Role.USER);
		user.setStatus(UserStatus.ACTIVE);
		user.setCreatedAt(LocalDateTime.now());
		return userRepository.save(user);
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUserById(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found by Id: " + id));
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
	}
	@Override
	public User authenticate(String email, String password) {
		User user = userRepository.findByEmail(email);
		if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
			throw new ResourceNotFoundException("Invalid email or password");
		}
		return user;
	}
	public void deleteUser(Long id)
	{
		userRepository.deleteById(id);
	}

}
