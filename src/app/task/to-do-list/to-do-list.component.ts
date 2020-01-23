import { Component, OnInit, OnChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService } from '../shared/task.service';
import { TaskModel } from '../shared/task.model';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnChanges {
  ngOnChanges(): void {
    this.taskService.getAll()
    .subscribe(resp => {
      this.todo = resp
    })
  }
  
  todo: TaskModel[];

  doing = [];

  done = [];

  constructor(private taskService: TaskService) { 
    this.taskService.getAll()
    .subscribe(resp => {
      this.todo = resp
    })
  }

  ngOnInit() {
    TaskService.emmiterTask.subscribe(
      res => {
        this.todo.push(res)
      }
    )
    TaskService.getUpdateEmmiterTask.subscribe(data => {
      this.taskService.getAll()
        .subscribe(resp => {
          this.todo = resp
        })
    }
    )
  }

  updateTask(item, value) {
    this.taskService.getById(value.id)
    .subscribe(resp => {
      TaskService.updateEmmiterTask.emit(resp);
    })
  }

  deleteTask(item, value) {
    this.taskService.deleteTask(value.id)
    .subscribe(res => this.taskService.getAll().subscribe(resp => this.todo = resp))
  }

  drop(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
