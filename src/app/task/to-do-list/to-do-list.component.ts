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
  
  public todo: TaskModel[];

  public doing: TaskModel[] = [];

  public done: TaskModel[] = [];

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
          this.todo = resp;
          this.sortList();

          
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

  sortList() {
    this.todo.forEach((obj_todo, key_todo) => {
      this.doing.forEach((obj_doing, key__doing) =>{ 
        if (obj_todo.id === obj_doing.id){
          this.todo.splice(key_todo)
        }
      });

      this.done.forEach((obj_done, key__done) =>{ 
        if (obj_todo.id === obj_done.id){
          this.todo.splice(key_todo)
        }
      });
      
    })
  }

  deleteTask(item, value) {
    this.taskService.deleteTask(value.id)
    .subscribe(res => this.taskService.getAll().subscribe(resp => {
      this.todo = resp
      this.sortList();
    }))
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
