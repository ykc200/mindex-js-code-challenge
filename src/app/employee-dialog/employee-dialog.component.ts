import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms';

import {Employee} from '../employee';
import {ACTION_TYPE} from '../employee.service';


@Component({
    selector: 'app-employee-dialog',
    templateUrl: './employee-dialog.component.html',
    styleUrls: ['./employee-dialog.component.css']
})

export class EmployeeDialogComponent implements OnInit {
    employee : Employee;
    actionType : ACTION_TYPE;
    form : FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EmployeeDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { type: ACTION_TYPE, employee: Employee}, 
        private fb: FormBuilder) {
          this.actionType = data.type;
          this.employee = data.employee;
    }

    ngOnInit(){
        if (this.actionType === ACTION_TYPE.UPDATE){
            this.form = this.fb.group({
                id: [this.employee.id],
                lastName: [this.employee.lastName, Validators.required],
                firstName: [this.employee.firstName, Validators.required],
                position: [this.employee.position, Validators.required],
                compensation: [this.employee.compensation ? this.employee.compensation : null, Validators.required],
                directReports: [this.employee.directReports ? this.employee.directReports : []],
            });
        }
    }

    onCancelClick() {
        this.dialogRef.close();
    }
}
