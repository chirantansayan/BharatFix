package Complaint_System.BharatFixApp.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.Team;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByDepartmentId(Long departmentId);
    List<Team> findByAvailableTrue();
}

