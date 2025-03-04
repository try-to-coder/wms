import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { CargoService } from 'src/app/services/transaction/cargo.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-manual-inward-list',
  templateUrl: './manual-inward-list.component.html',
  styleUrls: ['./manual-inward-list.component.scss']
})
export class ManualInwardListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  subscription: Subscription = new Subscription();

  tableList: any[] = [];

  filterDate: any;

  // grnList: any[] = [];
  // stockReceiveList: any[] = [];

  isTableDataRetrieved = false;

  constructor(private route: Router,
    private log: LogService,
    private alert: AlertService,
    private cargoApi: CargoService,
    private dataTable: DataTableService,
    private utility: UtilityService) {
    this.onPreInit();
  }

  onPreInit() {

  }

  ngOnInit(): void {
    this.getBasicUtility();
    this.getInwardList();
  }

  getInwardList(isReRender = false) {
    this.subscription.add(
      this.cargoApi.getCargoList(this.filterDate.fromDate, this.filterDate.toDate).subscribe({
        next: response => {
          const list = response || [];
          this.setInwardList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => { this.log.error(error, 'manual-inward-list', 'getInwardList'); }
      })
    );
  }

  setInwardList(list: any[] = [], isReRender = false): void {
    this.tableList = [];
    if (list.length) {
      this.tableList = list;
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

  onInward(): void {
    this.route.navigateByUrl('/cargo-inward/scan');
  }

  onOutward(): void {
    this.route.navigateByUrl('/cargo-inward/outward');
  }

  onImport(): void {
    this.route.navigateByUrl('/cargo-inward/import');
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions(false);
    this.filterDate = this.utility.getDateList(Master.dateOption.thisMonth);
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

}
