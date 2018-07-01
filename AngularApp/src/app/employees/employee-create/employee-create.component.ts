import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  firstName = '';
  middleInitial = '';
  lastName = '';
  dob = '';
  email = '';
  phone = '';
  position = '';
  office = '';
  salary = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}
  onAddEmployee(form: NgForm) {
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
    this.employeeService.postEmployee(employee);
    form.resetForm();
  }
}
