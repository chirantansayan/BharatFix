package Compliant_System.CDAC.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.Team;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByDepartmentId(Long departmentId);
    List<Team> findByAvailableTrue();
}

