package Complaint_System.BharatFixApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.GuestUser;

public interface GuestRepository extends JpaRepository<GuestUser, Long> {

}
