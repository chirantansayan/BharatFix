package Complaint_System.BharatFixApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.ComplaintUpdate;

import java.util.List;

public interface ComplaintUpdateRepository extends JpaRepository<ComplaintUpdate, Long> {
    List<ComplaintUpdate> findByComplaintId(Long complaintId);
}

