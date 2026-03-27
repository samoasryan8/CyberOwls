package org.example.projecttramplin.repository;

import org.example.projecttramplin.entity.Connection;
import org.example.projecttramplin.entity.ConnectionStatus;
import org.example.projecttramplin.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, Long> {
    @Query("SELECT c FROM Connection c WHERE (c.user1 = :user OR c.user2 = :user) AND c.status = :status")
    List<Connection> findConnectionsByUserAndStatus(@Param("user") User user, @Param("status") ConnectionStatus status);
}
