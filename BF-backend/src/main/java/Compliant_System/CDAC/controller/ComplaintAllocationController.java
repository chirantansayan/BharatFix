package Compliant_System.CDAC.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import Compliant_System.CDAC.dto.ComplaintAllocationDTO;
import Compliant_System.CDAC.entites.ComplaintAllocation;
import Compliant_System.CDAC.services.ComplaintAllocationService;

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
