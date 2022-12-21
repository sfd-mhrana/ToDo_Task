import { Component, OnInit } from '@angular/core';
import { StatusInterface } from 'src/app/interface/status.interface';
import { Task } from 'src/app/interface/task.interface';
import { RelatedServiceService } from 'src/app/service/related-service.service';
import { Status } from 'src/app/staticdata/status.data';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponentComponent } from '../task-component/task-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss']
})
export class AllTaskComponent implements OnInit {
  taskStatus: StatusInterface[] = Status;

  allTask: Task[];
  constructor(
    private service: RelatedServiceService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.allTask = this.service.getAllData()
    //  console.warn(this.allTask)
  }

  getStatusTask(value) {
    return this.allTask.filter((item) => item.status == value)
  }

  public seeTaskDetails(task: Task) {
    const dialogRef = this.dialog.open(TaskComponentComponent, {
      data: { task },
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if(dialogResult!="close"){
          this.router.navigate(['../', 'edit', dialogResult.id]);
        }
      }
    });
  }
}
