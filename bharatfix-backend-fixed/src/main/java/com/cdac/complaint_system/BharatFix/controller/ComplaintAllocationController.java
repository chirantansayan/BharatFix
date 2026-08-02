package com.cdac.complaint_system.BharatFix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.cdac.complaint_system.BharatFix.dto.ComplaintAllocationDTO;
import com.cdac.complaint_system.BharatFix.dto.ComplaintAllocationResponseDTO;
import com.cdac.complaint_system.BharatFix.services.ComplaintAllocationService;

import java.util.List;

@RestController
@RequestMapping("/api/complaintallocations")
public class ComplaintAllocationController {

    @Autowired
    private ComplaintAllocationService allocationService;

    // Only ADMIN can allocate a team to a complaint
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ComplaintAllocationResponseDTO allocateTeam(@RequestBody ComplaintAllocationDTO dto,
            Authentication authentication) {
        return allocationService.allocateTeam(dto, authentication.getName());
    }

    // ADMIN and USER can view allocations for a complaint
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping("/complaint/{complaintId}")
    public List<ComplaintAllocationResponseDTO> getAllocations(@PathVariable Long complaintId) {
        return allocationService.getAllocationsForComplaint(complaintId);
    }
}
