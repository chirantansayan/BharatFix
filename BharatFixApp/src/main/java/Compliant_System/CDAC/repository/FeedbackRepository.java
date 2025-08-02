package Compliant_System.CDAC.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.Feedback;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByComplaintId(Long complaintId);
}

