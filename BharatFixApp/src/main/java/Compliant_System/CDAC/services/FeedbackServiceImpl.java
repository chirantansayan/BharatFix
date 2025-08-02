package Compliant_System.CDAC.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Compliant_System.CDAC.dto.FeedbackDTO;
import Compliant_System.CDAC.entites.Complaint;
import Compliant_System.CDAC.entites.Feedback;
import Compliant_System.CDAC.entites.User;
import Compliant_System.CDAC.exceptions.ResourceNotFoundException;
import Compliant_System.CDAC.repository.ComplaintRepository;
import Compliant_System.CDAC.repository.FeedbackRepository;
import Compliant_System.CDAC.repository.UserRepository;
import ch.qos.logback.core.joran.conditional.IfAction;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;
    
    
    @Override
    public Feedback addFeedback(FeedbackDTO dto) {
        Complaint complaint = complaintRepository.findById(dto.getComplaintId())
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Feedback feedback = new Feedback();
        feedback.setComplaint(complaint);
        feedback.setUser(user);
        feedback.setRating(dto.getRating());
        feedback.setComment(dto.getComment());
        feedback.setCreatedAt(LocalDateTime.now());

        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getFeedbacksByComplaint(Long complaintId) {
        return feedbackRepository.findByComplaintId(complaintId);
    }
}

