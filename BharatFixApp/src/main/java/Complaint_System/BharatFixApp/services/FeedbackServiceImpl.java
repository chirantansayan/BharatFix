package Complaint_System.BharatFixApp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Complaint_System.BharatFixApp.dto.FeedbackDTO;
import Complaint_System.BharatFixApp.entites.Complaint;
import Complaint_System.BharatFixApp.entites.Feedback;
import Complaint_System.BharatFixApp.entites.User;
import Complaint_System.BharatFixApp.exceptions.ResourceNotFoundException;
import Complaint_System.BharatFixApp.repository.ComplaintRepository;
import Complaint_System.BharatFixApp.repository.FeedbackRepository;
import Complaint_System.BharatFixApp.repository.UserRepository;

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

