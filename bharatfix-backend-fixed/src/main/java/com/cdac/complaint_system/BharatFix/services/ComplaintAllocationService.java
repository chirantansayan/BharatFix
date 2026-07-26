package com.cdac.complaint_system.BharatFix.services;

import java.util.List;

import com.cdac.complaint_system.BharatFix.dto.ComplaintAllocationDTO;
import com.cdac.complaint_system.BharatFix.entites.ComplaintAllocation;

public interface ComplaintAllocationService {
    ComplaintAllocation allocateTeam(ComplaintAllocationDTO dto);
    List<ComplaintAllocation> getAllocationsForComplaint(Long complaintId);
}

