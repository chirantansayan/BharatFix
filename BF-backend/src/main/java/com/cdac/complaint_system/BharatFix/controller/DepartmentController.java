package com.cdac.complaint_system.BharatFix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.complaint_system.BharatFix.dto.DepartmentDTO;
import com.cdac.complaint_system.BharatFix.entites.Department;
import com.cdac.complaint_system.BharatFix.services.DepartmentService;

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
