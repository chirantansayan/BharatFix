package Complaint_System.BharatFixApp.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Complaint_System.BharatFixApp.dto.ComplaintUpdateDTO;
import Complaint_System.BharatFixApp.entites.Complaint;
import Complaint_System.BharatFixApp.entites.ComplaintUpdate;
import Complaint_System.BharatFixApp.entites.User;
import Complaint_System.BharatFixApp.exceptions.ResourceNotFoundException;
import Complaint_System.BharatFixApp.repository.ComplaintRepository;
import Complaint_System.BharatFixApp.repository.ComplaintUpdateRepository;
import Complaint_System.BharatFixApp.repository.UserRepository;

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

