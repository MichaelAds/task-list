import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TaskModel } from './task.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskModule } from '../task.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  static emmiterTask = new EventEmitter();
  static updateEmmiterTask = new EventEmitter();
  static getUpdateEmmiterTask = new EventEmitter();

  private apiPath: string = 'http://localhost:4200/api/task';

  constructor( public http: HttpClient ) { }

  getAll(): Observable<TaskModel[]> {
    return this.http.get(this.apiPath)
    .pipe(
      map(this.jsonDataToTasks)
    )
  }

  getById(id): Observable<TaskModule> {
    const url = `${this.apiPath}/${id}`

    return this.http.get(url)
    .pipe(
      map(this.jsonDataToTask)
      )
  }

  storeTask(task: {}): Observable<TaskModel> {
    return this.http.post(this.apiPath, task)
    .pipe(
      map(this.jsonDataToTask)
    )
  }

  updateTask(task: TaskModel): Observable<TaskModel> {
    const url = `${this.apiPath}/${task.id}`;
    return this.http.put(url, task)
    .pipe(
      map(() => task)
    )
  }

  
  deleteTask(id): Observable<any> {
    const url = `${this.apiPath}/${id}`
    return this.http.delete(url)
    .pipe(
      map(()=> null)
    )
  }

  private jsonDataToTasks(jsonData: any[]): TaskModel[] {
    const tasks: TaskModel[] = [];
    jsonData.forEach(e => tasks.push(e as TaskModel));
    return tasks;
  }

  private jsonDataToTask(jsonData: any): TaskModel {
    return jsonData as TaskModel;
  }
}
