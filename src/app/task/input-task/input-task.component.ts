import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { TaskService } from '../shared/task.service';
import { TaskModel } from '../shared/task.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.scss']
})
export class InputTaskComponent implements OnInit {
  public taskForm: FormGroup;
  public textError: string;
  public validId: boolean = false;
  public editValid: boolean = false;
  public valueUpdate: TaskModel;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = fb.group({
      id: [ '', [Validators.required] ],
      title: [ '', Validators.required ],
      description: ['', Validators.required]
    })

    // this.taskForm.valueChanges
    // .pipe(debounceTime(1500))
    // .subscribe(res => {
    //   this.taskService.getById(res.id)
    //   .subscribe(e => {
    //     this.taskForm.controls.id.setErrors({invalid: true});
    //     this.textError = 'id ja existe';
    //     this.validId = false;
    //   }, err => this.validId = true)
    // })
   }

  ngOnInit() {
    TaskService.updateEmmiterTask.subscribe(res => {
      this.taskForm.controls['id'].setValue(res.id);
      this.taskForm.controls['title'].setValue(res.title);
      this.taskForm.controls['description'].setValue(res.description);
      
      this.valueUpdate = res;
      this.editValid = true;
      this.validId = true;
    })
  }

  ngSubmit(form: NgForm){

    const createBody: TaskModel = {
      id: this.taskForm.value.id,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description
    }
    
    if(this.editValid) {
      console.log(createBody)
      this.taskService.updateTask(createBody)
      .subscribe(res => {
        console.log(res)
        TaskService.getUpdateEmmiterTask.emit(res)
      })
      this.taskService.getAll().subscribe(res => console.log(res))
    } else {
      console.log('passo aqui')
      
      
      if (this.validId) {
        this.taskService.storeTask(createBody).subscribe(e => TaskService.emmiterTask.emit(e))
        form.form.markAsPristine();
        form.resetForm();
      }
    }


  }

}
