package Compliant_System.CDAC.dto;


public class TeamDTO {

    private Long departmentId;
    private String teamName;
    private boolean available;

    public TeamDTO() {}

    public TeamDTO(Long departmentId, String teamName, boolean available) {
        this.departmentId = departmentId;
        this.teamName = teamName;
        this.available = available;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}

