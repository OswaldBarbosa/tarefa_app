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

  public updateTask(index: number, value: string, date: string) {
    let task : Task = this.tasks[index]
    task.value = value

    task.date = new Date(date)
    this.tasks.splice(index, 1, task )
  }

  public deleteTask(index: number) {
    this.tasks.splice(index, 1)
  }

}

interface Task {
  value: string;
  date: Date;
  done?: boolean;
}
