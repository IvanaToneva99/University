export class User {
  id: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(user?: User) {
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.password = user.password;
      this.email = user.email;
      this.role = user.role;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
    }
  }
}
