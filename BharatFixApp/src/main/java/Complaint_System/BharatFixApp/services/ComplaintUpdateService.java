package Complaint_System.BharatFixApp.services;


import java.util.List;

import Complaint_System.BharatFixApp.dto.ComplaintUpdateDTO;
import Complaint_System.BharatFixApp.entites.ComplaintUpdate;

public interface ComplaintUpdateService {
    ComplaintUpdate addUpdate(ComplaintUpdateDTO dto);
    List<ComplaintUpdate> getUpdatesByComplaintId(Long complaintId);
}

