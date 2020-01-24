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
  public textError: string;
  public editValid: boolean = false;
  public valueUpdate: TaskModel;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = fb.group({
      id: [Math.random().toFixed(3), Validators.required],
      title: [ '', Validators.required ],
      description: ['', Validators.required]
    })

   }

  ngOnInit() {
    TaskService.updateEmmiterTask.subscribe(res => {
      this.taskForm.controls['id'].setValue(res.id);
      this.taskForm.controls['title'].setValue(res.title);
      this.taskForm.controls['description'].setValue(res.description);
      
      this.editValid = true;
    })
  }

  ngSubmit(form: NgForm){

    const createBody: TaskModel = {
      id: this.taskForm.value.id,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description
    }
    
    if(this.editValid) {
      this.taskService.updateTask(createBody)
      .subscribe(res => {
        TaskService.getUpdateEmmiterTask.emit(res)
      })
      this.taskService.getAll().subscribe(res => {
        this.editValid = false
        this.taskForm.controls['id'].setValue(Math.random().toFixed(3));
      })
    } else {
        this.taskService.storeTask(createBody).subscribe(e => {
          TaskService.emmiterTask.emit(e)
          this.taskForm.controls['id'].setValue(Math.random().toFixed(3));
        })
      }
      
    form.form.markAsPristine();
    form.resetForm();

  }

}
