package Complaint_System.BharatFixApp.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import Complaint_System.BharatFixApp.entites.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    User findByEmail(String email);

}


