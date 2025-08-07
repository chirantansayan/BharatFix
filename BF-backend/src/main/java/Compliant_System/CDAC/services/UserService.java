package Compliant_System.CDAC.services;


import java.util.List;

import Compliant_System.CDAC.dto.UserDTO;
import Compliant_System.CDAC.entites.User;

public interface UserService {
    User registerUser(UserDTO userDTO);
    List<User> getAllUsers();
    User getUserById(Long id);
    User getUserByUsername(String username);
    User authenticate(String email, String password);
	void deleteUser(Long id);
    

}

