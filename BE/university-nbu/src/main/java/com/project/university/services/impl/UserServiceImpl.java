package com.project.university.services.impl;

import java.util.List;
import java.util.UUID;

import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.project.university.dto.LoginUserDto;
import com.project.university.entities.User;
import com.project.university.enums.UserRole;
import com.project.university.repositories.UserRepository;
import com.project.university.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {
        if (!StringUtils.hasLength(user.getEmail())) {
            throw new ServiceException("Имейлът не може да бъде празна стойност.");
        }
        if (!StringUtils.hasLength(user.getUsername())) {
            throw new ServiceException("Потребителското име не може да бъде празна стойност.");
        }
        if (!StringUtils.hasLength(user.getPassword())) {
            throw new ServiceException("Паролата име не може да бъде празна стойност.");
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new ServiceException("Вече има потребител с това потребителско име.");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ServiceException("Вече има потребител с този имейл.");
        }

        user.setRole(UserRole.STUDENT);
        return userRepository.save(user);
    }

    @Override
    public User loginUser(LoginUserDto user) {
        User savedUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new ServiceException("Няма потребител с това потребителско име."));
        if (!StringUtils.hasLength(user.getPassword()) || !user.getPassword().equals(savedUser.getPassword())) {
            throw new ServiceException("Грешна парола.");
        }

        return savedUser;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user) {
        User savedUser = this.findUserById(user.getId());

        savedUser.setRole(user.getRole());
        savedUser.setFirstName(user.getFirstName());
        savedUser.setLastName(user.getLastName());

        return userRepository.save(savedUser);
    }

    @Override
    public User findUserById(UUID userId) {
        if (userId == null) {
            throw new ServiceException("Потребителят е невалиден.");
        }
        return userRepository.findById(userId)
                .orElseThrow(() -> new ServiceException("Потребителят е невалиден."));
    }

    @Override
    public User findUserByUsername(String username) {
        if (username == null) {
            throw new ServiceException("Потребителят е невалиден.");
        }
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ServiceException("Потребителят е невалиден."));
    }
}
