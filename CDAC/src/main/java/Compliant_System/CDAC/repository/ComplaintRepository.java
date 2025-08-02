package Compliant_System.CDAC.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
	List<Complaint> findByUserId(Long userId);

}

