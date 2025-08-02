package Compliant_System.CDAC.services;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Compliant_System.CDAC.dto.ComplaintAllocationDTO;
import Compliant_System.CDAC.entites.Complaint;
import Compliant_System.CDAC.entites.ComplaintAllocation;
import Compliant_System.CDAC.entites.Team;
import Compliant_System.CDAC.entites.User;
import Compliant_System.CDAC.exceptions.ResourceNotFoundException;
import Compliant_System.CDAC.repository.ComplaintAllocationRepository;
import Compliant_System.CDAC.repository.ComplaintRepository;
import Compliant_System.CDAC.repository.TeamRepository;
import Compliant_System.CDAC.repository.UserRepository;

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

