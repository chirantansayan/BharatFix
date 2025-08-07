package Compliant_System.CDAC.dto;

import Compliant_System.CDAC.enums.ComplaintStatus;

public class ComplaintUpdateDTO {

    private Long complaintId;
    private Long updatedBy;
    private ComplaintStatus status;
    private String message;

    public ComplaintUpdateDTO() {}

    public Long getComplaintId() { return complaintId; }
    public void setComplaintId(Long complaintId) { this.complaintId = complaintId; }

    public Long getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(Long updatedBy) { this.updatedBy = updatedBy; }

    public ComplaintStatus getStatus() { return status; }
    public void setStatus(ComplaintStatus status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}

