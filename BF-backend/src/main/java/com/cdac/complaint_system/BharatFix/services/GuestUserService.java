package com.cdac.complaint_system.BharatFix.services;

import com.cdac.complaint_system.BharatFix.dto.GuestUserDTO;
import com.cdac.complaint_system.BharatFix.entites.GuestUser;

public interface GuestUserService {
    GuestUser createGuestUser(GuestUserDTO guestUserDTO);
    GuestUser getGuestUserById(Long id);
}

