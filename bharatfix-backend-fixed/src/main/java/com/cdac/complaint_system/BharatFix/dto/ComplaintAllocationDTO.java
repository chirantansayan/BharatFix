package com.cdac.complaint_system.BharatFix.dto;

import com.cdac.complaint_system.BharatFix.enums.AllocationStatus;

public class ComplaintAllocationDTO {

    private Long complaintId;
    private Long teamId;
    private Long assignedBy; // Admin ID
    private AllocationStatus status;

    public ComplaintAllocationDTO() {}

    public ComplaintAllocationDTO(Long complaintId, Long teamId, Long assignedBy, AllocationStatus status) {
        this.complaintId = complaintId;
        this.teamId = teamId;
        this.assignedBy = assignedBy;
        this.status = status;
    }

    public Long getComplaintId() { return complaintId; }
    public void setComplaintId(Long complaintId) { this.complaintId = complaintId; }

    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }

    public Long getAssignedBy() { return assignedBy; }
    public void setAssignedBy(Long assignedBy) { this.assignedBy = assignedBy; }

    public AllocationStatus getStatus() { return status; }
    public void setStatus(AllocationStatus status) { this.status = status; }
}

