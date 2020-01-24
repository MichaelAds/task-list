import { Component, OnInit, OnChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
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

  public listTask: TaskModel[] = [];

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
      console.log(data)
      this.todo.forEach((o,i) => {
        if(o.id === data.id) {

          this.todo[i].title = data.title
          this.todo[i].description = data.description

          console.log(this.todo)
        }
      })

      // this.taskService.getAll()
      //   .subscribe(resp => {
      //     this.listTask = resp;
      //     this.sortList();
          
      //   })
      //   this.todo = this.listTask; 
        console.log(this.todo)
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
    this.listTask.forEach((obj_listTask, key_listTask) => {
      console.log(key_listTask)
      this.doing.forEach((obj_doing, key__doing) =>{ 
        if (obj_listTask.id === obj_doing.id){
          this.listTask.splice(key_listTask, obj_listTask.id)
          console.log(this.listTask)
        }
      });

      this.done.forEach((obj_done, key__done) =>{ 
        if (obj_listTask.id === obj_done.id){
          this.listTask.splice(key_listTask, obj_listTask.id)
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
