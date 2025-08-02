package Complaint_System.BharatFixApp.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.Feedback;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByComplaintId(Long complaintId);
}

