package Complaint_System.BharatFixApp.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Complaint_System.BharatFixApp.dto.GuestUserDTO;
import Complaint_System.BharatFixApp.entites.GuestUser;
import Complaint_System.BharatFixApp.exceptions.ResourceNotFoundException;

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

