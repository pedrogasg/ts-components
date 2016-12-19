import { Injectable } from '@angular/core';


export interface TaskInterface {
  title: string,
  done: boolean,
}

@Injectable()
export class TaskService {
  private tasks: TaskInterface[];
  constructor() {
    this.tasks = [
      {title: 'Task 1', done: false},
      {title: 'Task 2', done: false},
      {title: 'Task 3', done: true},
      {title: 'Task 4', done: false}
    ];
   }
   addTask(title: string) {
    this.tasks.push({ title: title, done: false});
   }
   getAllTasks():  TaskInterface[] {
     return this.tasks;
   }

}
