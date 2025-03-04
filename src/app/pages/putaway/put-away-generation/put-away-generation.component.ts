import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { forkJoin, Observable, of, Subject, Subscription, tap } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { StockReceiveService } from 'src/app/services/transaction/stock-receive.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-put-away-generation',
  templateUrl: './put-away-generation.component.html',
  styleUrls: ['./put-away-generation.component.scss']
})
export class PutAwayGenerationComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  isTableDataRetrieved = false;

  subscription: Subscription = new Subscription();

  stockReceiveList: any[] = [];
  rackMappingList: any[] = [];

  // filter
  warehouseDropdown: any[] = [];
  isAccessWarehouseDropdown = true;
  filterWareHouseCode = '';
  filterDate: any = {};

  // selectionModal
  stockReceiveDetail: any = {};
  stockReceiveProducts: any[] = []; // filter only 
  stockReceivedProducts: any[] = []; // existing received products
  stockReceiveBarCodes: any[] = [];

  // put-away modal

  putAwayModal: any = {
    receiveDetail: {},
    products: [],
    barCodes: [],
    rackMasters: []
  }

  // selectedPutAwayProducts: any[] = [];
  // selectedProductBarCodes: any[] = [];

  isAllSelect = false;

  constructor(
    private route: Router,
    private alert: AlertService,
    private utility: UtilityService,
    private dataTable: DataTableService,
    private warehouseApi: WarehouseService,
    private stockReceiveApi: StockReceiveService,
    private log: LogService) {
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
      this.getBasicUtility();
      this.getWarehouseList();
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  /** -------------------------------------------- */
  /**               Stock Receive List             */
  /** -------------------------------------------- */

  //#region   

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

    this.getStockReceiveList();
  }

  onFilterClick() {
    this.isTableDataRetrieved = false;
    this.getStockReceiveList(true);
  }

  onLoad(isReRender = false): Observable<any> {

    let stockReceiveList = of(null), rackMaster = of(null);

    stockReceiveList = this.stockReceiveApi.getStockReceiveList(this.filterDate.fromDate, this.filterDate.toDate, this.filterWareHouseCode || '').pipe(tap(response => {
      this.log.log('stock receive response : ', response);
      const list = response || [];
      this.setList(list, isReRender);
      const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
    }))

    rackMaster = this.warehouseApi.getRackMappingDropdown(this.filterWareHouseCode || '').pipe(tap(response => {
      this.log.log('rack master response : ', response);
      this.rackMappingList = response || [];
    }))

    return forkJoin({ receiveList: stockReceiveList, rackMaster: rackMaster });
  }

  getStockReceiveList(isReRender = false) {

    this.subscription.add(
      this.onLoad(isReRender).subscribe({
        next: response => {
          this.log.log('stock receive total response : ', response);
        },
        error: error => {
          this.log.error(error, 'put-away-generation', 'getStockReceiveList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    );

    // this.subscription.add(
    //   this.stockReceiveApi.getStockReceiveList(this.filterDate.fromDate, this.filterDate.toDate, this.filterWareHouseCode || '').subscribe({
    //     next: response => {
    //       this.log.log('grn response => ', response);
    //       const list = response || [];
    //       this.setList(list, isReRender);
    //       const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
    //     },
    //     error: error => { const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration); },
    //     complete: () => { }
    //   })
    // );
  }

  setList(list: any[] = [], isReRender = false): void {
    this.stockReceiveList = list;
    if (this.stockReceiveList.length) {
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

  //#endregion

  /** -------------------------------------------- */
  /**           Receive Product Selection          */
  /** -------------------------------------------- */

  //#region  

  onTableRowClick(stockReceive: any) {
    this.log.log('selected stock receive : ', stockReceive);
    const stockReceiveObject = stockReceive || {};
    if (!stockReceiveObject.Stock_Receive_Number) {
      this.log.warn('Stock Receive Number is empty');
      return;
    }

    this.getStockReceiveDetail(stockReceiveObject.Stock_Receive_Number);
  }

  getStockReceiveDetail(receiveNumber: string) {
    const selectedReceiveNumber = receiveNumber || '';

    if (!selectedReceiveNumber) {
      this.log.warn('Stock Receive Number is empty');
      return;
    }

    this.subscription.add(
      this.getStockReceiveDetailAndBarCodes(selectedReceiveNumber).subscribe({
        next: response => {
          this.filterAvailableProducts();
        },
        error: error => { },
        complete: () => { }
      })
    );
  }

  getStockReceiveDetailAndBarCodes(receiveNumber: string) {
    const selectedReceiveNumber = receiveNumber || '';

    let receiveDetail = of(null);
    let receiveBarCodes = of(null);

    receiveDetail = this.stockReceiveApi.getStockReceive(selectedReceiveNumber).pipe(tap({
      next: response => {
        this.log.log('stock receive detail response : ', response);
        this.stockReceiveDetail = response || {};
      }
    }));

    receiveBarCodes = this.stockReceiveApi.getStockReceiveBarcode(this.filterWareHouseCode, selectedReceiveNumber).pipe(tap({
      next: response => {
        this.log.log('stock receive barcode response : ', response);
        this.stockReceiveBarCodes = response || [];
      }
    }));

    return forkJoin({ detail: receiveDetail, barcode: receiveBarCodes })
  }

  // getStockReceiveDetail(receiveNumber: string) {
  //   const selectedReceiveNumber = receiveNumber || '';

  //   if (!selectedReceiveNumber) {
  //     this.log.warn('Stock Receive Number is empty');
  //     return;
  //   }

  //   this.subscription.add(
  //     this.stockReceiveApi.getStockReceive(selectedReceiveNumber).subscribe({
  //       next: response => {
  //         this.log.log('stock receive detail response : ', response);
  //         if (response) {
  //           this.stockReceiveDetail = response || {};
  //           this.filterAvailableProducts();
  //         }
  //       },
  //       error: error => { this.log.error(error, 'put-away-generation', 'getStockReceiveDetail') },
  //       complete: () => { }
  //     })
  //   );
  // }

  filterAvailableProducts() {
    // filter only available products
    const products = this.stockReceiveDetail.Stock_Receive_Products || [];

    // empty
    this.stockReceiveProducts = [];
    this.stockReceivedProducts = [];

    products.forEach((product: any) => {
      // 
      const quantity = parseFloat(product.Quantity || '0.00');
      const putAwayQuantity = parseFloat(product.Putaway_Quantity || '0.00');
      const availableQuantity = quantity - putAwayQuantity;

      product.Available_Quantity = availableQuantity;
      if (availableQuantity > 0) {
        this.stockReceiveProducts.push(product);
      }
      else {
        this.stockReceivedProducts.push(product);
      }
    });

    this.openProductSelectionModal();
  }

  openProductSelectionModal() {
    document.getElementById('receive-product-open-modal')?.click();
  }

  isAllSelectChange(isChecked = false) {
    this.stockReceiveProducts.forEach(obj => obj.isSelected = isChecked);
  }

  onStartPutAway() {

    // validate product is selected

    const selectedProducts: any[] = [], selectedBarCodes: any[] = [];
    this.stockReceiveProducts.forEach(product => {
      if (product.isSelected) {
        selectedProducts.push(product);

        // add barcode
        const currentProductBarCodes = this.stockReceiveBarCodes.filter(obj => (obj.Stock_Receive_Product_Id === product.Stock_Receive_Product_Id) && !obj.Putaway_Number);
        selectedBarCodes.push(...currentProductBarCodes);
      }
    });

    if (!selectedProducts?.length) {
      this.alert.toastAlert('warning', 'Select minimum one product to start putaway');
      return;
    }

    this.closeProductSelectionModal();

    // open new start put away modal
    this.putAwayModal = {
      receiveDetail: this.stockReceiveDetail,
      products: selectedProducts || [],
      barCodes: selectedBarCodes || [],
      rackMasters: this.rackMappingList
    };
    this.openPutAwayModal();
  }

  closeProductSelectionModal() {
    document.getElementById('receive-product-close-modal')?.click();
  }

  //#endregion

  /** -------------------------------------------- */
  /**                  Start Put away              */
  /** -------------------------------------------- */

  //#region  

  openPutAwayModal() {
    document.getElementById('putaway-master-open-modal')?.click();
  }

  closePutAwayModal() {



    document.getElementById('putaway-master-close-modal')?.click();
  }

  //#endregion


  /** -------------------------------------------- */
  /**               Data Table Utility             */
  /** -------------------------------------------- */

  //#region 

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

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  //#endregion


  startPutaway() {

  }

  navigateBack() {
    this.route.navigateByUrl('/putaway');
  }

  ngOnDestroy(): void {

  }

}
