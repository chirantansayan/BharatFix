package com.cdac.complaint_system.BharatFix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.complaint_system.BharatFix.dto.TeamDTO;
import com.cdac.complaint_system.BharatFix.entites.Department;
import com.cdac.complaint_system.BharatFix.entites.Team;
import com.cdac.complaint_system.BharatFix.exceptions.ResourceNotFoundException;
import com.cdac.complaint_system.BharatFix.repository.DepartmentRepository;
import com.cdac.complaint_system.BharatFix.repository.TeamRepository;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Team createTeam(TeamDTO dto) {
        Department department = departmentRepository.findById(dto.getDepartmentId())
            .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + dto.getDepartmentId()));

        Team team = new Team(department, dto.getTeamName(), dto.isAvailable());
        return teamRepository.save(team);
    }

    @Override
    public Team getTeamById(Long id) {
        return teamRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Team not found with ID: " + id));
    }

    @Override
    public List<Team> getTeamsByDepartment(Long departmentId) {
        return teamRepository.findByDepartmentId(departmentId);
    }

    @Override
    public List<Team> getAllAvailableTeams() {
        return teamRepository.findByAvailableTrue();
    }
}


