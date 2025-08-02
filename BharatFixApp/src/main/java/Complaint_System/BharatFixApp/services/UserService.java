package Complaint_System.BharatFixApp.services;


import java.util.List;

import Complaint_System.BharatFixApp.dto.UserDTO;
import Complaint_System.BharatFixApp.entites.User;

public interface UserService {
    User registerUser(UserDTO userDTO);
    List<User> getAllUsers();
    User getUserById(Long id);
    User getUserByUsername(String username);
    User authenticate(String email, String password);
	void deleteUser(Long id);
    

}

