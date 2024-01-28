package com.project.university.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.project.university.entities.Subject;
import com.project.university.entities.User;
import com.project.university.enums.UserRole;
import com.project.university.repositories.SubjectRepository;
import com.project.university.services.SubjectService;
import com.project.university.services.UserService;

@Service
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserService userService;

    @Override
    public Subject addSubject(Subject subject) {
        User savedUser = userService.findUserByUsername(subject.getTeacher().getUsername());
        subject.setTeacher(savedUser);
        subject.setStudents(new HashSet<>());
        return subjectRepository.save(subject);
    }

    @Override
    public Subject editSubject(Subject subject) {
        Subject savedSubject = getSubject(subject.getId());

        savedSubject.setName(subject.getName());
        savedSubject.setMaterials(subject.getMaterials());
        savedSubject.setTasks(subject.getTasks());

        return subjectRepository.save(savedSubject);
    }

    @Override
    public Subject updateStudentsList(Subject subject, String username) {
        if (StringUtils.isEmpty(username)) {
            throw new ServiceException("Трябва поне един студент да се запише");
        }

        Subject savedSubject = getSubject(subject.getId());

        User savedStudent = userService.findUserByUsername(username);
        if (!UserRole.STUDENT.equals(savedStudent.getRole())) {
            throw new ServiceException("Само потребители с роля \"Студент\" могат да се записват към курс");
        }

        savedSubject.getStudents().add(savedStudent);

        return subjectRepository.save(savedSubject);
    }

    @Override
    public List<Subject> getSubjectsForTeacher(String username) {
        User currentUser = userService.findUserByUsername(username);
        if (UserRole.ADMIN.equals(currentUser.getRole())) {
            return subjectRepository.findAll();
        } else {
            return subjectRepository.findByTeacher(currentUser);
        }
    }

    @Override
    public List<Subject> getSubjectsForStudentToEnroll(String username) {
        User currentUser = userService.findUserByUsername(username);
        return this.subjectRepository.findByStudentsNotContaining(currentUser);
    }

    @Override
    public List<Subject> getSubjectsForStudent(String username) {
        User currentUser = userService.findUserByUsername(username);
        return this.subjectRepository.findByStudentsContaining(currentUser);
    }

    @Override
    public void deleteSubject(UUID subjectId) {
        this.subjectRepository.deleteById(subjectId);
    }

    private Subject getSubject(UUID subjectId) {
        if (subjectId == null) {
            throw new ServiceException("Курсът е невалиден!");
        }

        return subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ServiceException("Курсът е невалиден!"));
    }
}
