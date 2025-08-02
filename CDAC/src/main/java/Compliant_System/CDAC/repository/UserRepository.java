package Compliant_System.CDAC.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import Compliant_System.CDAC.entites.User;



import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    User findByEmail(String email);

}


