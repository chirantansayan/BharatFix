package Compliant_System.CDAC.services;


import java.util.List;

import Compliant_System.CDAC.dto.ComplaintUpdateDTO;
import Compliant_System.CDAC.entites.ComplaintUpdate;

public interface ComplaintUpdateService {
    ComplaintUpdate addUpdate(ComplaintUpdateDTO dto);
    List<ComplaintUpdate> getUpdatesByComplaintId(Long complaintId);
}

