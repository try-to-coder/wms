import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { identity, Subject, Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { IWarehouse } from 'src/app/interfaces/warehouse';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { MaterialService } from 'src/app/services/master/material.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';

@Component({
  selector: 'app-warehouse-master',
  templateUrl: './warehouse-master.component.html',
  styleUrls: ['./warehouse-master.component.scss']
})
export class WarehouseMasterComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  warehouseList: any[] = [];

  warehouseMaster: IWarehouse = {} as IWarehouse
  subscription: Subscription = new Subscription()
  selectedWarehouseID = '';

  isTableDataRetrieved = false;

  constructor(private route: Router,
    private warehouse: WarehouseService,
    private log: LogService,
    private dataTable: DataTableService) {
    this.onPreInit()
  }

  onPreInit() { }

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
    this.getWarehouseList();
  }

  getWarehouseList(isReRender = false) {
    this.subscription.add(
      this.warehouse.getWarehouseList().subscribe({
        next: response => {
          this.log.log('material list response :', response);
          const list = response || []
          this.setWarehouseList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'warehouse-master', 'getWarehouseList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        }
      })
    )
  }


  setWarehouseList(warehouse: any[], isReRender = false) {
    this.warehouseList = warehouse;
    if (this.warehouseList.length) {
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

  onEditWarehouse(warehouse: any) {
    this.log.log('selected warehouse : ', warehouse);
    const selectedWarehouse = warehouse || {};
    if (!selectedWarehouse.Warehouse_Master_Id) {
      this.log.log('warehouse ID is empty!');
      return;
    }

    this.selectedWarehouseID = selectedWarehouse.Warehouse_Master_Id;

    this.openWarehouseModal();
  }

  onAddWarehouse() {
    this.selectedWarehouseID = '';
    this.openWarehouseModal();
  }

  openWarehouseModal() {
    document.getElementById('warehouse-master-open-modal')?.click();
  }

  closeWarehouseModal(isRefresh = false) {
    document.getElementById('warehouse-master-close-modal')?.click();
    this.selectedWarehouseID = '';

    if (isRefresh) {
      this.isTableDataRetrieved = false;
      this.getWarehouseList(true);
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
