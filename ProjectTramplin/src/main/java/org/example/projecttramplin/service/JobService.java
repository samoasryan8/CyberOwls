package org.example.projecttramplin.service;


import lombok.RequiredArgsConstructor;
import org.example.projecttramplin.entity.Job;
import org.example.projecttramplin.entity.WorkFormat;
import org.example.projecttramplin.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public List<Job> filterJobs(WorkFormat format, List<String> tags) {
        return jobRepository.findJobsByFilters(format, tags);
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
