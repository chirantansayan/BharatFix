package com.cdac.complaint_system.BharatFix.entites;
import java.time.LocalDateTime;

import com.cdac.complaint_system.BharatFix.enums.ComplaintStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user; 

    @OneToOne
    @JoinColumn(name = "guest_id")
    @JsonIgnore
    private GuestUser guestUser; 

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonIgnore
    private Department department;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus status = ComplaintStatus.PENDING;

    private String photoUrl;

    private Double latitude;

    private Double longitude;

    private LocalDateTime createdAt = LocalDateTime.now();

	public Complaint() {
		super();
	}

	public Complaint(Long id, User user, GuestUser guestUser, String title, String description, Department department,
			ComplaintStatus status, String photoUrl, Double latitude, Double longitude, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.user = user;
		this.guestUser = guestUser;
		this.title = title;
		this.description = description;
		this.department = department;
		this.status = status;
		this.photoUrl = photoUrl;
		this.latitude = latitude;
		this.longitude = longitude;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public GuestUser getGuestUser() {
		return guestUser;
	}

	public void setGuestUser(GuestUser guestUser) {
		this.guestUser = guestUser;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public ComplaintStatus getStatus() {
		return status;
	}

	public void setStatus(ComplaintStatus status) {
		this.status = status;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
}

