package Compliant_System.CDAC.services;


import java.util.List;

import Compliant_System.CDAC.dto.FeedbackDTO;
import Compliant_System.CDAC.entites.Feedback;
import Compliant_System.CDAC.exceptions.FeedbackAlreadySubmittedException;

public interface FeedbackService {
    Feedback addFeedback(FeedbackDTO dto) throws FeedbackAlreadySubmittedException;
    List<Feedback> getFeedbacksByComplaint(Long complaintId);
}

