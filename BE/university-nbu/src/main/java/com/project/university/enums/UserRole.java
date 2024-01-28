package com.project.university.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserRole {

    ADMIN("ADMIN"),
    TEACHER("TEACHER"),
    STUDENT("STUDENT");

    private final String role;
}
