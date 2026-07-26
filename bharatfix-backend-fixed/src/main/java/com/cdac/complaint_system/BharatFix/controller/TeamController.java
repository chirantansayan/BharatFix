package com.cdac.complaint_system.BharatFix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.complaint_system.BharatFix.dto.TeamDTO;
import com.cdac.complaint_system.BharatFix.entites.Team;
import com.cdac.complaint_system.BharatFix.services.TeamService;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    // Only ADMIN can create a team
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public Team createTeam(@RequestBody TeamDTO dto) {
        return teamService.createTeam(dto);
    }

    // Only ADMIN can get a team by ID
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public Team getTeam(@PathVariable Long id) {
        return teamService.getTeamById(id);
    }

    // Only ADMIN can get teams by department
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/department/{departmentId}")
    public List<Team> getTeamsByDepartment(@PathVariable Long departmentId) {
        return teamService.getTeamsByDepartment(departmentId);
    }

    // Only ADMIN can view available teams
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/available")
    public List<Team> getAvailableTeams() {
        return teamService.getAllAvailableTeams();
    }
}
