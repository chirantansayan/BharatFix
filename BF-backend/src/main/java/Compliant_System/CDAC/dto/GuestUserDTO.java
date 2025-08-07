package Compliant_System.CDAC.dto;


public class GuestUserDTO {
    private String email;
    private String ipAddress;

    public GuestUserDTO() {}

    public GuestUserDTO(String email, String ipAddress) {
        this.email = email;
        this.ipAddress = ipAddress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
}

