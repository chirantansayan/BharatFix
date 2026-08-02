package com.cdac.complaint_system.BharatFix.dto;

import java.time.LocalDateTime;

import com.cdac.complaint_system.BharatFix.enums.AllocationStatus;

public class ComplaintAllocationResponseDTO {

    private Long id;
    private Long complaintId;
    private Long teamId;
    private String teamName;
    private AllocationStatus status;
    private LocalDateTime assignedAt;

    public ComplaintAllocationResponseDTO(Long id, Long complaintId, Long teamId, String teamName,
            AllocationStatus status, LocalDateTime assignedAt) {
        this.id = id;
        this.complaintId = complaintId;
        this.teamId = teamId;
        this.teamName = teamName;
        this.status = status;
        this.assignedAt = assignedAt;
    }

    public Long getId() { return id; }
    public Long getComplaintId() { return complaintId; }
    public Long getTeamId() { return teamId; }
    public String getTeamName() { return teamName; }
    public AllocationStatus getStatus() { return status; }
    public LocalDateTime getAssignedAt() { return assignedAt; }
}
