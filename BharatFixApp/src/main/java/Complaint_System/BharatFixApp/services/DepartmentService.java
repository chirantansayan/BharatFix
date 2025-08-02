package Complaint_System.BharatFixApp.services;

import java.util.List;

import Complaint_System.BharatFixApp.dto.DepartmentDTO;
import Complaint_System.BharatFixApp.entites.Department;

public interface DepartmentService {
    Department createDepartment(DepartmentDTO dto);
    Department getDepartmentById(Long id);
    List<Department> getAllDepartments();
}


