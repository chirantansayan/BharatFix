package Compliant_System.CDAC.services;


import java.util.List;

import Compliant_System.CDAC.dto.TeamDTO;
import Compliant_System.CDAC.entites.Team;

public interface TeamService {
    Team createTeam(TeamDTO dto);
    Team getTeamById(Long id);
    List<Team> getTeamsByDepartment(Long departmentId);
    List<Team> getAllAvailableTeams();
}

