import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/interface/task.interface';

@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.scss']
})
export class TaskComponentComponent {
  constructor(public dialogRef: MatDialogRef<TaskComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }) { 
    }

  closeDialog() {
    this.dialogRef.close('close');
  }
  editDialog(id) {
    this.dialogRef.close({type:'edit',id:id});
  }

  priority(value){
    if(value=="low") return "Low"
    if(value=="medium") return "Medium"
    if(value=="high") return "High"
    return 0;
  }

  getStatus(value){
    if(value==1) return "TO-Do"
    if(value==2) return "In-Progress"
    if(value==3) return "Done"
    return 0;
  }

  getAssignedPerson(value){
    if(value=="p1") return "Person 1"
    if(value=="p2") return "Person 2"
    if(value=="p3") return "Person 3"
    return 0;
  }
}
