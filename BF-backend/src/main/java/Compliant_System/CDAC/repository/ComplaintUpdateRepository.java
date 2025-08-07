package Compliant_System.CDAC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.ComplaintUpdate;

import java.util.List;

public interface ComplaintUpdateRepository extends JpaRepository<ComplaintUpdate, Long> {
    List<ComplaintUpdate> findByComplaintId(Long complaintId);
}

