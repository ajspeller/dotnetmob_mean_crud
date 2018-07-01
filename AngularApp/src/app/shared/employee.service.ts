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
    // return this.http.post<Employee>(this.baseURL, employee);
    this.employees.push(employee);
    this.employeesUpdated.next([...this.employees]);
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  getEmployees() {
    // return this.http.get<Employee[]>(this.baseURL);
    return [...this.employees];
  }

  updateEmployee(employee: Employee) {
    return this.http.put<Employee>(`${this.baseURL}/${employee._id}`, employee);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
