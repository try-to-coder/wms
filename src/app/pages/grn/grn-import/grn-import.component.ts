import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { merge } from 'jquery';
import { forkJoin, from, Observable, of, Subscription } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { LogService } from 'src/app/services/log.service';
import { GrnService } from 'src/app/services/transaction/grn.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as XLSX from 'xlsx';
import * as fs from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-grn-import',
  templateUrl: './grn-import.component.html',
  styleUrls: ['./grn-import.component.scss']
})
export class GrnImportComponent implements OnInit, OnDestroy {

  importDataList: any[] = [];
  importDataProductList: any[] = [];
  categoryOrgin: any = [];

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
    private route: Router,
    private alert: AlertService,
    private utility: UtilityService,
    private grn: GrnService) { }

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
    fetch('../../../assets/files/grn-sample.json')
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
    workbook.SheetNames = ['GRN', 'Products'];
    // let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const worksheet = XLSX.utils.json_to_sheet(exportedData.GRN || []);
    workbook.Sheets[workbook.SheetNames[0]] = worksheet;

    const productSheet = XLSX.utils.json_to_sheet(exportedData.GRNProducts || []);
    workbook.Sheets[workbook.SheetNames[1]] = productSheet;

    const finalWB = XLSX.write(workbook, { bookType: 'xlsx', bookSST: false, type: 'array' });
    /* the saveAs call downloads a file on the local machine */
    fs.saveAs(new Blob([finalWB], { type: "application/octet-stream" }), "sample grn.xlsx");
  }


  /* =================================================================== */
  /*                               Import GRN                            */
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
          if (['GRN_Date', 'Purchase_Order_Date', 'Delivery_Date']?.includes(key)) {
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

    const invalidField = this.importDataList.find((row: any) => (!row.GRN_Number && !row.GRN_Date));
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

    // if (this.importDataList.length && this.importDataProductList.length) {
    //   this.excelValidation();
    // }

    setTimeout(() => {
      this.isValidateSuccess = true;
      this.isValidateCompleted = true;
    }, 1000);
  }

  excelValidation() {
    let fieldValidation: any = of(null);
    fieldValidation = this.validateFields().subscribe((response: any) => {
      const validationResponse: any = response || {};
      this.log.log('validation Field : ', validationResponse);

      const invalidMessages = [
        { type: 'error', list: validationResponse.GRN_Number || [], message: 'GRN Number is empty' },
        { type: 'error', list: validationResponse.GRN_Date || [], message: 'GRN Date is invalid' },
        { type: 'error', list: validationResponse.Purchase_Order_Number || [], message: `PO Number is empty` },
        { type: 'error', list: validationResponse.Purchase_Order_Date || [], message: 'PO Date is invalid' },
        { type: 'error', list: validationResponse.Supplier_Code || [], message: 'Supplier Code is empty' },
        { type: 'error', list: validationResponse.Supplier_Name || [], message: 'Supplier Name is empty' },
        { type: 'error', list: validationResponse.Warehouse_Code || [], message: 'Warehouse Code is empty' },
        { type: 'error', list: validationResponse.Warehouse_Name || [], message: 'Warehouse Name is empty' },
        { type: 'error', list: validationResponse.invalidDeliveryDate || [], message: 'Delivery date is invalid' },
      ];
      invalidMessages.forEach(data => {
        const listLength = data.list?.length || 0;
        const itemText = listLength > 1 ? 'items' : 'item';
        if (listLength) {
          this.validationReportList.push({
            status: 'error',
            message: " - " + listLength + " " + itemText + " " + data.message,
            data: data.list
          });
        }
      });
    }, (error: any) => { this.log.log('fieldValidation : ', error); }, () => { });
    return forkJoin([fieldValidation]);
  }

  validateFields() {
    const invalidGRNNumber: any = [];
    const invalidGRNDate: any = [];
    const invalidPONumber: any = [];
    const invalidPODate: any = [];
    const invalidSupplierCode: any = [];
    const invalidSupplierName: any = [];
    const invalidWarehouseCode: any = [];
    const invalidWarehouseName: any = [];
    const invalidDeliveryDate: any = [];

    return new Observable((observer) => {
      this.importDataList.forEach((product: any, index: any) => {
        if (index > 0) {
          if (!this.isNotNull(product.GRN_Number)) {
            invalidGRNNumber.push({
              row: index + 2 || '',
              GRN_Number: product.GRN_Number || '',
            });
          }

          if (!this.dateValidator(product.GRN_Date)) {
            invalidGRNDate.push({
              row: index + 2 || '',
              GRN_Date: product.GRN_Date || ''
            });
          }

          if (!this.isNotNull(product.Purchase_Order_Number)) {
            invalidPONumber.push({
              row: index + 2 || '',
              Purchase_Order_Number: product.Purchase_Order_Number || '',
            });
          }


          if (!this.dateValidator(product.Purchase_Order_Date)) {
            invalidPODate.push({
              row: index + 2 || '',
              Purchase_Order_Date: product.Purchase_Order_Date || ''
            });
          }

          if (!this.isNotNull(product.Supplier_Code)) {
            invalidSupplierCode.push({
              row: index + 2 || '',
              Supplier_Code: product.Supplier_Code || ''
            });
          }

          if (!this.isNotNull(product.Supplier_Name)) {
            invalidSupplierName.push({
              row: index + 2 || '',
              Supplier_Name: product.Supplier_Name || '',
            });
          }

          if (!this.isNotNull(product.Warehouse_Code)) {
            invalidWarehouseCode.push({
              row: index + 2 || '',
              Warehouse_Code: product.Warehouse_Code || '',
            });
          }

          if (!this.isNotNull(product.Warehouse_Name)) {
            invalidWarehouseName.push({
              row: index + 2 || '',
              Warehouse_Name: product.Warehouse_Name || '',
            });
          }

          if (!this.dateValidator(product.Delivery_Date)) {
            invalidDeliveryDate.push({
              row: index + 2 || '',
              Delivery_Date: product.Delivery_Date || '',
            });
          }
        }

      });
      observer.next({
        GRN_Number: invalidGRNNumber,
        GRN_Date: invalidGRNDate,
        Purchase_Order_Number: invalidPONumber,
        Purchase_Order_Date: invalidPODate,
        Supplier_Code: invalidSupplierCode,
        Supplier_Name: invalidSupplierName,
        Warehouse_Code: invalidWarehouseCode,
        Warehouse_Name: invalidWarehouseName,
        Delivery_Date: invalidDeliveryDate,
      });
      observer.complete();
    });
  }

  isNotNull(item: any): boolean {
    return item ? true : false;
  }

  dateValidator(control: any) {
    const value = control;

    if (!value) {
      return false; // No validation error if the date is empty
    }

    // Regular expression to validate a date in dd-mm-yyyy format
    const regex = /^\d{2}-\d{2}-\d{4}$/;

    if (regex.test(value)) {
      // Date format is valid, further validation can be added
      return true;
    } else {
      return false; // Return a validation error
    }
  }

  isNumericField(num: string) {
    const value = num;
    if (value && isNaN(Number(value))) {
      return false;
    }
    else {
      return true;
    }
  }

  onImportGRN() {

    const importGRNList: any[] = [];

    this.importDataList.forEach(GRN => {
      const currentGRN = GRN || {};
      // currentGRN.GRN_Date = this.utility.getDBDateFormate(currentGRN.GRN_Date);
      // currentGRN.Purchase_Order_Date = this.utility.getDBDateFormate(currentGRN.Purchase_Order_Date);
      // currentGRN.Delivery_Date = this.utility.getDBDateFormate(currentGRN.Delivery_Date);
      currentGRN.Grn_Products = this.importDataProductList.filter(obj => obj.GRN_Number === GRN.GRN_Number);
      importGRNList.push(currentGRN);
    });

    this.importGRN(importGRNList);
  }

  importGRN(list: any[]) {
    const importGRNList = list || [];

    this.log.log('importGRNList : ', importGRNList);
    // return;
    
    this.subscription.add(
      this.grn.importGRN(importGRNList).subscribe({
        next: response => {
          this.log.log('grn response => ', response);
          if (response) {
            this.alert.showMixinAlert('GRN Imported successfully !!!', null, '/grn');
          }
        },
        error: error => { },
        complete: () => { }
      })
    )


    // return;
    // from(importGRNList).pipe(
    //   concatMap(GRN => this.grn.saveGRN(GRN))
    // ).subscribe({
    //   next: response => {
    //     this.log.log('grn response => ', response);
    //   },
    //   error: error => { },
    //   complete: () => { }
    // })
  }

  navigateBack() {
    this.route.navigateByUrl('/grn');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
