package com.cdac.complaint_system.BharatFix.services;


import java.util.List;

import com.cdac.complaint_system.BharatFix.dto.FeedbackDTO;
import com.cdac.complaint_system.BharatFix.entites.Feedback;
import com.cdac.complaint_system.BharatFix.exceptions.FeedbackAlreadySubmittedException;

public interface FeedbackService {
    Feedback addFeedback(FeedbackDTO dto) throws FeedbackAlreadySubmittedException;
    List<Feedback> getFeedbacksByComplaint(Long complaintId);
}

