package com.project.university.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.university.entities.Subject;
import com.project.university.entities.User;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, UUID> {

    List<Subject> findByTeacher(User teacher);

    List<Subject> findByStudentsContaining(User student);

    List<Subject> findByStudentsNotContaining(User student);

}
