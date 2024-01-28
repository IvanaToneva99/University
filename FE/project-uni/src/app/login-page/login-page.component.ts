import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {HomePageComponent} from '../home-page/home-page.component';
import {User} from "../models/user.model";
import {UserRepository} from "../repositories/user-repository.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HomePageComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  public errorMessage: string = '';
  public isLoginButtonVisible: boolean = false;
  public isLogoutButtonVisible: boolean = false;

  loginForm = new FormGroup({
    userName: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(new RegExp('^[A-Za-z][A-Za-z0-9_]{7,29}$')),
    ]),
    password: new FormControl<string>('', [Validators.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')), Validators.required]),
  });

  constructor(private router: Router,
              private userRepository: UserRepository,
              private userService: UserService) {
  }

  public onLogin(): void {

    if (!!(this.loginForm.controls.userName.errors || {})['pattern'] || !!(this.loginForm.controls.password.errors || {})['pattern']) {
      this.errorMessage = 'Липсват данни за вход!';
      return;
    }

    if (this.loginForm.controls.userName.touched) {
      this.errorMessage = '';
    }

    if (!this.loginForm.controls.userName.valid || !this.loginForm.controls.password.valid) {
      return;
    }

    const user: User = new User();
    user.username = this.loginForm.controls.userName.value || '';
    user.password = this.loginForm.controls.password.value || '';

    this.userRepository.loginUser(user).subscribe((response: User) => {
      this.userService.loginUser(response);
      this.router.navigateByUrl('main-page');
      this.isLoginButtonVisible = false;
      this.isLogoutButtonVisible = true;
    }, (err) => {
      this.errorMessage = err.error.message;
    })

  }

  public onRegistration(): void {
    this.router.navigateByUrl('register-page');
  }
}
