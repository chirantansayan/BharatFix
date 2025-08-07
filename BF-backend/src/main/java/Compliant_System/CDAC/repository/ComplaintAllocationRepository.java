package Compliant_System.CDAC.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.ComplaintAllocation;

import java.util.List;

public interface ComplaintAllocationRepository extends JpaRepository<ComplaintAllocation, Long> {
    List<ComplaintAllocation> findByComplaintId(Long complaintId);
}

