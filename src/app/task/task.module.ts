import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskRoutingModule } from './task-routing.module';



@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TaskRoutingModule
  ],
  exports: [
    TaskComponent
  ]
})
export class TaskModule { }
