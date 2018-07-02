import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
// import { toPromise } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Employee } from '../employees/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUpdated = new Subject<Employee[]>();
  selectedEmployee: Employee;
  private employees: Employee[] = [];
  readonly baseURL = environment.apiUrl;

  constructor(public http: HttpClient) {}

  postEmployee(employee: Employee) {
    return this.http
      .post<{ message: string; employeeId: string }>(this.baseURL, employee)
      .subscribe(status => {
        employee.id = status.employeeId;
        this.employees.push(employee);
        this.employeesUpdated.next([...this.employees]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
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
    return this.http.put<Employee>(`${this.baseURL}/${employee.id}`, employee);
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
