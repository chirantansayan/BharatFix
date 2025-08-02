package Complaint_System.BharatFixApp.services;


import java.util.List;

import Complaint_System.BharatFixApp.dto.TeamDTO;
import Complaint_System.BharatFixApp.entites.Team;

public interface TeamService {
    Team createTeam(TeamDTO dto);
    Team getTeamById(Long id);
    List<Team> getTeamsByDepartment(Long departmentId);
    List<Team> getAllAvailableTeams();
}

