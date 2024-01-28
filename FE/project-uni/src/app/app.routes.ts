import {Routes} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReferenceComponent } from './reference/reference.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StudentCourcesComponent } from './student-cources/student-cources.component';
import { UsersPageComponent } from './users-page/users-page.component';

export const routes: Routes = [
    {path: 'home-page', component: HomePageComponent}
    ,{path: '', redirectTo: '/home-page', pathMatch: 'full'},
    {path: 'login-page', component: LoginPageComponent},{path: 'register-page', component: RegisterPageComponent},
    {path: 'main-page', component: MainPageComponent}, {path: 'student-cources-page', component: StudentCourcesComponent}, 
    {path: 'reference-page', component: ReferenceComponent}, {path: 'users-page', component: UsersPageComponent}];
