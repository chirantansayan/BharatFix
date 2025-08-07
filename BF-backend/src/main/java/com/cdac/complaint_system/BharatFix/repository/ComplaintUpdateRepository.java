package com.cdac.complaint_system.BharatFix.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.complaint_system.BharatFix.entites.ComplaintUpdate;

import java.util.List;

public interface ComplaintUpdateRepository extends JpaRepository<ComplaintUpdate, Long> {
    List<ComplaintUpdate> findByComplaintId(Long complaintId);
}

