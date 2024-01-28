package com.project.university.services;

import java.util.List;
import java.util.UUID;

import com.project.university.dto.LoginUserDto;
import com.project.university.entities.User;

public interface UserService {

    User registerUser(User user);

    User loginUser(LoginUserDto user);

    List<User> getAllUsers();

    User updateUser(User user);

    User findUserById(UUID userId);

    User findUserByUsername(String username);

}
