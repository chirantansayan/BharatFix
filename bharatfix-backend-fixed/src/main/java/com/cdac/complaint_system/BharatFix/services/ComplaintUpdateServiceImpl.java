package com.cdac.complaint_system.BharatFix.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.complaint_system.BharatFix.dto.ComplaintUpdateDTO;
import com.cdac.complaint_system.BharatFix.entites.Complaint;
import com.cdac.complaint_system.BharatFix.entites.ComplaintUpdate;
import com.cdac.complaint_system.BharatFix.entites.User;
import com.cdac.complaint_system.BharatFix.exceptions.ResourceNotFoundException;
import com.cdac.complaint_system.BharatFix.repository.ComplaintRepository;
import com.cdac.complaint_system.BharatFix.repository.ComplaintUpdateRepository;
import com.cdac.complaint_system.BharatFix.repository.UserRepository;

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

