package com.cdac.complaint_system.BharatFix.services;

import java.util.List;

import com.cdac.complaint_system.BharatFix.dto.ComplaintAllocationDTO;
import com.cdac.complaint_system.BharatFix.dto.ComplaintAllocationResponseDTO;

public interface ComplaintAllocationService {
    ComplaintAllocationResponseDTO allocateTeam(ComplaintAllocationDTO dto, String adminUsername);
    List<ComplaintAllocationResponseDTO> getAllocationsForComplaint(Long complaintId);
}
