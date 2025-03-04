import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { LogService } from 'src/app/services/log.service';
import { InventoryService } from 'src/app/services/transaction/inventory.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-stock-adjustment-import',
  templateUrl: './stock-adjustment-import.component.html',
  styleUrls: ['./stock-adjustment-import.component.scss']
})
export class StockAdjustmentImportComponent implements OnInit, OnDestroy {

  importDataList: any[] = [];

  validationReportList: any[] = [];

  isValidExcel = false;
  EXCEL_MAX_LIMIT = 1000;
  excelStatus = '';
  subscription: Subscription = new Subscription()

  isValidateCompleted = false;
  isValidateSuccess = false;
  uploadInitiated = false;

  constructor(private route: Router,
    private log: LogService,
    private utility: UtilityService,
    private alert: AlertService,
    private inventory: InventoryService) {
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

  }

  /* =================================================================== */
  /*                    Import Stock Adjustment                          */
  /* =================================================================== */

  onFileChoose(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const arrayBuffer: any = fileReader.result;
        const data = new Uint8Array(arrayBuffer);
        const arr = new Array();
        for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
        const bstr = arr.join('');
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const sheetNames = workbook.SheetNames || [];

        const firstSheetName = sheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        this.importDataList = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        this.log.log('Obtained data from excel', this.importDataList);
        this.checkExcelStatus();
      };

      const filename = $('#chooseFile').val();
      if (filename) {
        if (/^\s*$/.test(filename.toString())) {
          $('.file-upload').removeClass('active');
          $('#selected-file-name').text('No file chosen...');
        } else {
          $('.file-upload').addClass('active');
          $('#selected-file-name').text(filename.toString().replace('C:\\fakepath\\', ''));
        }
      }
      event.target.value = "";
    }
  }

  checkExcelStatus() {

    this.isValidExcel = false;

    if (!this.importDataList.length) {
      this.excelStatus = 'Excel does not contain any data';
      return;
    }

    if (this.importDataList.length > this.EXCEL_MAX_LIMIT) {
      this.excelStatus = 'Exceeds maximum upload limit (' + this.EXCEL_MAX_LIMIT + ')';
      return;
    }

    const invalidField = this.importDataList.find((row: any) => (!row.Stock_Adjustment_Number && !row.Stock_Adjustment_Date));
    if (invalidField) {
      this.excelStatus = 'Mandatory fields are missing';
      return;
    }

    this.isValidExcel = true;

    // if (this.importDataList.length > 0) {
    //   if (this.importDataList.length <= this.EXCEL_MAX_LIMIT) {
    //     this.isValidExcel = true;

    //     const invalidField = this.importDataList.find((row: any) => (!row.GRN_Number && !row.GRN_Date));
    //     if (invalidField) {
    //       this.isValidExcel = false;
    //       this.excelStatus = 'Mandatory fields are missing';
    //     }
    //   } else {
    //     this.excelStatus = 'Exceeds maximum upload limit (' + this.EXCEL_MAX_LIMIT + ')';
    //   }
    // } else {
    //   this.excelStatus = 'Excel does not contain any data';
    // }
  }

  clearExcel() {
    $('.file-upload').removeClass('active');
    $('#selected-file-name').text('No file chosen...');
    // $('#chooseFile').val('');

    this.importDataList = [];
    this.validationReportList = [];

    this.isValidExcel = false;
    this.excelStatus = '';
    this.refresh();
  }

  refresh() {
    this.uploadInitiated = false;
  }

  // isHalfUpdated(): boolean {
  //   const value = (100 / this.totalCount) * this.progressCount;
  //   return (value > 50);
  // }

  // isProgressValue() {
  //   this.progressValue = Math.round((100 / this.totalCount) * this.progressCount);
  // }

  validateExcel() {
    this.isValidateSuccess = false;
    this.isValidateCompleted = false;

    const timeOutID = setTimeout(() => {
      this.isValidateSuccess = true; this.isValidateCompleted = true;
    }, 1000);
  }

  onImportStockAdjustment() {

    // validate
    if (!this.importDataList?.length) {
      this.alert.toastAlert('warning', 'No data found');
      return;
    }

    const importAdjustmentList = this.importDataList || [];

    this.log.log('importGRNList : ', importAdjustmentList);

    this.subscription.add(
      this.inventory.importStockAdjustment(importAdjustmentList).subscribe({
        next: response => {
          this.log.log('import adjustment response => ', response);
        },
        error: error => { this.log.error(error, 'stock-adjustment', 'onImportStockAdjustment') },
        complete: () => { }
      })
    )
  }

  navigateBack() {
    this.route.navigateByUrl('/inventory/stock-adjustment');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
