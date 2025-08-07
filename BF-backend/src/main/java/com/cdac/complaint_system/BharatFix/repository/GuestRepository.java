package com.cdac.complaint_system.BharatFix.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.complaint_system.BharatFix.entites.GuestUser;

public interface GuestRepository extends JpaRepository<GuestUser, Long> {

}
