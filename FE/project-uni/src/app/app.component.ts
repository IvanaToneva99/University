import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import {HomePageComponent} from "./home-page/home-page.component";
import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HomePageComponent, LoginPageComponent, CommonModule, RegisterPageComponent, MainPageComponent, RouterOutlet]
})
export class AppComponent {
  title = 'project-uni';

  constructor(private readonly router: Router,
              private readonly userService: UserService) {
  }

  ngOnInit() {
  }

  showLoginForm(): void {
    this.router.navigateByUrl('login-page');
  }

  showRegisterForm(): void {
    this.router.navigateByUrl('register-page');
  }

  onLogOutButton(): void {
    this.userService.logoutUser();
    this.router.navigate(['']);
  }

  shouldShowLogOutButton(): boolean {
    return this.userService.isUserLoggedIn();
  }

  onMainPageClick(): void {
    if (this.userService.isUserLoggedIn()) {
      this.router.navigateByUrl('main-page');
    } else {
      this.router.navigateByUrl('home-page');
    }
  }
}
