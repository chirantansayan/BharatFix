package com.cdac.complaint_system.BharatFix.services;

import java.util.List;

import com.cdac.complaint_system.BharatFix.dto.ComplaintDTO;
import com.cdac.complaint_system.BharatFix.entites.Complaint;

public interface ComplaintService {
    Complaint createComplaint(ComplaintDTO dto);
    List<Complaint> getComplaintsByUid(Long id);
    List<Complaint> getAllComplaints();
    String getProtectedResource();
}

