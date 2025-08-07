package com.cdac.complaint_system.BharatFix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.complaint_system.BharatFix.dto.ComplaintAllocationDTO;
import com.cdac.complaint_system.BharatFix.entites.ComplaintAllocation;
import com.cdac.complaint_system.BharatFix.services.ComplaintAllocationService;

import java.util.List;

@RestController
@RequestMapping("/api/complaintallocations")
public class ComplaintAllocationController {

    @Autowired
    private ComplaintAllocationService allocationService;

    // Only ADMIN can allocate a team to a complaint
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ComplaintAllocation allocateTeam(@RequestBody ComplaintAllocationDTO dto) {
        return allocationService.allocateTeam(dto);
    }

    // ADMIN and USER can view allocations for a complaint
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/complaint/{complaintId}")
    public List<ComplaintAllocation> getAllocations(@PathVariable Long complaintId) {
        return allocationService.getAllocationsForComplaint(complaintId);
    }
}
