import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user-repository.service';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserRoles} from '../models/user-roles.enum';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {

  registrationForm = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
    ]),
    userName: new FormControl<string>('', [
      Validators.required,
    ]),
    email: new FormControl<string>('', [Validators.pattern(new RegExp('^[A-Za-z][A-Za-z0-9_]+@[A-Za-z][A-Za-z0-9_]')), Validators.required]),
    password: new FormControl<string>('', [Validators.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')), Validators.required]),
    repeatPassword: new FormControl<string>('', [Validators.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')), Validators.required]),
    role: new FormControl<string>('')
  });

  public userData: Array<User> = []
  public showEditUserForm = false;
  public showUserPage = true;
  public selectedUser: User = new User();
  public USER_ROLES = UserRoles;

  constructor(private readonly userRepository: UserRepository) {
  }

  ngOnInit() {
    this.userRepository.fetchAllUsers().subscribe((response) => {
      this.userData = response;
    })
  }

  onEditClick(user: User): void {
    this.selectedUser = user;
    this.registrationForm.controls.firstName.setValue(user.firstName || '');
    this.registrationForm.controls.lastName.setValue(user.lastName || '');
    this.registrationForm.controls.userName.setValue(user.username || '');
    this.registrationForm.controls.password.setValue(user.password || '');
    this.registrationForm.controls.email.setValue(user.email || '');
    this.registrationForm.controls.role.setValue(user.role || UserRoles.STUDENT.toString());
    this.showEditUserForm = true;
    this.showUserPage = false;
  }

  onEditUser(): void {
    this.selectedUser.username = this.registrationForm.controls.userName.value || '';
    this.selectedUser.password = this.registrationForm.controls.password.value || '';
    this.selectedUser.email = this.registrationForm.controls.email.value || '';
    this.selectedUser.role = this.registrationForm.controls.role.value || UserRoles.STUDENT.toString();
    this.selectedUser.firstName = this.registrationForm.controls.firstName.value || '';
    this.selectedUser.lastName = this.registrationForm.controls.lastName.value || '';

    this.userRepository.editUser(this.selectedUser).subscribe((response) => {
      this.userData.forEach(user => {
        if (user.id === response.id) {
          user = response;
        }
      })
    });
    this.showEditUserForm = false;
    this.showUserPage = true;
  };

  onCancelClick(): void {
    this.showEditUserForm = false;
    this.showUserPage = true;
  }

  getRoleLabel(userRole: string) {
    switch (userRole) {
      case UserRoles.STUDENT.toString():
        return "Студент"
      case UserRoles.TEACHER.toString():
        return "Преподавател"
      case UserRoles.ADMIN.toString():
        return "Администратор"
      default:
        return ""
    }
  }
}
