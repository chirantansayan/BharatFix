package Complaint_System.BharatFixApp.services;


import java.util.List;

import Complaint_System.BharatFixApp.dto.ComplaintAllocationDTO;
import Complaint_System.BharatFixApp.entites.ComplaintAllocation;

public interface ComplaintAllocationService {
    ComplaintAllocation allocateTeam(ComplaintAllocationDTO dto);
    List<ComplaintAllocation> getAllocationsForComplaint(Long complaintId);
}

