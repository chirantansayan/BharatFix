package Complaint_System.BharatFixApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
	List<Complaint> findByUserId(Long userId);

}

