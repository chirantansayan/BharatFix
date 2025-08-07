package com.cdac.complaint_system.BharatFix.services;

import org.springframework.stereotype.Service;

import com.cdac.complaint_system.BharatFix.dto.ComplaintDTO;
import com.cdac.complaint_system.BharatFix.entites.Complaint;
import com.cdac.complaint_system.BharatFix.entites.Department;
import com.cdac.complaint_system.BharatFix.entites.GuestUser;
import com.cdac.complaint_system.BharatFix.entites.User;
import com.cdac.complaint_system.BharatFix.exceptions.ResourceNotFoundException;
import com.cdac.complaint_system.BharatFix.repository.ComplaintRepository;
import com.cdac.complaint_system.BharatFix.repository.DepartmentRepository;
import com.cdac.complaint_system.BharatFix.repository.UserRepository;

import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final GuestUserRepository guestUserRepository;
    private final DepartmentRepository departmentRepository;

    public ComplaintServiceImpl(ComplaintRepository complaintRepository,
                                UserRepository userRepository,
                                GuestUserRepository guestUserRepository,
                                DepartmentRepository departmentRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.guestUserRepository = guestUserRepository;
        this.departmentRepository = departmentRepository;
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

        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            complaint.setUser(user);
        }

        if (dto.getGuestUserId() != null) {
            GuestUser guest = guestUserRepository.findById(dto.getGuestUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("Guest user not found"));
            complaint.setGuestUser(guest);
        }

        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with ID: " + id));
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }
}
