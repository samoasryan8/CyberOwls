package org.example.projecttramplin.controller;


import lombok.RequiredArgsConstructor;
import org.example.projecttramplin.dto.JobDTO;
import org.example.projecttramplin.entity.Job;
import org.example.projecttramplin.entity.WorkFormat;
import org.example.projecttramplin.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @GetMapping
    public List<JobDTO> getAllJobs() {
        return jobService.getAllJobs().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id)
                .map(this::convertToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/filter")
    public List<JobDTO> filterJobs(@RequestParam(required = false) WorkFormat format,
                                @RequestParam(required = false) List<String> tags) {
        return jobService.filterJobs(format, tags).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public JobDTO createJob(@RequestBody Job job) {
        return convertToDTO(jobService.createJob(job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

    private JobDTO convertToDTO(Job job) {
        JobDTO dto = new JobDTO();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setSalaryMin(job.getSalaryMin());
        dto.setSalaryMax(job.getSalaryMax());
        dto.setFormat(job.getFormat());
        dto.setLatitude(job.getLatitude());
        dto.setLongitude(job.getLongitude());
        dto.setCompanyName(job.getCompany() != null ? job.getCompany().getName() : null);
        dto.setTags(job.getTags().stream().map(t -> t.getName()).collect(Collectors.toSet()));
        dto.setCreatedAt(job.getCreatedAt());
        return dto;
    }
}
