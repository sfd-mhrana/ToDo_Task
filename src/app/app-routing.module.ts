import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './shared/add-task/add-task.component';
import { AllTaskComponent } from './shared/all-task/all-task.component';

const routes: Routes = [
  {path:'',component:AllTaskComponent},
  {path:'add',component:AddTaskComponent},
  {path:'edit/:id',component:AddTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
