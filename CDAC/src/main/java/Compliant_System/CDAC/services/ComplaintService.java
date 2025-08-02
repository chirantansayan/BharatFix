package Compliant_System.CDAC.services;

import java.util.List;

import Compliant_System.CDAC.dto.ComplaintDTO;
import Compliant_System.CDAC.entites.Complaint;

public interface ComplaintService {
    Complaint createComplaint(ComplaintDTO dto);
    Complaint getComplaintById(Long id);
    List<Complaint> getAllComplaints();
}

