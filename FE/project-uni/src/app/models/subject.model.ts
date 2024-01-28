import {User} from "./user.model";

export class Subject {
  id: string = '';
  name: string = '';
  tasks: string = '';
  materials: string = '';
  teacher: User = new User();
  students: Array<User> = [];

  constructor(subject?: Subject) {
    if (subject) {
      this.id = subject.id;
      this.name = subject.name;
      this.tasks = subject.tasks;
      this.materials = subject.materials;
      this.teacher = new User(subject.teacher);
      this.students = (subject.students || [])
        .map(student => new User(student))
    }
  }

}
