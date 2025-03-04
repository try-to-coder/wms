import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { DispatchService } from 'src/app/services/transaction/dispatch.service';
import { PickListService } from 'src/app/services/transaction/pick-list.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-dispatch-order',
  templateUrl: './dispatch-order.component.html',
  styleUrls: ['./dispatch-order.component.scss']
})
export class DispatchOrderComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  subscription: Subscription = new Subscription();

  completedPickList: any[] = [];

  isTableDataRetrieved = false;

  warehouseDropdown: any[] = [];
  isAccessWarehouseDropdown = true;

  filterWareHouseCode = '';
  filterDate: any = {};

  constructor(private route: Router,
    private log: LogService,
    private alert: AlertService,
    private warehouseApi: WarehouseService,
    private utility: UtilityService,
    private dataTable: DataTableService,
    private pickListApi: PickListService,
    private dispatchApi: DispatchService) {
    this.onPreInit()
  }

  onPreInit() { }

  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.onPageReady();
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {
    this.getBasicUtility();
    this.getWarehouseList();
  }

  getWarehouseList() {
    this.subscription.add(
      this.warehouseApi.gerWarehouseDropdown().subscribe({
        next: response => {
          this.log.log('warehouse response : ', response);
          const warehouseList: any = response || [];
          if (!warehouseList?.length) {
            this.alert.toastAlert('warning', 'Add warehouse before view GRN List');
            this.warehouseDropdown = [];
            return;
          }
          this.setWarehouse(warehouseList);
        },
        error: error => { this.log.error(error, 'grn-list', 'getWarehouseList'); }
      })
    );
  }

  setWarehouse(list: any[] = []) {
    const warehouseList = list;
    this.warehouseDropdown = this.utility.getSelectOptions(warehouseList || [], 'Warehouse_Code', 'Warehouse_Name');
    if (!this.filterWareHouseCode) {
      this.filterWareHouseCode = warehouseList[0]?.Warehouse_Code || '';
    }
    this.getPickListCompletedList();
  }

  onFilterClick() {
    this.isTableDataRetrieved = false;
    this.getPickListCompletedList();
  }

  onCreatePutAway() {
    // this.route.navigateByUrl('/grn/import');
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  onWarehouseChange(warehouse: string) {
    if (!warehouse) {
      return;
    }

    this.isTableDataRetrieved = false;
    this.getPickListCompletedList(true);
  }

  getPickListCompletedList(isReRender = false) {
    const filterObject = {
      Warehouse_Code: this.filterWareHouseCode || '',
      Picklist_Status: Master.pickListStatus.completed,
      // From_Date: this.filterDate.fromDate,
      // To_Date: this.filterDate.toDate
    };
    this.subscription.add(
      this.pickListApi.getPickList(filterObject).subscribe({
        next: response => {
          this.log.log('dispatch list response => ', response);
          const list = response || [];
          this.setDispatchList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'dispatch-list', 'getPickListCompletedList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    );
  }

  setDispatchList(list: any[], isReRender = false): void {
    this.completedPickList = list || [];

    if (this.completedPickList.length) {
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
  }

  reRender() {
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

  onPickListRowClick(pickList: any) {
    const pickListDetail = pickList || {};
    if (!pickListDetail.Picklist_Number) {
      this.log.log('Pick list number is empty');
      return;
    }

    localStorage.setItem('pick-list-number', pickListDetail.Picklist_Number);
    this.route.navigateByUrl('/dispatch/order-detail');
  }

  openDispatchOrderDetail() {

  }

  closeDispatchOrderDetail() {

  }

  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions();
    this.filterDate = this.utility.getDateList(Master.dateOption.thisWeek);
  }

  onDispatchSelect(dispatch: any) {
    this.log.log('dispatch : ', dispatch);
    const selectedDispatch = dispatch || {};

    if (!selectedDispatch.Dispatch_Number) {
      this.log.log('Dispatch Number is empty !!!');
      return;
    }

    // 
    localStorage.setItem('grn-number', selectedDispatch.GRN_Number);
    this.navigateToDetail();
  }

  navigateToDetail() {
    this.route.navigateByUrl('grn/detail');
  }

  onDispatchOrder() {
    this.route.navigateByUrl('dispatch/order');
  }

  navigateBack() {
    this.route.navigateByUrl('/dispatch');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    this.subscription.unsubscribe();
  }

}
