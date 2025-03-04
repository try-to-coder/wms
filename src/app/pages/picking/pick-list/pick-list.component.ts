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
import { PickListService } from 'src/app/services/transaction/pick-list.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-pick-list',
  templateUrl: './pick-list.component.html',
  styleUrls: ['./pick-list.component.scss']
})
export class PickListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  subscription: Subscription = new Subscription();

  pickList: any[] = [];
  isTableDataRetrieved = false;

  warehouseDropdown: any[] = [];
  isAccessWarehouseDropdown = true;

  filterWareHouseCode = '';
  filterDate: any = {};

  isOrderTabActive = true;

  constructor(private route: Router,
    private log: LogService,
    private utility: UtilityService,
    private alert: AlertService,
    private warehouseApi: WarehouseService,
    private dataTable: DataTableService,
    private pickingApi: PickListService) {
    this.onPreInit()
  }

  onPreInit() {

  }

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
          this.log.log('response : ', response);
          const warehouseList: any = response || [];
          if (!warehouseList?.length) {
            this.alert.toastAlert('warning', 'Add warehouse before view GRN List');
            this.warehouseDropdown = [];
            return;
          }
          this.setWarehouse(warehouseList);
        },
        error: error => { this.log.error(error, 'grn-list', 'getWarehouseList'); },
        complete: () => { }
      })
    );
  }

  setWarehouse(list: any[] = []) {
    const warehouseList = list;
    this.warehouseDropdown = this.utility.getSelectOptions(warehouseList || [], 'Warehouse_Code', 'Warehouse_Name');
    if (!this.filterWareHouseCode) {
      this.filterWareHouseCode = warehouseList[0]?.Warehouse_Code || '';
    }

    if (this.isOrderTabActive) {
      this.getSaleOrder();
    }
    else {
      this.getPickingList();
    }
  }

  onFilterClick() {
    this.isTableDataRetrieved = false;
    if (this.isOrderTabActive) {
      this.getSaleOrder(true);
    }
    else {
      this.getPickingList(true);
    }

    this.setPickingFilterDate();
  }

  onTabChange(isPickList = false) {
    this.isOrderTabActive = !isPickList;
    this.onFilterClick();
  }

  onPickListImport() {
    this.route.navigateByUrl('/picking/import');
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }
  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  getSaleOrder(isReRender = false) {
    this.subscription.add(
      this.pickingApi.getSaleOrderList(this.filterDate.fromDate, this.filterDate.toDate, this.filterWareHouseCode || '').subscribe({
        next: response => {
          this.log.log('pick order response => ', response);
          const list = response || [];
          this.setList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'pick-list', 'getPickingList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    );
  }

  getPickingList(isReRender = false) {
    const filterObject = {
      Warehouse_Code: this.filterWareHouseCode || '',
      // Picklist_Status: Master.pickListStatus.completed,
      From_Date: this.filterDate.fromDate,
      To_Date: this.filterDate.toDate
    }

    this.subscription.add(
      this.pickingApi.getPickList(filterObject).subscribe({
        next: response => {
          this.log.log('pick list response => ', response);
          const list = response || [];
          this.setList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'pick-list', 'getPickingList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    );

  }

  setList(employees: any[], isReRender = false): void {
    this.pickList = employees || [];

    // // setTimeout(() => this.isTableDataRetrieved = true, Configuration.tableLoaderDuration);
    if (this.pickList.length) {
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
    //   this.dtTrigger?.next();
    // }
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

  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions(false);
    this.filterDate = this.getPickingFilterDate();
  }

  onPickListRowClick(pickList: any) {
    this.log.log('selected picking order : ', pickList);
    const selectedPickList = pickList || {};

    // is pick Order
    if (this.isOrderTabActive) {
      if (!selectedPickList.Sale_Order_Number) {
        this.alert.toastAlert('warning', 'Order number not found');
        return;
      }
      localStorage.setItem('pick-sale-order-number', selectedPickList.Sale_Order_Number);

      // navigate to detail
      this.route.navigateByUrl('picking/detail');
    }
    else { // is pick list
      if (!selectedPickList.Picklist_Number) {
        this.alert.toastAlert('warning', 'Pick List number not found');
        return;
      }
      localStorage.setItem('pick-list-number', selectedPickList.Picklist_Number);
      localStorage.setItem('pick-list-warehouse', selectedPickList.Warehouse_Code);

      // navigate to detail
      this.route.navigateByUrl('picking/list-detail');
    }
  }

  setPickingFilterDate() {
    this.utility.setDateFromLocal('picking-filter-date', this.filterDate);
  }

  getPickingFilterDate() {
    return this.utility.getDateFromLocal('picking-filter-date');

    // const grnDate = localStorage.getItem('picking-filter-date');
    // if (grnDate) {
    //   const grnDateDetail = this.utility.parseStringToJson(grnDate);
    //   if (grnDateDetail?.text) {
    //     if (grnDateDetail.text === 'Custom Range') {

    //     }
    //     else {
    //       return this.utility.getDateList(grnDateDetail.text);
    //     }
    //   }
    // }
    // return this.utility.getDateList(Master.dateOption.thisWeek);
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
