package Compliant_System.CDAC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.GuestUser;

public interface GuestRepository extends JpaRepository<GuestUser, Long> {

}
