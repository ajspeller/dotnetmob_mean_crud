import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Employee } from '../employee.model';
import { EmployeeService } from './../../shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private subscriptons = new Subscription();

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees();
    this.subscriptons.add(
      this.employeeService
        .getEmployeeUpdateListener()
        .subscribe((employees: Employee[]) => {
          this.employees = employees;
          console.log(`subject responded`);
        })
    );
  }

  onEmployeePut(employee: Employee) {}

  onEmployeeDelete(id: string) {
    this.employeeService.deleteEmployee(id);
  }

  ngOnDestroy(): void {
    this.subscriptons.unsubscribe();
  }
}
