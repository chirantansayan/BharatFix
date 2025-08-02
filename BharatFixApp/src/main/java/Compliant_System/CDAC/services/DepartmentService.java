package Compliant_System.CDAC.services;

import java.util.List;

import Compliant_System.CDAC.dto.DepartmentDTO;
import Compliant_System.CDAC.entites.Department;

public interface DepartmentService {
    Department createDepartment(DepartmentDTO dto);
    Department getDepartmentById(Long id);
    List<Department> getAllDepartments();
}


