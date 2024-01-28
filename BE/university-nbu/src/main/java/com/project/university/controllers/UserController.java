package com.project.university.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.university.dto.LoginUserDto;
import com.project.university.entities.User;
import com.project.university.services.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private final UserService userService;

    @PutMapping(value = "/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PutMapping(value = "/login")
    public User loginUser(@RequestBody LoginUserDto user) {
        return userService.loginUser(user);
    }

    @GetMapping(value = "/get-all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping(value = "/update-user")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }
}
