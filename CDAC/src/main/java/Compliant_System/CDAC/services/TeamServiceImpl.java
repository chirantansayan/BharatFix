package Compliant_System.CDAC.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Compliant_System.CDAC.dto.TeamDTO;
import Compliant_System.CDAC.entites.Department;
import Compliant_System.CDAC.entites.Team;
import Compliant_System.CDAC.exceptions.ResourceNotFoundException;
import Compliant_System.CDAC.repository.DepartmentRepository;
import Compliant_System.CDAC.repository.TeamRepository;

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


