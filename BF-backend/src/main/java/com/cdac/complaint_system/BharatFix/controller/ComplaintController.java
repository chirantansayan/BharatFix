package com.cdac.complaint_system.BharatFix.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.complaint_system.BharatFix.dto.ComplaintDTO;
import com.cdac.complaint_system.BharatFix.entites.Complaint;
import com.cdac.complaint_system.BharatFix.services.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // Authenticated users can file complaints
//    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@RequestBody ComplaintDTO dto) {
        Complaint created = complaintService.createComplaint(dto);
        return ResponseEntity.ok(created);
    }

    // Admins and users can view individual complaints
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaint(@PathVariable Long id) {
        Complaint complaint = complaintService.getComplaintById(id);
        return ResponseEntity.ok(complaint);
    }

    // Only admins can view all complaints
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/allcomplaints")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }
}
