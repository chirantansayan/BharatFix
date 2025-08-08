package com.cdac.complaint_system.BharatFix.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.complaint_system.BharatFix.dto.ComplaintDTO;
import com.cdac.complaint_system.BharatFix.entites.Complaint;
import com.cdac.complaint_system.BharatFix.entites.User;
import com.cdac.complaint_system.BharatFix.services.ComplaintService;
import com.cdac.complaint_system.BharatFix.services.UserService;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

	@Autowired
    private ComplaintService complaintService;
	@Autowired
	private UserService userService;

//    public ComplaintController(ComplaintService complaintService) {
//        this.complaintService = complaintService;
//    }

    // Authenticated users can file complaints
	@PreAuthorize("hasAuthority('USER')")
    @PostMapping("/send")
    public ResponseEntity<Complaint> createComplaint(@RequestBody ComplaintDTO dto) {
        Complaint created = complaintService.createComplaint(dto);
        return ResponseEntity.ok(created);
    }

    // Admins and users can view individual complaints
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/fetch")
    public ResponseEntity<List<Complaint>> getComplaints() {
    		User user = userService.getUserByUsername(complaintService.getProtectedResource());
        List<Complaint> complaints = complaintService.getComplaintsByUid(user.getId());
        return ResponseEntity.ok(complaints);
    }

    // Only admins can view all complaints
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/allcomplaints")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }
}
