package org.example.projecttramplin.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.projecttramplin.entity.User;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(name = "tin_hvhh", unique = true)
    private String tinHvhh;

    @Column(name = "is_verified")
    private boolean isVerified = false;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String website;
}
