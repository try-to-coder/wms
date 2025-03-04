import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { forkJoin, of, Subject, Subscription, tap } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { GrnService } from 'src/app/services/transaction/grn.service';
import { StockReceiveService } from 'src/app/services/transaction/stock-receive.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-grn-list',
  templateUrl: './grn-list.component.html',
  styleUrls: ['./grn-list.component.scss']
})
export class GrnListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  subscription: Subscription = new Subscription();

  tableList: any[] = [];

  // grnList: any[] = [];
  // stockReceiveList: any[] = [];

  isTableDataRetrieved = false;

  warehouseDropdown: any[] = [];
  isAccessWarehouseDropdown = true;

  filterWareHouseCode = '';
  filterDate: any = {};

  isGRNTabActive = true;

  constructor(private route: Router,
    private log: LogService,
    private alert: AlertService,
    private dataTable: DataTableService,
    private utility: UtilityService,
    private warehouseApi: WarehouseService,
    private stockReceiveApi: StockReceiveService,
    private grnApi: GrnService) {
    this.onPreInit()
  }

  onPreInit() {
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

  // onPageReady(isReRender = false) {
  //   this.subscription.add(
  //     this.onLoad(isReRender).subscribe({
  //       next: response => {
  //         this.log.log('grn load response : ', response);
  //       },
  //       error: error => {
  //         this.log.error(error, 'grn-list', 'load - grn-list', true);
  //         const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
  //       },
  //       complete: () => { }
  //     })
  //   );
  // }

  // onLoad(isReRender = false) {

  //   let warehouseList = of(null);
  //   let grnList = of(null);

  //   if (!isReRender) {
  //     warehouseList = this.warehouseApi.gerWarehouseDropdown().pipe(tap(response => {
  //       this.log.log('warehouse response : ', response);
  //       const warehouseList: any = response || [];
  //       this.warehouseDropdown = this.utility.getSelectOptions(warehouseList || [], 'Warehouse_Code', 'Warehouse_Name');
  //     }));
  //   }

  //   grnList = this.grnApi.gerGrnList(this.filterDate.fromDate, this.filterDate.toDate, this.filterWareHouseCode || '').pipe(tap(response => {
  //     this.log.log('warehouse response : ', response);
  //     const list = response || [];
  //     this.setGRNList(list, isReRender);
  //     const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
  //   }));

  //   return forkJoin({ warehouse: warehouseList, grn: grnList });
  // }

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

    if (this.isGRNTabActive) {
      this.getGRNList();
    }
    else {
      this.getStockReceiveList();
    }
  }

  onGRNImport() {
    this.route.navigateByUrl('/grn/import');
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  onFilterClick() {

    this.log.log('filterDate : ', this.filterDate);

    this.isTableDataRetrieved = false;
    if (this.isGRNTabActive) {
      this.getGRNList(true);
    }
    else {
      this.getStockReceiveList(true);
    }

    // save grn selected date
    this.setGRNFilterDate();
  }

  getGRNList(isReRender = false) {
    this.subscription.add(
      this.grnApi.getGrnList(this.filterDate.fromDate, this.filterDate.toDate, this.filterWareHouseCode || '').subscribe({
        next: response => {
          this.log.log('grn response => ', response);
          const list = response || [];
          this.setList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'grn-list', 'getGRNList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    );
  }

  setList(list: any[] = [], isReRender = false): void {
    this.tableList = [];
    this.tableList = list || [];
    if (list.length) {
      if (!isReRender) {
        this.dtTrigger.next();
        if (!(jQuery('table').parents('.dataTables_scroll').length)) {
          setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
        }
      } else {
        this.reRender();
      }
    }
    // else if (!isReRender) {
    //   this.dtTrigger.next();
    // }
  }

  getStockReceiveList(isReRender = false) {
    this.subscription.add(
      this.stockReceiveApi.getStockReceiveList(this.filterDate.fromDate, this.filterDate.toDate, this.filterWareHouseCode || '').subscribe({
        next: response => {
          this.log.log('grn response => ', response);
          const list = response || [];
          this.setList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => { const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration); },
        complete: () => { }
      })
    );
  }

  reRender() {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to re render again
        this.dtTrigger.next();
        setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
      });
    } else {
      this.dtTrigger.next();
      if (!(jQuery('table').parents('.dataTables_scroll').length)) {
        setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
      }
    }
  }

  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions(false);
    this.filterDate = this.getGRNFilterDate();
  }

  setGRNFilterDate() {
    this.utility.setDateFromLocal('grn-filter-date', this.filterDate)
  }

  getGRNFilterDate() {
    return this.utility.getDateFromLocal('grn-filter-date');
  }

  onTabChange(isStockReceive = false) {
    this.isGRNTabActive = !isStockReceive;
    this.onFilterClick();
  }

  onTableRowClick(row: any) {
    this.log.log('selected row : ', row);
    const selectedRow = row || {};
    if (this.isGRNTabActive) {
      if (!row.GRN_Number) {
        this.log.log('GRN Number is empty !!!');
        return;
      }
      localStorage.setItem('grn-number', row.GRN_Number);
      this.route.navigateByUrl('grn/detail');
    }
    else {
      if (!row.Stock_Receive_Number) {
        this.log.log('Stock Receive Number is empty !!!');
        return;
      }
      localStorage.setItem('stock-receive-number', row.Stock_Receive_Number);
      this.route.navigateByUrl('grn/stock-receive');
    }
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
