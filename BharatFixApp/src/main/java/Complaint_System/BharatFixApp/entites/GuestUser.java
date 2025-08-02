package Complaint_System.BharatFixApp.entites;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "guest_users")
public class GuestUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "has_complained")
    private Boolean hasComplained;

    public GuestUser() {}

    public GuestUser(String email, String ipAddress, LocalDateTime createdAt, Boolean hasComplained) {
        this.email = email;
        this.ipAddress = ipAddress;
        this.createdAt = createdAt;
        this.hasComplained = hasComplained;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getHasComplained() {
        return hasComplained;
    }

    public void setHasComplained(Boolean hasComplained) {
        this.hasComplained = hasComplained;
    }
}

