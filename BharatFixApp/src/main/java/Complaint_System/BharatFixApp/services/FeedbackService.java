package Complaint_System.BharatFixApp.services;


import java.util.List;

import Complaint_System.BharatFixApp.dto.FeedbackDTO;
import Complaint_System.BharatFixApp.entites.Feedback;
import Complaint_System.BharatFixApp.exceptions.FeedbackAlreadySubmittedException;

public interface FeedbackService {
    Feedback addFeedback(FeedbackDTO dto) throws FeedbackAlreadySubmittedException;
    List<Feedback> getFeedbacksByComplaint(Long complaintId);
}

