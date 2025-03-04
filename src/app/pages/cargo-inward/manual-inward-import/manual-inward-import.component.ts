import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, Subscription, tap } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { LogService } from 'src/app/services/log.service';
import { CargoService } from 'src/app/services/transaction/cargo.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manual-inward-import',
  templateUrl: './manual-inward-import.component.html',
  styleUrls: ['./manual-inward-import.component.scss']
})
export class ManualInwardImportComponent implements OnInit, OnDestroy {

  uploadInitiated = false;
  importDataList: any[] = [];

  validationReportList: any[] = [];

  isValidExcel = false;
  excelStatus = '';

  EXCEL_MAX_LIMIT = 1000;

  isValidateCompleted = false;
  isValidateSuccess = false;

  validationLoader = false;
  validationErrorCount = 0;

  subscription: Subscription = new Subscription();

  constructor(
    private log: LogService,
    private route: Router,
    private cargoApi: CargoService,
    private alert: AlertService,
    private utility: UtilityService) { }


  ngOnInit(): void {
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

    const invalidField = this.importDataList.find((row: any) => (!row.IGM_NO && !row.AWB_NO && !row.HAWB_NO));
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

  validateExcel() {
    this.isValidateSuccess = false;
    this.isValidateCompleted = false;

    this.validationReportList = [];
    this.validationErrorCount = 0;

    if (this.importDataList && this.importDataList.length) {
      this.validationLoader = true; // for loader
      this.excelValidation();


      // this.excelValidation().subscribe({
      //   next: (response: any) => {
      //     this.log.log('response : ', response);
      //     if (!this.validationErrorCount) {
      //       this.isValidateSuccess = true;
      //     }
      //     this.isValidateCompleted = true;
      //   },
      //   error: (error: any) => {
      //     this.isValidateCompleted = true;
      //     // TODO - Error occurred during validation
      //   },
      //   complete: () => {
      //     this.log.log(this.validationReportList);
      //     setTimeout(() => { this.validationLoader = false; }, 1000);
      //   }
      // })
    }
  }

  excelValidation() {

    const duplicateEntry: any = [];
    const lengthExceedingFields: any = [];
    const addedList: any[] = [];

    const validatingFields = [
      { name: 'IGM_NO', length: 7 },
      { name: 'IGM_YR', length: 4 },
      { name: 'AWB_NO', length: 20 },
      { name: 'HAWB_NO', length: 20 },
      { name: 'MFST_PKGS', length: 8 },
      { name: 'MFST_WGHT', length: 12 },
      { name: 'COMM_DESC', length: 30 }
    ];

    this.importDataList.forEach((data: any, index: number) => {
      //
      const displayFields = {
        AWB_NO: data.AWB_NO || '',
        HAWB_NO: data.HAWB_NO || ''
      }

      const airBillNo = data.AWB_NO || '';
      const hawbNo = data.HAWB_NO || '';
      if (airBillNo && hawbNo) {
        const isExist = addedList.find(obj => obj.AWB_NO === '' && obj.HAWB_NO == '');
        if (isExist) {
          duplicateEntry.push(displayFields);
          return;
        }
      }

      if (validatingFields.length) {
        validatingFields.forEach((field: any) => {
          if (data[field.name]?.length > field.length)
            lengthExceedingFields.push({ Row: index + 1, Column: field.name, Value: data[field.name] });
        });
      }
    });

    if (duplicateEntry?.length) {
      this.validationErrorCount++;
      this.validationReportList.push({
        status: 'error',
        message: duplicateEntry?.length + 'Bill no and HAWB_NOs are duplicated',
        data: duplicateEntry
      });
    }

    if (lengthExceedingFields?.length) {
      this.validationErrorCount++;
      this.validationReportList.push({
        status: 'error',
        message: lengthExceedingFields.length + ' field(s) exceeding maximum lengths!',
        data: lengthExceedingFields
      });
    }

    // for clear time out
    const timeOutID = setTimeout(() => {
      this.validationLoader = false;
      if (!this.validationReportList?.length) {
        this.isValidateSuccess = true;
      }
      this.isValidateCompleted = true;
      clearTimeout(timeOutID);
    }, 1000);


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

  onImport() {
    this.uploadInitiated = true;

    this.subscription.add(
      this.cargoApi.importCargoList(this.importDataList).subscribe({
        next: response => {
          this.log.log('cargo response : ', response);
          if (response) {
            this.alert.showMixinAlert('Data imported successfully !!!', null, '/cargo-inward');
          }
        },
        error: error => { this.log.error(error, 'manual-inward-import', 'onImport') }
      })
    );

  }

  refresh() {
    this.uploadInitiated = false;
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
