import {Injectable} from "@angular/core";
import {User} from "../models/user.model";

@Injectable({providedIn: 'root'})
export class UserService {

   private readonly LOGGED_IN_USER: string = 'logged_user';
   private readonly USER_ROLE: string = 'user_role';

   loginUser(user: User): void {
      if (this.isUserLoggedIn()) {
         return;
      }

      console.log(user.role);
      localStorage?.setItem(this.LOGGED_IN_USER, user.username);
      localStorage?.setItem(this.USER_ROLE, user.role);
   }

   logoutUser() {
      localStorage?.removeItem(this.LOGGED_IN_USER);
      localStorage?.removeItem(this.USER_ROLE);
   }

   isUserLoggedIn(): boolean {
      return !!localStorage?.getItem(this.LOGGED_IN_USER);
   }

   getCurrentUserRole(): string {
      return localStorage.getItem(this.USER_ROLE) || '';
   }

   getCurrentUsername(): string {
      return localStorage.getItem(this.LOGGED_IN_USER) || '';
   }

}
