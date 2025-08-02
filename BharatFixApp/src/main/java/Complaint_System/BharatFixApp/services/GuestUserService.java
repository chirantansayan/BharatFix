package Complaint_System.BharatFixApp.services;

import Complaint_System.BharatFixApp.dto.GuestUserDTO;
import Complaint_System.BharatFixApp.entites.GuestUser;

public interface GuestUserService {
    GuestUser createGuestUser(GuestUserDTO guestUserDTO);
    GuestUser getGuestUserById(Long id);
}

