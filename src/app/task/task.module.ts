import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskRoutingModule } from './task-routing.module';
import { MaterialModule } from './shared/material.module';
import { InputTaskComponent } from './input-task/input-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoListComponent } from './to-do-list/to-do-list.component';



@NgModule({
  declarations: [TaskComponent, InputTaskComponent, ToDoListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TaskRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TaskComponent
  ]
})
export class TaskModule { }
