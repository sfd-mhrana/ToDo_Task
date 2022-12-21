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
  subTasks?: FormArray;

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
    
    this.subTasks.removeAt(0);
    taskdata.sub_task.forEach(f => {
      const ctrl = this.fb.control(f, Validators.required);
      (this.dataForm?.get('sub_task') as FormArray).push(ctrl);
    });
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
      sub_task: this.fb.array([
        this.createStringElement()
      ]),
    });
    this.subTasks = this.dataForm.get('sub_task') as FormArray;
  }

  onSubmit() {
    if (this.dataForm.invalid || parseInt(this.dataForm.value.title.length)>100|| parseInt(this.dataForm.value.description.length)>150) {
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

  createStringElement() {
    return this.fb.control('', Validators.required);
  }

  onAddNewFormString(formControl: string) {
    (this.dataForm?.get(formControl) as FormArray).push(this.createStringElement());
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'sub_task': {
        formDataArray = this.subTasks;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }

}
