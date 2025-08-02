package Compliant_System.CDAC.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Compliant_System.CDAC.dto.ComplaintUpdateDTO;
import Compliant_System.CDAC.entites.Complaint;
import Compliant_System.CDAC.entites.ComplaintUpdate;
import Compliant_System.CDAC.entites.User;
import Compliant_System.CDAC.exceptions.ResourceNotFoundException;
import Compliant_System.CDAC.repository.ComplaintRepository;
import Compliant_System.CDAC.repository.ComplaintUpdateRepository;
import Compliant_System.CDAC.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintUpdateServiceImpl implements ComplaintUpdateService {

    @Autowired
    private ComplaintUpdateRepository updateRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ComplaintUpdate addUpdate(ComplaintUpdateDTO dto) {
        Complaint complaint = complaintRepository.findById(dto.getComplaintId())
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        User updatedBy = userRepository.findById(dto.getUpdatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        ComplaintUpdate update = new ComplaintUpdate();
        update.setComplaint(complaint);
        update.setUpdatedBy(updatedBy);
        update.setStatus(dto.getStatus());
        update.setMessage(dto.getMessage());
        update.setUpdatedAt(LocalDateTime.now());

        return updateRepository.save(update);
    }

    @Override
    public List<ComplaintUpdate> getUpdatesByComplaintId(Long complaintId) {
        return updateRepository.findByComplaintId(complaintId);
    }
}

