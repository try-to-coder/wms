import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { PutawayService } from 'src/app/services/transaction/putaway.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-put-away-modal',
  templateUrl: './put-away-modal.component.html',
  styleUrls: ['./put-away-modal.component.scss']
})
export class PutAwayModalComponent implements OnInit, OnDestroy {

  @Output() toggleEvent = new EventEmitter();

  private _data: any;
  get data(): any {
    return this._data;
  }
  @Input() set data(value: any) {
    this._data = value;
    this.onDataChange(value);
  }

  selectedProductList: any[] = [];
  selectedProductBarCodes: any[] = [];
  rackMasterList: any[] = [];
  stockReceiveDetail: any = {};

  subscription: Subscription = new Subscription();

  totalQuantity = 0;

  scanRack = '';
  scanShelf = '';
  scanBin = '';
  scanItem = '';

  employeeCode = '';


  putAwayList: any[] = [];
  scannedBarcodeList: any[] = [];

  constructor(private log: LogService,
    private alert: AlertService,
    private credential: CredentialService,
    private utility: UtilityService,
    private putAwayApi: PutawayService) { }

  ngOnInit(): void {
    this.employeeCode = this.credential.getLoginCredentials('Employee_Code');
  }

  onDataChange(value: any) {
    const data = value || {};

    this.log.log('param data : ', data);

    //
    this.stockReceiveDetail = data.receiveDetail || {};
    this.selectedProductList = data.products || [];
    this.selectedProductBarCodes = data.barCodes || [];
    this.rackMasterList = data.rackMasters || [];

    let totalQuantity = 0;
    this.selectedProductList.forEach(obj => {
      totalQuantity += typeof obj.Available_Quantity === 'string' ? parseFloat(obj.Available_Quantity || '0.00') : obj.Available_Quantity;
    });

    this.totalQuantity = totalQuantity;

    // reset
    this.putAwayList = [];
  }

  onRackChange(e: any, value: string) {
    // this.log.log('data : => ', e, value);

    // get key event
    e = e || window.event;
    const keyCode = e.keyCode;
    // this.log.log('keyCode : ', keyCode);

    if (keyCode === 13) { // enter event
      const rackList = this.rackMasterList.filter(obj => obj.Rack_Code === this.scanRack);
      if (!rackList?.length) {
        // this.log.log('rack is invalid');
        this.alert.toastAlert('warning', 'Rack is invalid !');
        this.invalidSound();
        return;
      }
    }
  }

  onShelveChange(e: any, value: string) {
    // this.log.log('data : => ', e, value);

    // get key event
    e = e || window.event;
    const keyCode = e.keyCode;
    // this.log.log('keyCode : ', keyCode);

    if (keyCode === 13) { // enter event
      if (!this.scanRack) {
        this.alert.toastAlert('warning', 'Scan Rack before shelf');
        this.invalidSound();
        return;
      }

      const shelveList = this.rackMasterList.filter(obj => (obj.Rack_Code === this.scanRack) && (obj.Shelf_Code === this.scanShelf));
      if (!shelveList?.length) {
        // this.log.log('rack is invalid');
        this.alert.toastAlert('warning', 'Shelf is invalid !');
        this.invalidSound();
        return;
      }
    }
  }

  onBinChange(e: any, value: string) {
    // this.log.log('data : => ', e, value);

    // get key event
    e = e || window.event;
    const keyCode = e.keyCode;
    // this.log.log('keyCode : ', keyCode);

    if (keyCode === 13) { // enter event
      if (!this.scanRack || !this.scanShelf) {
        this.alert.toastAlert('warning', 'Scan Rack and Shelf before bin');
        this.invalidSound();
        return;
      }

      const binList = this.rackMasterList.filter(obj => (obj.Rack_Code === this.scanRack) && (obj.Shelf_Code === this.scanShelf) && (obj.Bin_Code === this.scanBin));
      if (!binList?.length) {
        // this.log.log('rack is invalid');
        this.alert.toastAlert('warning', 'Bin is invalid !');
        this.invalidSound();
        return;
      }
    }
  }

