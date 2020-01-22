import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TaskModel } from './task.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  static emmiterTask = new EventEmitter();

  private apiPath: string = 'api/task';

  constructor( public http: HttpClient ) { }

  getAll(): Observable<TaskModel[]> {
    return this.http.get(this.apiPath)
    .pipe(
      map(this.jsonDataToTasks)
    )
  }

  storeTask(task: {}): Observable<TaskModel> {
    return this.http.post(this.apiPath, task)
    .pipe(
      map(this.jsonDataToTask)
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
