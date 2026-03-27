package org.example.projecttramplin.dto;

import lombok.Data;
import org.example.projecttramplin.entity.WorkFormat;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class JobDTO {
    private Long id;
    private String title;
    private String description;
    private Integer salaryMin;
    private Integer salaryMax;
    private WorkFormat format;
    private Double latitude;
    private Double longitude;
    private String companyName;
    private Set<String> tags;
    private LocalDateTime createdAt;
}

