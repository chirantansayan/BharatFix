package com.cdac.complaint_system.BharatFix.entites;


import java.time.LocalDateTime;

import com.cdac.complaint_system.BharatFix.enums.AllocationStatus;
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
import jakarta.persistence.Table;

@Entity
@Table(name = "complaint_allocations")
public class ComplaintAllocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "complaint_id", nullable = false)
    @JsonIgnore
    private Complaint complaint;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    @JsonIgnore
    private Team team;

    @ManyToOne
    @JoinColumn(name = "assigned_by", nullable = false)
    @JsonIgnore
    private User assignedBy; 

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AllocationStatus status;

    @Column(nullable = false)
    private LocalDateTime assignedAt;

    public ComplaintAllocation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }

    public Team getTeam() { return team; }
    public void setTeam(Team team) { this.team = team; }

    public User getAssignedBy() { return assignedBy; }
    public void setAssignedBy(User assignedBy) { this.assignedBy = assignedBy; }

    public AllocationStatus getStatus() { return status; }
    public void setStatus(AllocationStatus status) { this.status = status; }

    public LocalDateTime getAssignedAt() { return assignedAt; }
    public void setAssignedAt(LocalDateTime assignedAt) { this.assignedAt = assignedAt; }
}

