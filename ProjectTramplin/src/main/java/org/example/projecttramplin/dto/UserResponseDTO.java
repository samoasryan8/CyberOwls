package org.example.projecttramplin.dto;


import lombok.*;
import org.example.projecttramplin.entity.Role;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}
