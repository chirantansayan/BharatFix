package Complaint_System.BharatFixApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import Complaint_System.BharatFixApp.dto.GuestUserDTO;
import Complaint_System.BharatFixApp.entites.GuestUser;
import Complaint_System.BharatFixApp.services.GuestUserService;

@RestController
@RequestMapping("/api/guestusers")
public class GuestUserController {

    @Autowired
    private GuestUserService guestUserService;

    // Public access: Guest user can file a complaint (no authentication required)
    @PostMapping
    public GuestUser createGuestUser(@RequestBody GuestUserDTO guestUserDTO) {
        return guestUserService.createGuestUser(guestUserDTO);
    }

    // Only admin can view guest user data by ID
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public GuestUser getGuestUserById(@PathVariable Long id) {
        return guestUserService.getGuestUserById(id);
    }
}
