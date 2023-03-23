import {Component, Input} from '@angular/core';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  reportArray: Array<number>;

  constructor(private employeeService: EmployeeService) {
  }

  /**
   * Recursion method to find all direct and indirect reports of the given employee 
   * @param employee The employee to be queried 
   */
  getReports(employee: Employee) {
    if (employee.directReports !== undefined){
      employee.directReports.forEach(eId => {
        //console.log("Currently On: " + this.employee.firstName + "'s: " + eId)
        this.reportArray.push(eId)
        this.employeeService.get(eId).subscribe(e => this.getReports(e));
      });
    }
  }

  ngOnInit() {
    this.reportArray = [];
    this.getReports(this.employee);
    console.log(this.reportArray);
  }
}
