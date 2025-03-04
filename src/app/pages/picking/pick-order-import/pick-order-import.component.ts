import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { PickListService } from 'src/app/services/transaction/pick-list.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as XLSX from 'xlsx';
import * as fs from 'file-saver';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-pick-order-import',
  templateUrl: './pick-order-import.component.html',
  styleUrls: ['./pick-order-import.component.scss']
})
export class PickOrderImportComponent implements OnInit, OnDestroy {

  importDataList: any[] = [];
  importDataProductList: any[] = [];

  validationReportList: any[] = [];

  isValidExcel = false;
  EXCEL_MAX_LIMIT = 1000;
  excelStatus = '';
  subscription: Subscription = new Subscription()

  isValidateCompleted = false;
  isValidateSuccess = false;
  uploadInitiated = false;

  constructor(
    private log: LogService,
    private utility: UtilityService,
    private pickList: PickListService,
    private route: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {

  }

  getFile() {
    document.getElementById('importFile')?.click()
  }


  /* =================================================================== */
  /*                              Download Sample                        */
  /* =================================================================== */

  onSampleFileClick() {
    // for json
    fetch('../../../assets/files/pick-list-sample.json')
      .then(response => response.json())
      .then(data => {
        const excelData = data;
        this.log.log('Obtained data from excel', excelData);
        this.generateSampleExcel(excelData);
      })
      .catch(err => console.error(err));
  }

  generateSampleExcel(data: any) {
    this.log.log('data : ', data);
    const exportedData: any = data || {};
    this.log.log('excelHeader : ', exportedData);

    const workbook = XLSX.utils.book_new();
    workbook.SheetNames = ['Sale_Order', 'Products'];
    // let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const worksheet = XLSX.utils.json_to_sheet(exportedData.Sale_Order || []);
    workbook.Sheets[workbook.SheetNames[0]] = worksheet;

    const productSheet = XLSX.utils.json_to_sheet(exportedData.Products || []);
    workbook.Sheets[workbook.SheetNames[1]] = productSheet;

    const finalWB = XLSX.write(workbook, { bookType: 'xlsx', bookSST: false, type: 'array' });
    /* the saveAs call downloads a file on the local machine */
    fs.saveAs(new Blob([finalWB], { type: "application/octet-stream" }), "sample pick list.xlsx");
  }


  /* =================================================================== */
  /*                               Import PickList                       */
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
        const excelObject = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        this.setExcelObject(excelObject);

        // read second sheet
        if (sheetNames?.length > 1) {
          const secondSheetName = sheetNames[1];
          const secondWorksheet = workbook.Sheets[secondSheetName];
          this.importDataProductList = XLSX.utils.sheet_to_json(secondWorksheet, { raw: true });
          this.log.log('importDataList', this.importDataList)
        }
        else {
          this.importDataProductList = [];
        }

        this.log.log('Obtained data from excel', this.importDataProductList);
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

  setExcelObject(excelObject: any): void {
    if (excelObject?.length) {
      const validList: any[] = [];
      excelObject?.forEach((data: any) => {
        const newObject: any = {};
        Object.entries(data)?.map(([key, value]) => {
          if (['Sale_Order_Date', 'Delivery_Date']?.includes(key)) {
            if (typeof value == 'number') {
              const javascriptDate = XLSX.SSF.parse_date_code(value);
              const formattedDate = moment(javascriptDate).format('YYYY-MM-DD');
              newObject[key] = formattedDate;
            }
          } else {
            newObject[key] = value;
          }
        })
        validList.push(newObject);
      })
      this.importDataList = validList || [];
      this.log.log('date formatted grn object :', this.importDataList);
    }
  }

  checkExcelStatus() {

    this.isValidExcel = false;

    if (!this.importDataList.length) {
      this.excelStatus = 'Excel does not contain any data';
      return;
    }

    if (!this.importDataProductList.length) {
      this.excelStatus = 'Excel does not contain any product data';
      return;
    }

    if (this.importDataList.length > this.EXCEL_MAX_LIMIT) {
      this.excelStatus = 'Exceeds maximum upload limit (' + this.EXCEL_MAX_LIMIT + ')';
      return;
    }

    const invalidField = this.importDataList.find((row: any) => (!row.Sale_Order_Number && !row.Sale_Order_Date));
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
    this.importDataProductList = [];
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

  onImportPickList() {

    const importPickList: any[] = [];

    this.importDataList.forEach(order => {
      const currentOrder = order || {};
      // currentOrder.Sale_Order_Date = this.utility.getDBDateFormate(order.Sale_Order_Date);
      // currentOrder.Delivery_Date = this.utility.getDBDateFormate(order.Delivery_Date);
      currentOrder.Picklist_Product_Master = this.importDataProductList.filter(obj => obj.Sale_Order_Number === order.Sale_Order_Number);
      importPickList.push(currentOrder);
    });

    this.importPickList(importPickList);
  }

  importPickList(list: any[]) {
    const importPickList = list || [];

    this.log.log('importGRNList : ', importPickList);

    this.subscription.add(
      this.pickList.importPickListOrder(importPickList).subscribe({
        next: response => {
          this.log.log('pick list  response => ', response);
          if (response.status == 'success') {
            this.alert.successAlert(response.message || 'Pick list upload successfully');
            this.navigateBack();
          }
        },
        error: error => { },
        complete: () => { }
      })
    )
  }

  navigateBack() {
    this.route.navigateByUrl('/picking');
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

