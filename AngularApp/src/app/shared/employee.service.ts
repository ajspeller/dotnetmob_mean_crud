import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Employee } from '../employees/employee.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUpdated = new Subject<Employee[]>();
  private employees: Employee[] = [];
  readonly baseURL = environment.apiUrl;

  constructor(public http: HttpClient, private router: Router) {}

  postEmployee(employee: Employee) {
    return this.http
      .post<{ message: string; employeeId: string }>(this.baseURL, employee)
      .subscribe(status => {
        employee.id = status.employeeId;
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
        this.router.navigate(['/']);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  getEmployee(employeeId: string) {
    return this.http.get<any>(`${this.baseURL}/${employeeId}`);
  }

  getEmployees() {
    return this.http
      .get<any>(this.baseURL)
      .pipe(
        map(employeeData => {
          return employeeData.map(employee => {
            return {
              id: employee._id,
              firstName: employee.firstName,
              middleName: employee.middleInitial,
              lastName: employee.lastName,
              dob: employee.dob,
              email: employee.email,
              phone: employee.phone,
              position: employee.position,
              office: employee.office,
              salary: employee.salary
            };
          });
        })
      )
      .subscribe(transformedEmployees => {
        this.employees = transformedEmployees;
        this.employeesUpdated.next([...this.employees]);
        console.log(this.employees);
      });
  }

  updateEmployee(employee: Employee) {
    console.log('update>>>>>>>');
    console.log(employee);
    return this.http
      .put<Employee>(`${this.baseURL}/${employee.id}`, employee)
      .subscribe(response => {
        console.log(response);
        const updatedEmployees = [...this.employees];
        const oldEmployeeIndex = updatedEmployees.findIndex(
          e => e.id === employee.id
        );
        updatedEmployees[oldEmployeeIndex] = employee;
        this.employees = updatedEmployees;
        this.employeesUpdated.next([...this.employees]);
        this.router.navigate(['/']);
      });
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`).subscribe(() => {
      const updatedEmployees = this.employees.filter(
        employee => employee.id !== id
      );
      this.employees = updatedEmployees;
      this.employeesUpdated.next([...this.employees]);
    });
  }
}
