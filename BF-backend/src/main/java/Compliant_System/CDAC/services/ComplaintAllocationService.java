package Compliant_System.CDAC.services;


import java.util.List;

import Compliant_System.CDAC.dto.ComplaintAllocationDTO;
import Compliant_System.CDAC.entites.ComplaintAllocation;

public interface ComplaintAllocationService {
    ComplaintAllocation allocateTeam(ComplaintAllocationDTO dto);
    List<ComplaintAllocation> getAllocationsForComplaint(Long complaintId);
}

