import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { toPromise } from 'rxjs/operators';
import { Employee } from './employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseURL = environment.apiUrl;

  constructor(public http: HttpClient) {}

  postEmployee(employee: Employee) {
    return this.http.post<Employee>(this.baseURL, employee);
  }

  getEmployees() {
    return this.http.get<Employee[]>(this.baseURL);
  }

  updateEmployee(employee: Employee) {
    return this.http.put<Employee>(`${this.baseURL}/${employee._id}`, employee);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
