import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { CargoService } from 'src/app/services/transaction/cargo.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-cargo-outward-scan',
  templateUrl: './cargo-outward-scan.component.html',
  styleUrls: ['./cargo-outward-scan.component.scss']
})
export class CargoOutwardScanComponent implements OnInit, OnDestroy {

  employeeCode = '';

  billNo = '';
  itemBarcode = '';

  invalidBillMessage = '';
  invalidItemBarcodeMessage = '';

  filterDate: any = {};

  subscription: Subscription = new Subscription();

  productList: any[] = [];
  filteredList: any[] = [];

  scannedList: any[] = []; // display table
  modalDisplayList: any[] = []; // modal table

  outwardLoader = false;

  constructor(private route: Router,
    private log: LogService,
    private alert: AlertService,
    private credential: CredentialService,
    private cargoApi: CargoService,
    private utility: UtilityService) {
    this.onPreInit();
  }

  onPreInit() { }

  ngOnInit(): void {

    this.employeeCode = this.credential.getLoginCredentials('Employee_Code');

    this.filterDate = this.utility.getDateList(Master.dateOption.thisMonth);
    this.getImportedList();
  }

  getImportedList() {
    this.subscription.add(
      this.cargoApi.getCargoList(this.filterDate.fromDate, this.filterDate.toDate).subscribe({
        next: response => {
          // this.log.log('imported barcode list : ', response);
          const filterList = (response || []).filter((obj: any) => obj.Barcode && !obj.Outward_By);
          this.productList = filterList;
          this.log.log('inward list : ', this.productList);
        },
        error: error => { this.log.error(error, 'manual-inward-scan', 'getImportedList'); }
      })
    );
  }

  onBillNoScan(e: any, scannedText: string) {

    this.invalidBillMessage = '';

    // get key event
    e = e || window.event;
    const keyCode = e.keyCode;
    // check up down left right arrow
    this.log.log('keyCode : ', keyCode);
    if (keyCode === 13) { // enter event
      let searchKey = scannedText?.trim();
      this.log.log('searchKey : ' + searchKey);

      const selectedFields = this.productList.filter(obj => ((obj.AWB_NO === searchKey) && !obj.isScanned)).map(obj => { return obj.Barcode });
      if (!selectedFields?.length) {
        this.log.log('Invalid bill number');
        this.invalidBillMessage = 'Invalid Bill Number';
        return;
      }

      this.filteredList = selectedFields || [];
      this.log.log('filteredList : ', this.filteredList);

      // set focus to scan
      document.getElementById('bill-no-scan-field')?.focus();
    }
  }

  onBarcodeScan(e: any, scannedText: string) {

    this.invalidItemBarcodeMessage = '';

    // get key event
    e = e || window.event;
    const keyCode = e.keyCode;
    this.log.log('keyCode : ', keyCode);

    if (keyCode === 13) { // enter event
      let searchKey = scannedText?.trim();
      this.log.log('searchKey : ' + searchKey);

      // check is exits
      const selectedItem = this.scannedList.find(obj => obj.Barcode === searchKey);
      if (selectedItem) {
        this.log.log('Barcode already exist');
        // this.alert.toastAlert('warning', 'Item already scanned');
        this.invalidItemBarcodeMessage = 'Item already scanned';
        return;
      }

      // invalid barcode
      const barcode = this.filteredList.find(code => (code === searchKey));
      if (!barcode) {
        this.log.log('Invalid barcode');
        this.invalidItemBarcodeMessage = 'Invalid Barcode';
        return;
      }

      const currentItem: any = this.productList.find(obj => (obj.AWB_NO === this.billNo) && (obj.Barcode === searchKey) && !obj.isScanned);
      if (!currentItem) {
        this.log.log('Invalid barcode');
        this.invalidItemBarcodeMessage = 'Invalid Barcode';
        return;
      }

      currentItem.isScanned = true;
      this.scannedList.push(currentItem);

      // reset scan
      this.reset();
    }
  }

  reset() {
    this.modalDisplayList = [];
    this.itemBarcode = '';

    this.log.log('product list : ', this.productList, ' filter list : ', this.filteredList);
  }

  onSaveOutward() {
    this.log.log('outward list : ', this.scannedList);

    // validation loader
    if (!this.scannedList?.length) {
      this.alert.toastAlert('warning', 'Scan minimum one product to save');
      return;
    }

    // validation completed
    this.outwardLoader = true;
    const outwardList: any[] = [];

    this.scannedList.forEach(item => {
      const newObject = {
        AWB_NO: item.AWB_NO,
        HAWB_NO: item.HAWB_NO,
        Barcode: item.Barcode,
        Outward_By: this.employeeCode
      }
      outwardList.push(newObject);
    });

    //
    this.subscription.add(
      this.cargoApi.outwardCargoList(outwardList).subscribe({
        next: response => {
          this.log.log('save in ward list response : ', response);
          if (response) {
            this.alert.showMixinAlert('Data outward successfully !!!', null, '/cargo-outward');
          }
          const timeOutID = setTimeout(() => { this.outwardLoader = false; clearTimeout(timeOutID); }, 1000);
        },
        error: error => {
          this.log.error(error, 'manual-inward-scan', 'onSaveInward');
          const timeOutID = setTimeout(() => { this.outwardLoader = false; clearTimeout(timeOutID); }, 1000);
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
