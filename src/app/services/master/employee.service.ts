import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHandlerService } from '../api-handler.service';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiHandler: ApiHandlerService, private log: LogService) { }

  login(login: any): Observable<any> {
    const requestUrl = `employees/login`;
    return this.apiHandler.postRequest(requestUrl, login, 'employee master : login', true, true);
  }

  getEmployeeslist() {
    const requestUrl = `employees/list`;
    return this.apiHandler.getRequest(requestUrl, null, 'employee master : list');
  }

  getEmployeeDropdown() {
    const requestUrl = `employees`;
    return this.apiHandler.getRequest(requestUrl, null, 'employee master : dropdown');
  }

  getEmployee(employeeId: string) {
    const requestUrl = `employees/${employeeId}`;
    return this.apiHandler.getRequest(requestUrl, null, 'employee master : get');
  }

  getSoftwareRightsList() {
    const requestUrl = `employees/rights-group/list`;
    return this.apiHandler.getRequest(requestUrl, null, 'rights group:get');
  }

  saveEmployee(employee: any) {
    const requestUrl = `employees`
    return this.apiHandler.postRequest(requestUrl, employee, 'employee master : get')
  }

  updateEmployee(code: string, employee: any) {
    const requestUrl = `employees/${code}`;
    return this.apiHandler.putRequest(requestUrl, employee, 'employee-master :update');
  }

  generateEmployeeCode() {
    const requestUrl = `employees/generate-code`;
    return this.apiHandler.getRequest(requestUrl);
  }





}
