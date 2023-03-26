import {Component, Input, OnInit ,Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Employee} from '../employee';
import {EmployeeService, ACTION_TYPE} from '../employee.service';

import {EmployeeDialogComponent} from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  @Input() employee: Employee;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  reportArray: Array<Employee>;
  directReportArray: Array<Employee>;


  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
  }

  /**
   * Recursion method to find all direct and indirect reports of the given employee 
   * @param employee The employee to be queried 
   */
  getAllReports(employee: Employee) {
    if (employee.directReports !== undefined){
      employee.directReports.forEach(eId => {
        this.employeeService.get(eId).subscribe(e => {
          this.getAllReports(e);
          this.reportArray.push(e);
        });
      });
    }
  }
  
  /**
   * Find all direct reports of the given employee 
   * @param employee The employee to be queried 
   */
  getDirectReports(employee: Employee) {
    if (employee.directReports !== undefined){
      employee.directReports.forEach(eId => {
        this.employeeService.get(eId).subscribe(e => {
          this.directReportArray.push(e);
        })
      })
    }
  }

  ngOnInit() {
    this.reportArray = [];
    this.directReportArray = [];
    this.getAllReports(this.employee);
    this.getDirectReports(this.employee);
  }

  
  onEditClick(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '300px',
      data: {
        employee: employee,
        type: ACTION_TYPE.UPDATE,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.edit.emit(data);
      }
    });
  }
  

  onDeleteClick(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '300px',
      data: {
        employee: employee,
        type: ACTION_TYPE.DELETE,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.delete.emit(data);
      }
    });
  }
}
