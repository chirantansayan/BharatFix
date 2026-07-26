package com.cdac.complaint_system.BharatFix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.cdac.complaint_system.BharatFix.dto.ComplaintDTO;
import com.cdac.complaint_system.BharatFix.entites.Complaint;
import com.cdac.complaint_system.BharatFix.entites.Department;
import com.cdac.complaint_system.BharatFix.entites.User;
//import com.cdac.complaint_system.BharatFix.entites.GuestUser;
import com.cdac.complaint_system.BharatFix.exceptions.ResourceNotFoundException;
import com.cdac.complaint_system.BharatFix.repository.ComplaintRepository;
import com.cdac.complaint_system.BharatFix.repository.DepartmentRepository;
import com.cdac.complaint_system.BharatFix.repository.UserRepository;

@Service
public class ComplaintServiceImpl implements ComplaintService {

	@Autowired
    private final ComplaintRepository complaintRepository;
    @Autowired
	private final UserRepository userRepository;
//    @Autowired
//    private final GuestUserRepository guestUserRepository;
    @Autowired
    private final DepartmentRepository departmentRepository;
    
    public ComplaintServiceImpl(ComplaintRepository complaintRepository,
                                UserRepository userRepository,
                                GuestUserRepository guestUserRepository,
                                DepartmentRepository departmentRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
//        this.guestUserRepository = guestUserRepository;
        this.departmentRepository = departmentRepository;
    }
    
    @Override
    public String getProtectedResource() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            org.springframework.security.core.userdetails.User userDetails = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
            String username = userDetails.getUsername();
            return username;
        } else {
            return "";
        }
    }

    @Override
    public Complaint createComplaint(ComplaintDTO dto) {
        Complaint complaint = new Complaint();
        complaint.setTitle(dto.getTitle());
        complaint.setDescription(dto.getDescription());
        complaint.setPhotoUrl(dto.getPhotoUrl());
        complaint.setLatitude(dto.getLatitude());
        complaint.setLongitude(dto.getLongitude());

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
        complaint.setDepartment(department);

        User user = userRepository.findByUsername(getProtectedResource())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        complaint.setUser(user);

//        GuestUser guest = guestUserRepository.findByIpAddress(getProtectedResource())
//                .orElseThrow(() -> new ResourceNotFoundException("Guest user not found"));
//        complaint.setGuestUser(guest);

        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getComplaintsByUid(Long id) {
        return complaintRepository.findByUserId(id);
//                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with ID: " + id));
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }
}
