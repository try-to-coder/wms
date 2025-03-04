import { KeyValue } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-rack-master',
  templateUrl: './rack-master.component.html',
  styleUrls: ['./rack-master.component.scss']
})
export class RackMasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  isTableDataRetrieved = false;

  rackList: any[] = [];

  subscription: Subscription = new Subscription()

  rackMasterModal: any = {};

  binMaster: Array<{ Bin_Code: string, Bin_Name: string, Bin_Element: string }> = [{ Bin_Name: 'Bin1', Bin_Code: 'BOIU67', Bin_Element: 'rtyu98' }];
  binList: any[] = [];

  selectedWarehouse = '';
  warehouseDropdown: any[] = [];
  isAccessWarehouseDropdown = true;

  rackModalObject: any;

  constructor(private route: Router,
    private warehouseApi: WarehouseService,
    private alert: AlertService,
    private utility: UtilityService,
    private dataTable: DataTableService,
    private log: LogService) {
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
      this.selectedWarehouse = userData || '';
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
    if (!this.selectedWarehouse) {
      this.selectedWarehouse = warehouseList[0]?.Warehouse_Code || '';
    }
    this.getRackList();
  }

  getRackList(isReRender = false) {
    this.subscription.add(
      this.warehouseApi.getRackList(this.selectedWarehouse).subscribe({
        next: response => {
          this.log.log('Rack List', response);
          const list = response || []
          this.setRackList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'rack-list', 'getRackList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        complete: () => { }
      })
    )
  }

  setRackList(racks: any[], isReRender = false) {
    this.rackList = racks || [];

    if (this.rackList.length) {
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

  onWarehouseChange(warehouse: string) {
    this.isTableDataRetrieved = false;
    this.getRackList(true);
    const value = JSON.stringify(this.selectedWarehouse)
    localStorage.setItem('warehouse', value);
  }

  onAddRackMaster() {
    this.rackModalObject = {
      rack: '',
      warehouse: this.selectedWarehouse
    };

    this.openRackMasterModal();
  }

  onTableRowClick(rack: any) {
    this.log.log("selected rack master : ", rack);

    this.rackModalObject = {
      rack: rack.Rack_Code,
      warehouse: this.selectedWarehouse
    };

    this.openRackMasterModal();
  }

  openRackMasterModal() {
    document.getElementById('rack-master-modal-open')?.click();
  }

  closeRackMasterModal(isRefresh = false) {

    document.getElementById('rack-master-modal-close')?.click();

    this.rackModalObject = {
      rack: '',
      warehouse: ''
    };

    if (isRefresh) {
      this.isTableDataRetrieved = false;
      this.getRackList(true);
    }
  }

  reRender(): void {
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
    this.route.navigateByUrl('/warehouse-master');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    this.subscription.unsubscribe();
  }

}