  onItemChange(e: any, value: string) {
    this.log.log('data : => ', e, value);

    // get key event
    e = e || window.event;
    const keyCode = e.keyCode;
    this.log.log('keyCode : ', keyCode);

    if (keyCode === 13) { // enter event

      // validate all fields are not empty
      if (!this.scanRack || !this.scanShelf || !this.scanBin) {
        this.alert.toastAlert('warning', 'Add Rack, Shelf, Bin properly');
        return;
      }

      // check is all valid
      const binList = this.rackMasterList.filter(obj => (obj.Rack_Code === this.scanRack) &&
        (obj.Shelf_Code === this.scanShelf) && (obj.Bin_Code === this.scanBin));
      if (!binList?.length) {
        this.alert.toastAlert('warning', 'Added Rack, Shelf, Bin are invalid');
        return;
      }

      // check is valid barcode
      const existingBarcode = this.selectedProductBarCodes.find(obj => obj.Barcode === this.scanItem);
      if (!existingBarcode) {
        this.alert.toastAlert('warning', 'Scanner barcode is invalid');
        return;
      }

      // check barcode is already exist
      const isExist = this.scannedBarcodeList?.some(barcode => barcode === this.scanItem);
      if (isExist) {
        this.alert.toastAlert('warning', 'Barcode already scanned');
        return;
      }

      // check is valid material
      const products = this.selectedProductList.filter(obj => obj.Material_Code === existingBarcode.Material_Code);
      const productLength = products?.length;
      if (!productLength) {
        this.alert.toastAlert('warning', 'Item mismatched');
        return;
      }

      let selectedProduct = products[0];
      if (productLength > 1) {
        // find quantity is equal
      }

      // finally insert and clear fields
      this.addToScannedList(selectedProduct);
    }
  }

  addToScannedList(product: any) {

    const selectedProduct = product || {};

    // check already exits
    const row = this.putAwayList.find(obj => (obj.Rack_Code === this.scanRack) && (obj.Shelf_Code === this.scanShelf) && (obj.Bin_Code === this.scanBin));
    if (row) {
      const product = row.Putaway_Product?.find((obj: any) =>
        (obj.Material_Code === selectedProduct.Material_Code) && (obj.Stock_Receive_Product_Id === selectedProduct.Stock_Receive_Product_Id));
      if (product) {
        // increase quantity && add barcode
        product.Quantity = parseFloat(product.Quantity || '0') + 1;
        product.Barcodes?.push(this.scanItem);
        this.scannedBarcodeList.push(this.scanItem);
        this.resetScan();
        return;
      }
    }

    // new data
    const data = {
      Putaway_Number: '',
      Putaway_Date: '',
      Warehouse_Code: this.stockReceiveDetail.Warehouse_Code,
      Warehouse_Name: this.stockReceiveDetail.Warehouse_Name,
      Reference_Number: this.stockReceiveDetail.Stock_Receive_Number,
      Reference_Date: this.utility.getDBDateFormate(this.stockReceiveDetail.Stock_Receive_Date),
      Rack_Code: this.scanRack,
      Shelf_Code: this.scanShelf,
      Bin_Code: this.scanBin,
      Created_By: this.employeeCode,
      Putaway_Product: [{
        GRN_Number: '',
        GRN_Date: '',
        Material_Code: selectedProduct.Material_Code,
        Part_Number: selectedProduct.Part_Number,
        Barcode: selectedProduct.Barcode,
        HSN_Code: selectedProduct.HSN_Code,
        Material_Name: selectedProduct.Material_Name,
        Quantity: '1',
        Stock_Receive_Product_Id: selectedProduct.Stock_Receive_Product_Id,
        Barcodes: [this.scanItem]
      }]
    };

    this.putAwayList.push(data);
    this.scannedBarcodeList.push(this.scanItem);
    this.resetScan();
  }

  resetScan() {
    this.scanItem = '';
  }

  clearRackField() {
    this.scanRack = '';
    this.scanShelf = '';
    this.scanBin = '';
    this.scanItem = '';
  }

  clearShelfField() {
    this.scanShelf = '';
    this.scanBin = '';
  }

  clearBinField() {
    this.scanBin = '';
  }

  onDeleteScannedProduct(product: any, i: number) {
    this.log.log('selected product : ', product);

    // remove barcode
    const barCodes = product.Barcodes || [];
    this.log.log('barCodes : ', barCodes);
    // delete scanned bar codes
    if (barCodes?.length) {
      const newBarCodes: any[] = [];
      this.scannedBarcodeList.forEach((barCode: any, i: number) => {
        if (!barCodes.includes(barCode)) {
          newBarCodes.push(barCode);
        }
      });
      this.scannedBarcodeList = newBarCodes;
    }

    //
    this.putAwayList.splice(i, 1);
  }

  onCompletePutAway() {

    // validation
    if (!this.putAwayList?.length) {
      this.alert.toastAlert('warning', 'Scan products to add');
      return;
    }

    this.log.log('putAwayList : ', this.putAwayList);
    // return;

    // validation success

    return;
    this.subscription.add(
      this.putAwayApi.savePutAway(this.putAwayList).subscribe({
        next: response => {
          this.log.log('put-away response : ', response);
          if (response) {
            this.onClose();
            this.alert.successAlert('Putaway saved successfully!!!', 'Newly created putaway number is : ' + response.Putaway_Number, '/putaway');

            // this.alert.showMixinAlert('Putaway saved successfully!!!', '/putaway');
          }
        },
        error: error => { this.log.error(error, 'put-away-modal', 'onCompletePutAway'); },
        complete: () => { }
      })
    );

  }



  validSound() {

  }

  // play invalid sound
  invalidSound() {

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onClose() {
    this.toggleEvent.emit();
  }

}
