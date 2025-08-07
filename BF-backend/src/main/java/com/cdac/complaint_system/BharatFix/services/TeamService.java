package com.cdac.complaint_system.BharatFix.services;


import java.util.List;

import com.cdac.complaint_system.BharatFix.dto.TeamDTO;
import com.cdac.complaint_system.BharatFix.entites.Team;

public interface TeamService {
    Team createTeam(TeamDTO dto);
    Team getTeamById(Long id);
    List<Team> getTeamsByDepartment(Long departmentId);
    List<Team> getAllAvailableTeams();
}

