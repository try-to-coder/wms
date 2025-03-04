import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { InventoryService } from 'src/app/services/transaction/inventory.service';
import { Master } from '../../../constants/master';
import { DataTableService } from '../../../services/data-table.service';
import { LogService } from '../../../services/log.service';
import { MaterialAttributesService } from '../../../services/master/material-attributes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-adjustment-reason',
  templateUrl: './stock-adjustment-reason.component.html',
  styleUrls: ['./stock-adjustment-reason.component.scss']
})
export class StockAdjustmentReasonComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  isTableDataRetrieved = false;
  stockAdjustmentReasonMaster: any = {};
  tableList: any[] = [];
  isActive = false;

  addProduct = '';
  martialColName = "Brand";

  subscription: Subscription = new Subscription();
  constructor(
    private inventory: InventoryService,
    private log: LogService,
    private dataTable: DataTableService,
    private route: Router
  ) { }

  ngOnInit() {
    this.dtOptions = this.dataTable.getDataTableOptions(false, false);
    this.stockAdjustmentReasonList();

  }

  openModal() {
    this.stockAdjustmentReasonMaster = {};
    this.isActive = false;
    document.getElementById('stock-adjustment-reason-open-modal')?.click();
  }


  onEdit(response: any) {
    this.isActive = response.Active_Status === 'Active';
    document.getElementById('stock-adjustment-reason-open-modal')?.click();
    this.stockAdjustmentReasonMaster = response;
  }


  saveStockAdjustmentReason() {
    this.stockAdjustmentReasonMaster.Is_Active = this.isActive ? '1' : '0';
    this.subscription.add(
      this.inventory.saveStockAdjustmentReason(this.stockAdjustmentReasonMaster).subscribe({
        next: response => {
          this.log.log('stock adjustment reason :post', response);
          this.stockAdjustmentReasonList(true);
        }
      })
    )

  }



  updateStockAdjustmentReason() {
    this.stockAdjustmentReasonMaster.Is_Active = this.isActive ? '1' : '0';
    this.subscription.add(
      this.inventory.saveStockAdjustmentReason(this.stockAdjustmentReasonMaster).subscribe({
        next: response => {
          this.log.log('stock adjustment reason :post', response);
          this.stockAdjustmentReasonList(true);
        }
      })
    )
  }



  onDelete(response: any) {
    const object = {
      'Stock_Adjustment_Reason_Master_Id': response.Stock_Adjustment_Reason_Master_Id
    }
    this.subscription.add(
      this.inventory.saveStockAdjustmentReason(object).subscribe({
        next: response => {
          this.log.log('stock adjustment reason :post', response);
          this.stockAdjustmentReasonList(true);
        }
      })
    )
  }



  stockAdjustmentReasonList(isReRender = false) {
    this.subscription.add(
      this.inventory.getStockAdjustmentReason().subscribe({
        next: response => {
          this.log.log('material group List', response);
          const list = response || [];
          this.tableList = response;
          this.setList(response, isReRender);
        },
        error: error => { const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration); }
      })
    )
  }







  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
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


  setList(list: any[] = [], isReRender = false): void {
    this.tableList = list;
    const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
    if (this.tableList.length) {
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


  navigateBack() {
    this.route.navigateByUrl('/inventory/stock-adjustment');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
