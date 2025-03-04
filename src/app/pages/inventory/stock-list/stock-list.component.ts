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
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  subscription: Subscription = new Subscription();

  stockList: any[] = [];
  isTableDataRetrieved = false;

  // filter
  warehouseDropdown: any[] = [];
  isAccessWarehouseDropdown = true;
  filterWareHouseCode = '';

  constructor(
    private utility: UtilityService,
    private route: Router,
    private warehouseApi: WarehouseService,
    private inventory: InventoryService,
    private dataTable: DataTableService,
    private alert: AlertService,
    private log: LogService) {

    this.onPreInit();
  }

  onPreInit() {

  }

  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.getBasicUtility();
      this.getWarehouseList();
      // this.onPageReady();
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
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

    this.getStockList();
  }

  getStockList(isReRender = false) {
    const filterObject = {
      Warehouse_Code: this.filterWareHouseCode,
      GroupByWarehouse: '0'
    }
    this.subscription.add(
      this.inventory.getStockList(filterObject).subscribe({
        next: response => {
          this.log.log('stock list response : ', response);
          const list = response || [];
          this.setStockList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'stock-list', 'getStockList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        }
      })
    );
  }

  setStockList(list: any[] = [], isReRender = false) {
    this.stockList = list || [];
    if (this.stockList.length) {
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

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  navigateStockAdjustment() {
    this.route.navigateByUrl('inventory/stock-adjustment');
  }

  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions();
  }

  navigateBack() {
    this.route.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

    this.subscription.unsubscribe();
  }

}
