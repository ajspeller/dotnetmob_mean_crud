import { Employee } from './../shared/employee.model';
import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

declare const M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(public service: EmployeeService) {}

  ngOnInit() {
    this.resetForm();
    this.getEmployees();
  }

  onSubmit(form: NgForm) {
    if (form.value._id) {
      this.service.updateEmployee(form.value).subscribe(res => {
        M.toast({
          html: 'Update successful!',
          classes: 'rounded'
        });
      });
    } else {
      this.service.postEmployee(form.value).subscribe(res => {
        this.getEmployees();
        this.resetForm(form);
        M.toast({
          html: 'Save successful!',
          classes: 'rounded'
        });
      });
    }
  }

  getEmployees() {
    this.service.getEmployees().subscribe(employees => {
      console.log('loaded data');
      console.log(employees);
      this.service.employees = employees;
    });
  }

  onEdit(employee: Employee) {
    this.service.selectedEmployee = employee;
  }

  onDelete(employee: Employee) {
    this.service.deleteEmployee(employee._id).subscribe(res => {
      this.resetForm();
      M.toast({
        html: 'Delete successful!',
        classes: 'rounded'
      });
      this.service.employees = this.service.employees.filter(
        emp => emp._id !== employee._id
      );
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }

    this.service.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: null
    };
  }
}
