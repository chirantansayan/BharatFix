package com.cdac.complaint_system.BharatFix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.complaint_system.BharatFix.entites.ComplaintUpdate;

import java.util.List;

@Repository
public interface ComplaintUpdateRepository extends JpaRepository<ComplaintUpdate, Long> {
    List<ComplaintUpdate> findByComplaintId(Long complaintId);
}

