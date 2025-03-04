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
  selector: 'app-manual-inward-scan',
  templateUrl: './manual-inward-scan.component.html',
  styleUrls: ['./manual-inward-scan.component.scss']
})
export class ManualInwardScanComponent implements OnInit, OnDestroy {

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

  inwardLoader = false;

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
          this.log.log('imported barcode list : ', response);
          const filterList = (response || []).filter((obj: any) => !obj.Barcode);
          this.productList = filterList;
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

      const selectedFields = this.productList.filter(obj => ((obj.AWB_NO === searchKey) && !obj.isScanned)).map(obj => { return obj.HAWB_NO });
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
        this.alert.toastAlert('warning', 'Item already scanned');
        this.invalidItemBarcodeMessage = 'Item already scanned';
        return;
      }

      // invalid barcode
      const filterList = this.filteredList.filter(code => this.isBarcodeValid(code, searchKey));
      this.log.log('filter list : ', filterList);

      const listLength = filterList?.length;

      if (!listLength) {
        this.log.log('Invalid barcode');
        this.invalidItemBarcodeMessage = 'Invalid Barcode';
        return;
      }

      if (listLength > 1) {
        const matchedList: any[] = [];
        filterList.forEach(itemNo => {
          const currentProductIndex = this.productList.findIndex(obj => (obj.AWB_NO === this.billNo) && (obj.HAWB_NO === itemNo) && !obj.isScanned);
          if (currentProductIndex !== -1) {
            const currentProduct = this.productList[currentProductIndex] || {};
            currentProduct.Index = currentProductIndex;
            matchedList.push(currentProduct);
          }
        });
        this.modalDisplayList = matchedList;

        // open model
        this.openSelectionModal();
      }
      else {
        const selectedValue = filterList[0] || '';
        const currentProductIndex = this.productList.findIndex(obj => (obj.AWB_NO === this.billNo) && (obj.HAWB_NO === selectedValue) && !obj.isScanned);
        if (currentProductIndex === -1) {
          this.alert.toastAlert('warning', 'Item not matched');
          return;
        }

        const currentProduct = this.productList[currentProductIndex] || {};
        if (currentProduct?.AWB_NO) {
          currentProduct.Barcode = this.itemBarcode || '';
          const isExist = this.isExistingItem(currentProduct.Barcode);
          if (isExist) {
            this.alert.toastAlert('warning', 'Item already scanned');
            return;
          }

          this.scannedList.push(currentProduct);

          // set scanned
          this.productList[currentProductIndex].isScanned = true;

          // reset scan
          this.reset();
        }
      }
    }
  }

  isBarcodeValid(code: string, value: string): boolean {

    const selectedCode = code || '';
    const scannedValue = value || '';

    if (!selectedCode || !scannedValue) {
      return false;
    }

    if (scannedValue.indexOf(selectedCode) !== -1) {
      return true;
    }

    // if (selectedCode !== '221100110') {
    //   return false;
    // }

    // 
    const codes = selectedCode?.split('');
    let isValid = true, newValue = scannedValue;

    // this.log.log('start value : ', newValue);

    codes.forEach(o => {
      const selectedIndex = newValue.indexOf(o);
      // this.log.log('o : ', o, ' selectedIndex : ' + selectedIndex);
      if (selectedIndex !== -1) {
        newValue = newValue?.substring(selectedIndex + 1);
        // this.log.log('newValue : ', newValue);
      }
      else {
        isValid = false;
      }
    });

    return isValid;
  }

  onDeleteScanItem(item: any, i: number) {
    this.log.log('selected item : ', item, 'index : ', i);
    const barcode = item?.Barcode || '';
    const selectedProduct = this.productList.find(obj => obj.Barcode === barcode);
    if (selectedProduct) {
      selectedProduct.isScanned = false;
    }

    // filter list
    this.refreshFilterList();

    // remove item
    this.scannedList.splice(i, 1);
  }

  openSelectionModal() {
    document.getElementById('matched-selection-open-modal')?.click();
  }

  onProductSelect(item: any) {
    const selectedItem = item || {};
    if (!selectedItem?.AWB_NO) {
      this.log.log('Invalid item');
      return;
    }

    selectedItem.Barcode = this.itemBarcode || '';
    const isExist = this.isExistingItem(selectedItem.Barcode);
    if (isExist) {
      this.alert.toastAlert('warning', 'Item already scanned');
      return;
    }

    this.scannedList.push(selectedItem);
    if (selectedItem.Index != null) {
      this.productList[selectedItem.Index].isScanned = true;
    }

    // close modal
    this.closeSelectionModal();

    // reset scan
    this.reset();
  }

  isExistingItem(barcode: string): boolean {
    if (!this.scannedList?.length) {
      return false;
    }
    const data = this.scannedList.find(obj => obj.Barcode === barcode);
    return data?.Barcode ? true : false;
  }

  closeSelectionModal() {
    document.getElementById('matched-selection-close-modal')?.click();
  }

  reset() {
    this.modalDisplayList = [];
    this.itemBarcode = '';

    // refresh product list based on airway bill no
    this.refreshFilterList();

    this.log.log('product list : ', this.productList, ' filter list : ', this.filteredList);
  }

  // refresh product list based on airway bill no
  refreshFilterList() {
    const selectedFields = this.productList.filter(obj => ((obj.AWB_NO === this.billNo) && !obj.isScanned)).map(obj => { return obj.HAWB_NO });
    if (!selectedFields?.length) {
      this.filteredList = [];
      this.billNo = '';
      return;
    }
    this.filteredList = selectedFields || [];
  }

  onSaveInward() {

    // validation loader

    if (!this.scannedList?.length) {
      this.alert.toastAlert('warning', 'Scan minimum one product to save');
      return;
    }

    // validation completed
    this.inwardLoader = true;
    const inwardList: any[] = [];

    this.scannedList.forEach(item => {
      const newObject = {
        AWB_NO: item.AWB_NO,
        HAWB_NO: item.HAWB_NO,
        Barcode: item.Barcode,
        Inward_By: this.employeeCode
      }
      inwardList.push(newObject);
    });

    //
    this.subscription.add(
      this.cargoApi.inwardCargoList(inwardList).subscribe({
        next: response => {
          this.log.log('save in ward list response : ', response);
          if (response) {
            this.alert.showMixinAlert('Data inward successfully !!!', null, '/cargo-inward');
          }
          const timeOutID = setTimeout(() => { this.inwardLoader = false; clearTimeout(timeOutID); }, 1000);
        },
        error: error => {
          this.log.error(error, 'manual-inward-scan', 'onSaveInward');
          const timeOutID = setTimeout(() => { this.inwardLoader = false; clearTimeout(timeOutID); }, 1000);
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
