package com.cdac.complaint_system.BharatFix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.complaint_system.BharatFix.dto.FeedbackDTO;
import com.cdac.complaint_system.BharatFix.entites.Complaint;
import com.cdac.complaint_system.BharatFix.entites.Feedback;
import com.cdac.complaint_system.BharatFix.entites.User;
import com.cdac.complaint_system.BharatFix.exceptions.ResourceNotFoundException;
import com.cdac.complaint_system.BharatFix.repository.ComplaintRepository;
import com.cdac.complaint_system.BharatFix.repository.FeedbackRepository;
import com.cdac.complaint_system.BharatFix.repository.UserRepository;

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

