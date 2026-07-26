package com.cdac.complaint_system.BharatFix.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.complaint_system.BharatFix.entites.GuestUser;

import java.util.Optional;

public interface GuestUserRepository extends JpaRepository<GuestUser, Long> {
    Optional<GuestUser> findByIpAddress(String ipAddress);
}

