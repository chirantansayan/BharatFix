package com.cdac.complaint_system.BharatFix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.complaint_system.BharatFix.entites.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}

