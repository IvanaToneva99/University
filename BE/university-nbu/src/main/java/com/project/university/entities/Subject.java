package com.project.university.entities;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import lombok.Data;

@Getter
@Setter
@Entity(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "tasks")
    private String tasks;

    @Column(name = "materials")
    private String materials;

    @ManyToOne
    @JoinColumn(name = "teacher_id", foreignKey = @ForeignKey(name = "fk_subjects_teacher_id"))
    private User teacher;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_subjects",
            joinColumns = @JoinColumn(name = "subject_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id"))
    private Set<User> students;

}
