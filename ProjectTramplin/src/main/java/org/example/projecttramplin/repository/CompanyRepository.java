package org.example.projecttramplin.repository;

import org.example.projecttramplin.entity.Company;
import org.example.projecttramplin.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByUser(User user);
}
