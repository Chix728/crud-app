import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { elementAt } from 'rxjs';
import { CoreService } from '../services/core.service';
import { EmployeeService } from '../services/employee.service';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-empl-add-edit',
  templateUrl: './empl-add-edit.component.html',
  styleUrls: ['./empl-add-edit.component.scss'],
})
export class EmplAddEditComponent implements OnInit {
  empForm: FormGroup;
  constructor(
    private _ef: FormBuilder,
    private _employeeService: EmployeeService,
    private _dialogref: MatDialogRef<EmplAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _core:CoreService
  ) {
    this.empForm = this._ef.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      technology: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  startDate = new Date(1990, 0, 1);
  foods: Food[] = [
    { value: 'FullStack', viewValue: 'Full Stack' },
    { value: 'FronEnd', viewValue: 'Front End' },
    { value: 'BackEnd', viewValue: 'Back End' },
  ];
  OnSave() {
    if (this.empForm.valid) {
      if (this.data) {
        this._employeeService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(res)=>{

            this._core.OpenSnackBar("Updated Sucessfully!",'Done');
            this._dialogref.close(true);
          }
        })

        console.log(this.empForm.value);
      }
      else{
        this._employeeService.addEmployee(this.empForm.value).subscribe({
          next: (value: any) => {
            this._core.OpenSnackBar("Added Sucessfully!",'Ok');
            this._dialogref.close(true);
          },
          error: (error: any) => {
            console.error(error);
          },
        });
      }
    }
  }
}
