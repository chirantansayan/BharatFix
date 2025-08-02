package Complaint_System.BharatFixApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import Complaint_System.BharatFixApp.dto.FeedbackDTO;
import Complaint_System.BharatFixApp.entites.Feedback;
import Complaint_System.BharatFixApp.services.FeedbackService;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Only USER can submit feedback
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public Feedback addFeedback(@RequestBody FeedbackDTO dto) {
        return feedbackService.addFeedback(dto);
    }

    // Only ADMIN can view feedbacks by complaint
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/complaint/{complaintId}")
    public List<Feedback> getFeedbacks(@PathVariable Long complaintId) {
        return feedbackService.getFeedbacksByComplaint(complaintId);
    }
}
