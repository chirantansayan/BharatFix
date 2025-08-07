package com.cdac.complaint_system.BharatFix.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.complaint_system.BharatFix.entites.ComplaintAllocation;

import java.util.List;

@Repository
public interface ComplaintAllocationRepository extends JpaRepository<ComplaintAllocation, Long> {
    List<ComplaintAllocation> findByComplaintId(Long complaintId);
}

