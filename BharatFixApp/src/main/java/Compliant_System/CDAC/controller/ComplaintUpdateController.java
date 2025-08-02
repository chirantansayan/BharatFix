package Compliant_System.CDAC.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import Compliant_System.CDAC.dto.ComplaintUpdateDTO;
import Compliant_System.CDAC.entites.ComplaintUpdate;
import Compliant_System.CDAC.services.ComplaintUpdateService;

import java.util.List;

@RestController
@RequestMapping("/api/complaintupdates")
public class ComplaintUpdateController {

    @Autowired
    private ComplaintUpdateService updateService;

    // Only ADMIN can add a status update to a complaint
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ComplaintUpdate addUpdate(@RequestBody ComplaintUpdateDTO dto) {
        return updateService.addUpdate(dto);
    }

    // ADMIN and USER can view updates for a complaint
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/complaint/{complaintId}")
    public List<ComplaintUpdate> getUpdates(@PathVariable Long complaintId) {
        return updateService.getUpdatesByComplaintId(complaintId);
    }
}
