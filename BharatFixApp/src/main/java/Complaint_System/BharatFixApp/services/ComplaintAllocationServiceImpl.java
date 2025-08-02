package Complaint_System.BharatFixApp.services;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Complaint_System.BharatFixApp.dto.ComplaintAllocationDTO;
import Complaint_System.BharatFixApp.entites.Complaint;
import Complaint_System.BharatFixApp.entites.ComplaintAllocation;
import Complaint_System.BharatFixApp.entites.Team;
import Complaint_System.BharatFixApp.entites.User;
import Complaint_System.BharatFixApp.exceptions.ResourceNotFoundException;
import Complaint_System.BharatFixApp.repository.ComplaintAllocationRepository;
import Complaint_System.BharatFixApp.repository.ComplaintRepository;
import Complaint_System.BharatFixApp.repository.TeamRepository;
import Complaint_System.BharatFixApp.repository.UserRepository;

@Service
public class ComplaintAllocationServiceImpl implements ComplaintAllocationService {

    @Autowired
    private ComplaintAllocationRepository allocationRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ComplaintAllocation allocateTeam(ComplaintAllocationDTO dto) {
        Complaint complaint = complaintRepository.findById(dto.getComplaintId())
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        Team team = teamRepository.findById(dto.getTeamId())
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        User admin = userRepository.findById(dto.getAssignedBy())
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

        ComplaintAllocation allocation = new ComplaintAllocation();
        allocation.setComplaint(complaint);
        allocation.setTeam(team);
        allocation.setAssignedBy(admin);
        allocation.setStatus(dto.getStatus());
        allocation.setAssignedAt(LocalDateTime.now());

        return allocationRepository.save(allocation);
    }

    @Override
    public List<ComplaintAllocation> getAllocationsForComplaint(Long complaintId) {
        return allocationRepository.findByComplaintId(complaintId);
    }
}

