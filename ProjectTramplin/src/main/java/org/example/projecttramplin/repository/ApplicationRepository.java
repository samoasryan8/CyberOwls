package org.example.projecttramplin.repository;

import org.example.projecttramplin.entity.Application;
import org.example.projecttramplin.entity.User;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user);
    List<Application> findByJob(BatchProperties.Job job);
}
