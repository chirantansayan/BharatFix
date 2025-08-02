package Complaint_System.BharatFixApp.services;

import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.GuestUser;

import java.util.Optional;

public interface GuestUserRepository extends JpaRepository<GuestUser, Long> {
    Optional<GuestUser> findByIpAddress(String ipAddress);
}

