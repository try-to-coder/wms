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
import { PutawayService } from 'src/app/services/transaction/putaway.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-put-away-list',
  templateUrl: './put-away-list.component.html',
  styleUrls: ['./put-away-list.component.scss']
})
export class PutAwayListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  subscription: Subscription = new Subscription();

  putAwayList: any[] = [];

  isTableDataRetrieved = false;

  warehouseDropdown: any[] = [];
  isAccessWarehouseDropdown = true;

  filterWareHouseCode = '';
  filterDate: any = {};

  constructor(private route: Router,
    private log: LogService,
    private dataTable: DataTableService,
    private alert: AlertService,
    private utility: UtilityService,
    private warehouseApi: WarehouseService,
    private putAwayApi: PutawayService) {
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
    this.getPutAwayList();
  }

  onCreatePutAway() {
    this.route.navigateByUrl('/putaway/create');
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  getPutAwayList(isReRender = false) {
    this.subscription.add(
      this.putAwayApi.getPutAwayList(this.filterDate.fromDate, this.filterDate.toDate, this.filterWareHouseCode || '').subscribe({
        next: response => {
          this.log.log('put away response => ', response);
          const list = response || [];
          this.setPutAwayList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'put-away-list', 'getPutAwayList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    );

  }

  setPutAwayList(list: any[], isReRender = false): void {
    this.putAwayList = list || [];

    if (this.putAwayList.length) {
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

  onFilterClick() {
    this.isTableDataRetrieved = false;
    this.getPutAwayList(true);

    // save grn selected date
    this.setPutAwayFilterDate();
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
    this.filterDate = this.getPutAwayFilterDate();;
  }

  onPutAwaySelect(putAway: any) {

    this.log.log('grn : ', putAway);


    if (!putAway.Putaway_Number) {
      this.log.log('Putaway Number is empty !!!');
      return;
    }

    // 
    localStorage.setItem('putaway-number', putAway.Putaway_Number);
    this.navigateToDetail();
  }

  setPutAwayFilterDate() {
    localStorage.setItem('put-away-filter-date', JSON.stringify(this.filterDate));
  }

  getPutAwayFilterDate() {
    const grnDate = localStorage.getItem('put-away-filter-date');
    if (grnDate) {
      const grnDateDetail = this.utility.parseStringToJson(grnDate);
      if (grnDateDetail?.text) {
        if (grnDateDetail.text === 'Custom Range') {

        }
        else {
          return this.utility.getDateList(grnDateDetail.text);
        }
      }
      // return this.utility.getDateList(grnDateDetail.text);
    }
    this.log.log('get grn date : ', grnDate);
    // if(date)
    // { 
    //   // const 
    // }
    return this.utility.getDateList(Master.dateOption.thisWeek);
  }

  navigateToDetail() {
    this.route.navigateByUrl('putaway/detail');
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
