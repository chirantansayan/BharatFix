package Compliant_System.CDAC.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Compliant_System.CDAC.dto.UserDTO;
import Compliant_System.CDAC.entites.User;
import Compliant_System.CDAC.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Public endpoint: Anyone can register
    @PostMapping("/register")
    public User register(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
    }

    // Admin-only: Get all users
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    // Admin or User can view user by ID
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/id/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Admin or User can view by username
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/username/{username}")
    public User getauserByUserName(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id)
    {
    	userService.deleteUser(id);
    	return ResponseEntity.ok("user with id "+id+" deleted successfully");
    }
    
}
