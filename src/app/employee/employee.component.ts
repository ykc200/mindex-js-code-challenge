import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  reportArray: Array<Employee>;
  directReportArray: Array<Employee>;


  constructor(private employeeService: EmployeeService) {
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
    this.edit.emit(employee);
  }

  onDeleteClick(employee: Employee) {
    this.delete.emit(employee);
  }
}
