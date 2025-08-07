package Compliant_System.CDAC.services;

import Compliant_System.CDAC.dto.GuestUserDTO;
import Compliant_System.CDAC.entites.GuestUser;

public interface GuestUserService {
    GuestUser createGuestUser(GuestUserDTO guestUserDTO);
    GuestUser getGuestUserById(Long id);
}

