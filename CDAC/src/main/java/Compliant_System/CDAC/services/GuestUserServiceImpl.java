package Compliant_System.CDAC.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Compliant_System.CDAC.dto.GuestUserDTO;
import Compliant_System.CDAC.entites.GuestUser;
import Compliant_System.CDAC.exceptions.ResourceNotFoundException;

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

