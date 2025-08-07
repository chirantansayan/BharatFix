package com.cdac.complaint_system.BharatFix.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.complaint_system.BharatFix.entites.Complaint;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
	List<Complaint> findByUserId(Long userId);

}

