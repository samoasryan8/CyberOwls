package org.example.projecttramplin.controller;

import lombok.RequiredArgsConstructor;
import org.example.projecttramplin.dto.LoginRequestDTO;
import org.example.projecttramplin.dto.UserRegistrationDTO;
import org.example.projecttramplin.dto.UserResponseDTO;
import org.example.projecttramplin.entity.User;
import org.example.projecttramplin.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDTO request) {
        try {
            User user = authService.register(request.getEmail(), request.getPassword(), request.getRole());
            return ResponseEntity.ok(convertToDTO(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        Optional<User> user = authService.login(request.getEmail(), request.getPassword());
        if (user.isPresent()) {
            return ResponseEntity.ok(convertToDTO(user.get()));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    private UserResponseDTO convertToDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
}
