import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Subject} from '../models/subject.model';
import {UserRepository} from '../repositories/user-repository.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {finalize} from "rxjs";

@Component({
  selector: 'app-student-cources',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './student-cources.component.html',
  styleUrl: './student-cources.component.scss'
})
export class StudentCourcesComponent implements OnInit {

  subjectForm = new FormGroup({
    name: new FormControl<string>(''),
    teacher: new FormControl<any>({}),
    students: new FormControl<any>({}),
    materials: new FormControl<string>(''),
    tasks: new FormControl<string>(''),
  });

  coursesData: Array<Subject> = [];

  showCoursePage = true;
  showAddSubjectForm = false;
  selectedCourse: Subject = new Subject();
  showSuccessfulAddSubjectForm: boolean = false;

  constructor(private readonly userRepository: UserRepository) {
  }

  ngOnInit() {
    this.userRepository.fetchAllCoursesForStudentToEnroll().subscribe((response) => {
      this.coursesData = response;
    })
  }

  onAddClick(course: Subject): void {
    this.selectedCourse = course;
    this.showAddSubjectForm = true;
  }

  onCancelClick(): void {
    this.showAddSubjectForm = false;
    this.showCoursePage = true;
  }

  onSubmitCourse(): void {
    this.userRepository.enrollStudentForSubject(this.selectedCourse)
      .pipe(finalize(() => {
        this.showAddSubjectForm = false;
        this.showCoursePage = true;
      }))
      .subscribe(() => {
        this.coursesData = this.coursesData.filter(s => s.id !== this.selectedCourse.id);
        this.showSuccessfulAddSubjectForm = true;
        this.showCoursePage = false;
      })
  }

  onOkClick() {
    this.showSuccessfulAddSubjectForm = false;
    this.showCoursePage = true;
  }
}
