package Compliant_System.CDAC.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Compliant_System.CDAC.dto.DepartmentDTO;
import Compliant_System.CDAC.entites.Department;
import Compliant_System.CDAC.exceptions.ResourceNotFoundException;
import Compliant_System.CDAC.repository.DepartmentRepository;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Department createDepartment(DepartmentDTO dto) {
        Department department = new Department();
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());
        return departmentRepository.save(department);
    }

    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}

