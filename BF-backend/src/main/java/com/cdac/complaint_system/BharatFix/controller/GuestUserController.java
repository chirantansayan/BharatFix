package com.cdac.complaint_system.BharatFix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.complaint_system.BharatFix.dto.GuestUserDTO;
import com.cdac.complaint_system.BharatFix.entites.GuestUser;
import com.cdac.complaint_system.BharatFix.services.GuestUserService;

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
