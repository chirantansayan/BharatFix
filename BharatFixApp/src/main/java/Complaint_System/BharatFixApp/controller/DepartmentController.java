package Complaint_System.BharatFixApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import Complaint_System.BharatFixApp.dto.DepartmentDTO;
import Complaint_System.BharatFixApp.entites.Department;
import Complaint_System.BharatFixApp.services.DepartmentService;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // Only ADMIN can create departments
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Department createDepartment(@RequestBody DepartmentDTO dto) {
        return departmentService.createDepartment(dto);
    }

    // ADMIN and USER can fetch a department by ID
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public Department getDepartment(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }

    // ADMIN and USER can fetch all departments
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }
}
