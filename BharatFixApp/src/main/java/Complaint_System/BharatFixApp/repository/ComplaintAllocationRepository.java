package Complaint_System.BharatFixApp.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.ComplaintAllocation;

import java.util.List;

public interface ComplaintAllocationRepository extends JpaRepository<ComplaintAllocation, Long> {
    List<ComplaintAllocation> findByComplaintId(Long complaintId);
}

