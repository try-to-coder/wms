import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject, Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { IEmployee } from 'src/app/interfaces/employee';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { EmployeeService } from 'src/app/services/master/employee.service';

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.scss']
})
export class EmployeeMasterComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  employeeMaster: IEmployee = {} as IEmployee

  employeeList: any[] = [];

  // for unsubscribe observable
  subscription: Subscription = new Subscription();

  selectedEmployeeId = '';
  isTableDataRetrieved = false;

  constructor(
    private route: Router,
    private employee: EmployeeService,
    private log: LogService,
    private dataTable: DataTableService) {
    this.onPreInit();
  }

  onPreInit() {

  }

  /**
   * check authorization
   */
  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.getBasicUtility();
      this.onPageReady();
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {
    this.getEmployeeList();
  }

  getEmployeeList(isReRender = false) {
    this.subscription.add(
      this.employee.getEmployeeslist().subscribe({
        next: response => {
          this.log.log('employee list response : ', response);
          const list = response || [];
          this.setEmployeeList(list, isReRender);
          // this.employeeList = response || [];
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'employee-master', 'getEmployeeList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    );
  }

  setEmployeeList(employees: any[], isReRender = false): void {
    this.employeeList = employees || [];

    if (this.employeeList.length) {
      if (!isReRender) {
        this.dtTrigger.next();
        if (!(jQuery('table').parents('.dataTables_scroll').length)) {
          const timeOutID = setTimeout(() => {
            jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
          }, 100);
        }
      } else {
        this.reRender();
      }
    }
    // else if (!isReRender) {
    //   this.dtTrigger.next();
    // }
  }

  onEditEmployee(employee: any) {
    this.log.log('selected employee', employee);
    const selectedEmployee = employee || {}
    if (!selectedEmployee.Employee_Master_Id) {
      this.log.log('employee list is Empty');
      return;
    }
    this.selectedEmployeeId = selectedEmployee.Employee_Master_Id;
    this.openEmployeeModal();
  }

  onAddEmployee() {
    this.selectedEmployeeId = '';
    this.openEmployeeModal();
  }

  openEmployeeModal() {
    document.getElementById('employee-detail-open-modal')?.click();
  }

  closeEmployeeModal(isRefresh = false) {
    document.getElementById('employee-detail-close-modal')?.click();
    this.selectedEmployeeId = '';

    if (isRefresh) {
      this.getEmployeeList(true);
    }
  }

  reRender(): void {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to re render again
        this.dtTrigger.next();
        const timeOutID = setTimeout(() => {
          jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
        }, 100);
      });
    } else {
      this.dtTrigger.next();
      if (!(jQuery('table').parents('.dataTables_scroll').length)) {
        const timeOutID = setTimeout(() => {
          jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
        }, 100);
      }
    }
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }
  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions();
  }

  navigateBack() {
    this.route.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    this.subscription.unsubscribe();
  }

}
