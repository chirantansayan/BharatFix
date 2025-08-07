package com.cdac.complaint_system.BharatFix.services;


import java.util.List;

import com.cdac.complaint_system.BharatFix.dto.ComplaintUpdateDTO;
import com.cdac.complaint_system.BharatFix.entites.ComplaintUpdate;

public interface ComplaintUpdateService {
    ComplaintUpdate addUpdate(ComplaintUpdateDTO dto);
    List<ComplaintUpdate> getUpdatesByComplaintId(Long complaintId);
}

