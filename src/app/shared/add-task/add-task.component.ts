import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusInterface } from 'src/app/interface/status.interface';
import { RelatedServiceService } from 'src/app/service/related-service.service';
import { Status } from 'src/app/staticdata/status.data';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  id:any;
  // Form Template Ref
  @ViewChild('formElement') formElement: NgForm;
  dataForm: FormGroup;

  //Static Data
  status: StatusInterface[] = Status;

  constructor(
    private fb: FormBuilder,
    private service: RelatedServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.initDataForm()
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getDataByID();
      }
    });
  }

  getDataByID(){
    const taskdata=this.service.getSingledata(this.id);
    this.dataForm.patchValue(taskdata);
  }

  private initDataForm() {
    this.dataForm = this.fb.group({
      id: [this.service.getRandomNumber()],
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      status: [null, Validators.required],
      assigned_person: [null, Validators.required],
      attachment: [null],
      sub_task: this.fb.array([]),
    });
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      alert("Something Wrong")
      return;
    }
    if (this.id) {
      this.service.updateMyData(this.dataForm.value)
    } else {
      this.service.setMyData(this.dataForm.value)
    }
   
    this.formElement.resetForm();
    this.router.navigate(['/']);
  }


  file(event) {
    let elem = event.target;
    if (elem.files.length > 0) {
      var files = [];
      [...elem.files].forEach(file => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          files.push(reader.result)
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      });
      this.dataForm.patchValue({
        attachment: files
      })
      // console.warn(this.dataForm.value)
    }
  }

}
