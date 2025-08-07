package com.cdac.complaint_system.BharatFix.services;


import java.util.List;

import com.cdac.complaint_system.BharatFix.dto.UserDTO;
import com.cdac.complaint_system.BharatFix.entites.User;

public interface UserService {
    User registerUser(UserDTO userDTO);
    List<User> getAllUsers();
    User getUserById(Long id);
    User getUserByUsername(String username);
    User authenticate(String email, String password);
	void deleteUser(Long id);
    

}

