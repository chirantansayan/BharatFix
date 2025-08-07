package com.cdac.complaint_system.BharatFix.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.complaint_system.BharatFix.entites.Team;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByDepartmentId(Long departmentId);
    List<Team> findByAvailableTrue();
}

