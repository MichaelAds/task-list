import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { TaskService } from '../shared/task.service';
import { TaskModel } from '../shared/task.model';

@Component({
  selector: 'app-input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.scss']
})
export class InputTaskComponent implements OnInit {
  public taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = fb.group({
      id: [ '', Validators.required ],
      title: [ '', Validators.required ],
      description: ['', Validators.required]
    })
   }

  ngOnInit() {
  }

  ngSubmit(form: NgForm){
    const createBody: TaskModel = {
      id: this.taskForm.value.id,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description
    }
    this.taskService.storeTask(createBody).subscribe(e => {
      TaskService.emmiterTask.emit(e)

    });
    form.form.markAsPristine();
    form.resetForm();

  }

}
