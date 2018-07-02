import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { EmployeeService } from './../../shared/employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  private mode = 'create';
  private employeeId: string;
  employee: Employee;


  firstName = '';
  middleInitial = '';
  lastName = '';
  dob = '';
  email = '';
  phone = '';
  position = '';
  office = '';
  salary = '';

  constructor(
    public employeeService: EmployeeService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('employeeId')) {
        this.mode = 'edit';
        this.employeeId = paramMap.get('employeeId');
        this.employeeService
          .getEmployee(this.employeeId)
          .subscribe(employeeData => {
            this.employee = {
              id: employeeData._id,
              firstName: employeeData.firstName,
              middleInitial: employeeData.middleInitial,
              lastName: employeeData.lastName,
              dob: employeeData.dob,
              email: employeeData.email,
              phone: employeeData.phone,
              position: employeeData.position,
              office: employeeData.office,
              salary: employeeData.salary
            };
          });
      } else {
        this.mode = 'create';
        this.employeeId = null;
      }
    });
  }
  onSaveEmployee(form: NgForm) {
    console.log(this.mode);
    console.log(form.value);

    if (form.invalid) {
      return;
    }

    const employee: Employee = {
      id: form.value.id,
      firstName: form.value.firstName,
      middleInitial: form.value.middleInitial,
      lastName: form.value.lastName,
      dob: form.value.dob,
      email: form.value.email,
      phone: form.value.phone,
      position: form.value.position,
      office: form.value.office,
      salary: form.value.salary
    };

    if (this.mode === 'create') {
      this.employeeService.postEmployee(employee);
    } else {
      this.employeeService.updateEmployee(employee);
    }

    // form.resetForm();
  }
}
