import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UserRoles} from '../models/user-roles.enum';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user-repository.service';
import {CommonModule} from '@angular/common';
import {Subject} from '../models/subject.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-reference',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss'
})
export class ReferenceComponent implements OnInit {
  subjectForm = new FormGroup({
    name: new FormControl<string>(''),
    teacher: new FormControl<any>({}),
    materials: new FormControl<string>(''),
    tasks: new FormControl<string>(''),
  });

  coursesData: Array<Subject> = [];

  showEditUserForm = false;
  showAddSubjectForm = false;
  showUserPage = true;
  selectedCourse: Subject = new Subject();
  shouldShowEmptyFieldsError: boolean = false;

  constructor(private readonly userRepository: UserRepository,
              private readonly userService: UserService) {
  }

  ngOnInit() {
    if (this.isCurrentUserStudent()) {
      this.userRepository.fetchAllCoursesForStudent().subscribe((response) => {
        this.coursesData = response;
      })
    } else {
      this.userRepository.fetchAllCourses().subscribe((response) => {
        this.coursesData = response;
      })
    }
  }

  isCurrentUserStudent(): boolean {
    return this.userService.getCurrentUserRole() === UserRoles.STUDENT;
  }

  onAddClick(): void {
    this.subjectForm.reset();
    this.showAddSubjectForm = true;
    this.showUserPage = false;
    this.showEditUserForm = false;
  }

  onAddCourse(): void {
    const newSubject: Subject = new Subject();
    newSubject.name = this.subjectForm.controls.name.value || '';
    newSubject.materials = this.subjectForm.controls.materials.value || '';
    newSubject.tasks = this.subjectForm.controls.tasks.value || '';
    if (!newSubject.name || !newSubject.materials || !newSubject.tasks) {
      this.shouldShowEmptyFieldsError = true;
      return;
    }

    newSubject.teacher = {username: this.userService.getCurrentUsername()} as User
    this.userRepository.addCourse(newSubject).subscribe((response) => {
      this.coursesData.push(response);
    });

    this.showAddSubjectForm = false;
    this.showEditUserForm = false;
    this.showUserPage = true;
  }

  onEditClick(cource: Subject): void {
    this.subjectForm.reset();
    this.selectedCourse = cource;
    this.subjectForm.controls.name.setValue(cource.name || '');
    this.subjectForm.controls.teacher.setValue((cource.teacher.firstName || '') + " " + (cource.teacher.lastName || ''));
    this.subjectForm.controls.materials.setValue(cource.materials || '');
    this.subjectForm.controls.tasks.setValue(cource.tasks || '');

    this.showEditUserForm = true;
    this.showUserPage = false;
    this.showAddSubjectForm = false;
  }

  onEditCourse(): void {
    this.selectedCourse.name = this.subjectForm.controls.name.value || '';
    this.selectedCourse.materials = this.subjectForm.controls.materials.value || '';
    this.selectedCourse.tasks = this.subjectForm.controls.tasks.value || '';

    this.userRepository.editCourse(this.selectedCourse).subscribe((response) => {
      this.coursesData.forEach(cource => {
        if (cource.id === response.id) {
          cource = response;
        }
      })
    });
    this.showEditUserForm = false;
    this.showUserPage = true;
    this.showAddSubjectForm = false;
  };

  onCancelClick(): void {
    this.showEditUserForm = false;
    this.showAddSubjectForm = false;
    this.showUserPage = true;
  }

  onDeleteCourse(course: Subject): void {
    this.userRepository.deleteCourse(course).subscribe(() => {
      this.coursesData = this.coursesData.filter(c => c.id !== course.id)
    });
  }

  getStudentsLabel(course: Subject): string {
    return course.students.filter(s => !!s.firstName && !!s.lastName)
      .map(s => `${s.firstName} ${s.lastName}`).join('; ');
  }
}
