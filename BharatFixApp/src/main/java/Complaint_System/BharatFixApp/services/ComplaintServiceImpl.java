package Complaint_System.BharatFixApp.services;

import org.springframework.stereotype.Service;

import Complaint_System.BharatFixApp.dto.ComplaintDTO;
import Complaint_System.BharatFixApp.entites.Complaint;
import Complaint_System.BharatFixApp.entites.Department;
import Complaint_System.BharatFixApp.entites.GuestUser;
import Complaint_System.BharatFixApp.entites.User;
import Complaint_System.BharatFixApp.exceptions.ResourceNotFoundException;
import Complaint_System.BharatFixApp.repository.ComplaintRepository;
import Complaint_System.BharatFixApp.repository.DepartmentRepository;
import Complaint_System.BharatFixApp.repository.UserRepository;

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
