package Compliant_System.CDAC.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}

