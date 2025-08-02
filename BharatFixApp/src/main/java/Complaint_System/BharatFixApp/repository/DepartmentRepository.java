package Complaint_System.BharatFixApp.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}

