package Compliant_System.CDAC.services;

import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.GuestUser;

import java.util.Optional;

public interface GuestUserRepository extends JpaRepository<GuestUser, Long> {
    Optional<GuestUser> findByIpAddress(String ipAddress);
}

