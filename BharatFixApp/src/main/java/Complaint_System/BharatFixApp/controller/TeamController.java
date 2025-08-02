package Complaint_System.BharatFixApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import Complaint_System.BharatFixApp.dto.TeamDTO;
import Complaint_System.BharatFixApp.entites.Team;
import Complaint_System.BharatFixApp.services.TeamService;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    // Only ADMIN can create a team
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Team createTeam(@RequestBody TeamDTO dto) {
        return teamService.createTeam(dto);
    }

    // Only ADMIN can get a team by ID
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public Team getTeam(@PathVariable Long id) {
        return teamService.getTeamById(id);
    }

    // Only ADMIN can get teams by department
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/department/{departmentId}")
    public List<Team> getTeamsByDepartment(@PathVariable Long departmentId) {
        return teamService.getTeamsByDepartment(departmentId);
    }

    // Only ADMIN can view available teams
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/available")
    public List<Team> getAvailableTeams() {
        return teamService.getAllAvailableTeams();
    }
}
