package org.example.projecttramplin.repository;

import org.example.projecttramplin.entity.Job;
import org.example.projecttramplin.entity.WorkFormat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT j FROM Job j JOIN j.tags t WHERE (:format IS NULL OR j.format = :format) AND (COALESCE(:tags, NULL) IS NULL OR t.name IN :tags)")
    List<Job> findJobsByFilters(@Param("format") WorkFormat format, @Param("tags") List<String> tags);
}