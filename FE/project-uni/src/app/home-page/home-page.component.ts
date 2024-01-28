import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

import {LoginPageComponent} from '../login-page/login-page.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {RegisterPageComponent} from '../register-page/register-page.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LoginPageComponent, CommonModule, RegisterPageComponent, MainPageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor() {
  }
}
