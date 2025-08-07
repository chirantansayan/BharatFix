package com.cdac.complaint_system.BharatFix.services;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.complaint_system.BharatFix.dto.ComplaintAllocationDTO;
import com.cdac.complaint_system.BharatFix.entites.Complaint;
import com.cdac.complaint_system.BharatFix.entites.ComplaintAllocation;
import com.cdac.complaint_system.BharatFix.entites.Team;
import com.cdac.complaint_system.BharatFix.entites.User;
import com.cdac.complaint_system.BharatFix.exceptions.ResourceNotFoundException;
import com.cdac.complaint_system.BharatFix.repository.ComplaintAllocationRepository;
import com.cdac.complaint_system.BharatFix.repository.ComplaintRepository;
import com.cdac.complaint_system.BharatFix.repository.TeamRepository;
import com.cdac.complaint_system.BharatFix.repository.UserRepository;

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

