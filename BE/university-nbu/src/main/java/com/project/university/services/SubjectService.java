package com.project.university.services;

import java.util.List;
import java.util.UUID;

import com.project.university.entities.Subject;

public interface SubjectService {

    Subject addSubject(Subject subject);

    Subject editSubject(Subject subject);

    Subject updateStudentsList(Subject subject, String username);

    List<Subject> getSubjectsForTeacher(String username);

    List<Subject> getSubjectsForStudentToEnroll(String username);

    List<Subject> getSubjectsForStudent(String username);

    void deleteSubject(UUID subjectId);
}
