package com.project.university.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.university.entities.Subject;
import com.project.university.services.SubjectService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/subjects")
public class SubjectController {

    @Autowired
    private final SubjectService subjectService;

    @PutMapping(value = "/add-subject")
    public Subject addSubject(@RequestBody Subject subject) {
        return subjectService.addSubject(subject);
    }

    @PostMapping(value = "/update-course")
    public Subject updateCourse(@RequestBody Subject subject) {
        return subjectService.editSubject(subject);
    }

    @GetMapping(value = "/fetch-subjects/{username}")
    public List<Subject> fetchSubjectsForUser(@PathVariable("username") String username) {
        return subjectService.getSubjectsForTeacher(username);
    }

    @GetMapping(value = "/fetch-subjects/students/{username}")
    public List<Subject> fetchSubjectsForStudentsToEnroll(@PathVariable("username") String username) {
        return subjectService.getSubjectsForStudentToEnroll(username);
    }

    @GetMapping(value = "/fetch-subjects/students/included/{username}")
    public List<Subject> fetchSubjectsForStudent(@PathVariable("username") String username) {
        return subjectService.getSubjectsForStudent(username);
    }

    @PutMapping(value = "/enroll-to-course/{username}")
    public Subject enrollStudentForSubject(@PathVariable("username") String username,
            @RequestBody Subject subject) {
        return subjectService.updateStudentsList(subject, username);
    }

    @DeleteMapping(value = "/delete/{subjectId}")
    public void deleteSubject(@PathVariable(value = "subjectId") UUID subjectId) {
        subjectService.deleteSubject(subjectId);
    }

}
