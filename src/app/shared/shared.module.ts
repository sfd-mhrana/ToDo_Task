import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { TaskComponentComponent } from './task-component/task-component.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AllTaskComponent } from './all-task/all-task.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    TaskComponentComponent,
    AddTaskComponent,
    AllTaskComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],exports:[
    TaskComponentComponent,
    AddTaskComponent
  ]
})
export class SharedModule { }
