package com.cdac.complaint_system.BharatFix.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.complaint_system.BharatFix.entites.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
	List<Complaint> findByUserId(Long userId);

}

