package com.cdac.complaint_system.BharatFix.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.complaint_system.BharatFix.entites.Feedback;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByComplaintId(Long complaintId);
}

