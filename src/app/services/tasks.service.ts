import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: any[] = []

  constructor() { }

  public getTasks() {
    return this.tasks
  }

  public addTask(value: string, date: string) {
    date = date.replace("-", "/")
    let task : Task = {value: value, date: new Date(date), done: false}
    this.tasks.push(task)
    console.log(this.tasks);
  }

  public updateTask() {

  }

  public deleteTask() {

  }

}

interface Task {
  value: string;
  date: Date;
  done?: boolean;
}