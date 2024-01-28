import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {UserRoles} from '../models/user-roles.enum';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  onOpenStudentCourses(): void {
    this.router.navigateByUrl('student-cources-page');
  }

  onOpenReferences(): void {
    this.router.navigateByUrl('reference-page');
  }

  onOpenUsers(): void {
    this.router.navigateByUrl('users-page');
  }

  isCurrentUserAdmin(): boolean {
    return this.userService.getCurrentUserRole() === UserRoles.ADMIN;
  }

  isCurrentUserStudent(): boolean {
    return this.userService.getCurrentUserRole() === UserRoles.STUDENT;
  }

  isCurrentUserStudentOrTeacher(): boolean {
    return this.userService.getCurrentUserRole() === UserRoles.STUDENT || this.userService.getCurrentUserRole() === UserRoles.TEACHER;
  }

  isCurrentUserTeacher(): boolean {
    return this.userService.getCurrentUserRole() === UserRoles.TEACHER;
  }
}
