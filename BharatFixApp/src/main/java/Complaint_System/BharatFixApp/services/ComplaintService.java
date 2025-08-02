package Complaint_System.BharatFixApp.services;

import java.util.List;

import Complaint_System.BharatFixApp.dto.ComplaintDTO;
import Complaint_System.BharatFixApp.entites.Complaint;

public interface ComplaintService {
    Complaint createComplaint(ComplaintDTO dto);
    Complaint getComplaintById(Long id);
    List<Complaint> getAllComplaints();
}

