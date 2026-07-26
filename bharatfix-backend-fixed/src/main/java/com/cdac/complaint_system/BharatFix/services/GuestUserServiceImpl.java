package com.cdac.complaint_system.BharatFix.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.complaint_system.BharatFix.dto.GuestUserDTO;
import com.cdac.complaint_system.BharatFix.entites.GuestUser;
import com.cdac.complaint_system.BharatFix.exceptions.ResourceNotFoundException;

import java.time.LocalDateTime;

@Service
public class GuestUserServiceImpl implements GuestUserService {

    @Autowired
    private GuestUserRepository guestUserRepository;

    @Override
    public GuestUser createGuestUser(GuestUserDTO guestUserDTO) {
        GuestUser guestUser = new GuestUser();
        guestUser.setEmail(guestUserDTO.getEmail());
        guestUser.setIpAddress(guestUserDTO.getIpAddress());
        guestUser.setCreatedAt(LocalDateTime.now());
        guestUser.setHasComplained(false);
        return guestUserRepository.save(guestUser);
    }

    @Override
    public GuestUser getGuestUserById(Long id) {
        return guestUserRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("GuestUser not found with ID: " + id));
    }
}

