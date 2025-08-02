package Compliant_System.CDAC.dto;

import Compliant_System.CDAC.enums.Role;
import Compliant_System.CDAC.enums.UserStatus;

public class UserDTO {
    private String username;
    private String password;
    private String email;
    private Role role;
    private UserStatus status;

    public UserDTO() {}

    public UserDTO(String username, String password, String email, Role role, UserStatus status) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.status = status;
    }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }

    public void setRole(Role role) { this.role = role; }

    public UserStatus getStatus() { return status; }

    public void setStatus(UserStatus status) { this.status = status; }
}
