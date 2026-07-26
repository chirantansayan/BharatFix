package com.cdac.complaint_system.BharatFix.services;

import java.util.List;

import com.cdac.complaint_system.BharatFix.dto.DepartmentDTO;
import com.cdac.complaint_system.BharatFix.entites.Department;

public interface DepartmentService {
    Department createDepartment(DepartmentDTO dto);
    Department getDepartmentById(Long id);
    List<Department> getAllDepartments();
}


