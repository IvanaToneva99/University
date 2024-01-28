import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {HomePageComponent} from '../home-page/home-page.component';
import {LoginPageComponent} from '../login-page/login-page.component';
import {User} from "../models/user.model";
import {UserRoles} from "../models/user-roles.enum";
import * as uuid from 'uuid';
import {UserRepository} from "../repositories/user-repository.service";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HomePageComponent, LoginPageComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

  passwordError: boolean = false;
  emailErrorMessage: string = 'Имейлът трябва да изглежда така: abc_1@gmail.com';
  errorMessage: string = '';

  readonly USER_ROLES = UserRoles;

  registrationForm = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(new RegExp('^[A-Za-z][A-Za-z0-9_]{1,10}$')),
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(new RegExp('^[A-Za-z][A-Za-z0-9_]{1,10}$')),
    ]),
    userName: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}$')),
    ]),
    email: new FormControl<string>('', [Validators.pattern(new RegExp('^[A-Za-z][A-Za-z0-9_]+@[A-Za-z][A-Za-z0-9_]')), Validators.required]),
    password: new FormControl<string>('', [Validators.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')), Validators.required]),
    repeatPassword: new FormControl<string>('', [Validators.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')), Validators.required]),
    role: new FormControl<string>('')
  });

  constructor(private readonly router: Router,
              private readonly userRepository: UserRepository) {
  }

  public onRegister(): void {
    if (!!(this.registrationForm.controls.userName.errors || {})['pattern'] || !!(this.registrationForm.controls.email.errors || {})['pattern'] ||
      !!(this.registrationForm.controls.password.errors || {})['pattern'] || !!(this.registrationForm.controls.repeatPassword.errors || {})['pattern']) {
      this.errorMessage = 'Трябва да въведете всички данни за регистрация!';
      return;
    }

    if (this.registrationForm.controls.password.value !== this.registrationForm.controls.repeatPassword.value) {
      this.passwordError = true;
    }

    if (this.registrationForm.controls.userName.invalid || this.registrationForm.controls.email.invalid ||
      this.registrationForm.controls.password.invalid || this.registrationForm.controls.repeatPassword.invalid) {
      return;
    }

    const user: User = new User();
    user.id = uuid.v4();
    user.username = this.registrationForm.controls.userName.value || '';
    user.password = this.registrationForm.controls.password.value || '';
    user.email = this.registrationForm.controls.email.value || '';
    user.role = this.registrationForm.controls.role.value || this.USER_ROLES.STUDENT.toString();
    user.firstName = this.registrationForm.controls.firstName.value || '';
    user.lastName = this.registrationForm.controls.lastName.value || '';
    this.userRepository.registerUser(user).subscribe(() => {
      this.router.navigateByUrl('login-page');
      this.errorMessage = '';
    }, (err) => {
      this.errorMessage = err.error.message;
    });
  }

  haveAProfile(): void {
    this.router.navigateByUrl('login-page');
  }
}
