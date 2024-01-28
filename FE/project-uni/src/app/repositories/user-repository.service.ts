import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/subject.model";
import {UserService} from "../services/user.service";

@Injectable({providedIn: 'root'})
export class UserRepository {
  private readonly LOCALHOST_PREFIX: string = "http://localhost:8080";
  private readonly USERS: string = "users";
  private readonly SUBJECTS: string = "subjects";

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  registerUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.LOCALHOST_PREFIX}/${this.USERS}/register`, user)
      .pipe(map((response: User | undefined) => new User(response)))
  }

  loginUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.LOCALHOST_PREFIX}/${this.USERS}/login`, user)
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.LOCALHOST_PREFIX}/${this.USERS}/newuser`, newUser);
  }

  addCourse(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.LOCALHOST_PREFIX}/${this.SUBJECTS}/add-subject`, subject)
      .pipe(map(s => new Subject(s)));
  }


  fetchAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.LOCALHOST_PREFIX}/${this.USERS}/get-all`)
      .pipe(map(users => users.map(u => new User(u))))
  }

  fetchAllCourses(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.LOCALHOST_PREFIX}/${this.SUBJECTS}/fetch-subjects/${this.userService.getCurrentUsername() || ''}`)
      .pipe(map(subjects => subjects.map(s => new Subject(s))))
  }

  fetchAllCoursesForStudentToEnroll(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.LOCALHOST_PREFIX}/${this.SUBJECTS}/fetch-subjects/students/${this.userService.getCurrentUsername() || ''}`)
      .pipe(map(subjects => subjects.map(s => new Subject(s))))
  }

  fetchAllCoursesForStudent(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.LOCALHOST_PREFIX}/${this.SUBJECTS}/fetch-subjects/students/included/${this.userService.getCurrentUsername() || ''}`)
      .pipe(map(subjects => subjects.map(s => new Subject(s))))
  }

  enrollStudentForSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.LOCALHOST_PREFIX}/${this.SUBJECTS}/enroll-to-course/${this.userService.getCurrentUsername() || ''}`, subject)
      .pipe(map(s => new Subject(s)));
  }

  deleteCourse(subject: Subject): Observable<void> {
    return this.http.delete<void>(`${this.LOCALHOST_PREFIX}/${this.SUBJECTS}/delete/${subject.id}`);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.LOCALHOST_PREFIX}/${this.USERS}/update-user`, user)
      .pipe(map(u => new User(u)));
  }

  editCourse(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.LOCALHOST_PREFIX}/${this.SUBJECTS}/update-course`, subject)
      .pipe(map(s => new Subject(s)));
  }

}
