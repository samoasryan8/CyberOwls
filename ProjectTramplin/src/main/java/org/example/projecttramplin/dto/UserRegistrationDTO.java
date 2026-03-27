package org.example.projecttramplin.dto;


import lombok.Data;
import org.example.projecttramplin.entity.Role;

@Data
public class UserRegistrationDTO {
    private String email;
    private String password;
    private Role role;
}
