package com.project.university.entities;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.university.enums.UserRole;

import lombok.Data;

@Getter
@Setter
@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private UUID id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @JsonIgnore
    @OneToMany(mappedBy = "teacher")
    private Set<Subject> ownedSubjects;

    @JsonIgnore
    @ManyToMany(mappedBy = "students")
    private Set<Subject> enrolledSubjects;

}
