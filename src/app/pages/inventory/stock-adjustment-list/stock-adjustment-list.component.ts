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
import { InventoryService } from 'src/app/services/transaction/inventory.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-stock-adjustment-list',
  templateUrl: './stock-adjustment-list.component.html',
  styleUrls: ['./stock-adjustment-list.component.scss']
})
export class StockAdjustmentListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  subscription: Subscription = new Subscription();

  stockAdjustmentList: any[] = [];
  isTableDataRetrieved = false;

  warehouseDropdown: any[] = [];
  isAccessWarehouseDropdown = true;

  filterWareHouseCode = '';
  filterDate: any = {};

  constructor(private route: Router,
    private log: LogService,
    private utility: UtilityService,
    private alert: AlertService,
    private warehouseApi: WarehouseService,
    private dataTable: DataTableService,
    private inventoryApi: InventoryService) {
    this.onPreInit()
  }

  onPreInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.onPageReady();
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const savedData = localStorage.getItem('warehouse');
    if (savedData) {
      const userData = JSON.parse(savedData);
      this.filterWareHouseCode = userData || '';
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
    this.getAdjustmentList();
  }

  onFilterClick() {
    this.isTableDataRetrieved = false;
    this.getAdjustmentList(true);
  }

  onAdjustmentImport() {
    this.route.navigateByUrl('/inventory/stock-adjustment-import');
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }
  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  getAdjustmentList(isReRender = false) {
    this.subscription.add(
      this.inventoryApi.getStockAdjustmentList(this.filterDate.fromDate, this.filterDate.toDate, this.filterWareHouseCode || '').subscribe({
        next: response => {
          this.log.log('pick list response => ', response);
          const list = response || [];
          this.setAdjustmentList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'pick-list', 'getAdjustmentList');
          this.setAdjustmentList([], isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    );

  }

  setAdjustmentList(list: any[], isReRender = false): void {
    this.stockAdjustmentList = list || [];
    if (this.stockAdjustmentList.length) {
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
    this.dtOptions = this.dataTable.getDataTableOptions();
    this.filterDate = this.utility.getDateList(Master.dateOption.thisWeek);
  }

  onPickListRowClick(stockAdjustmentList: any) {
    this.log.log('selected picking order : ', stockAdjustmentList);
    const selectedPickList = stockAdjustmentList || {};

    if (!selectedPickList.Sale_Order_Number) {
      this.alert.toastAlert('warning', 'Order number not found');
      return;
    }

    localStorage.setItem('pick-sale-order-number', selectedPickList.Sale_Order_Number);

    // navigate to detail
    this.route.navigateByUrl('picking/detail');
  }

  navigateBack() {
    this.route.navigateByUrl('/inventory');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    this.subscription.unsubscribe();
  }
}

