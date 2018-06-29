import { TestBed, inject } from '@angular/core/testing';

import { Shared\employeeService } from './shared\employee.service';

describe('Shared\employeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Shared\employeeService]
    });
  });

  it('should be created', inject([Shared\employeeService], (service: Shared\employeeService) => {
    expect(service).toBeTruthy();
  }));
});
