import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { GrnService } from 'src/app/services/transaction/grn.service';
import { StockReceiveService } from 'src/app/services/transaction/stock-receive.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-grn-detail',
  templateUrl: './grn-detail.component.html',
  styleUrls: ['./grn-detail.component.scss']
})
export class GrnDetailComponent implements OnInit, OnDestroy {

  employeeCode = '';

  grnNumber = '';
  grnDetail: any = {};
  subscription: Subscription = new Subscription();

  isAllProduct = false;

  isShowDetailView = false;

  receivableProducts: any[] = [];
  receivedProducts: any[] = [];

  isButtonLoader = false;

  constructor(private route: Router,
    private log: LogService,
    private credential: CredentialService,
    private utility: UtilityService,
    private alert: AlertService,
    private stockReceiveApi: StockReceiveService,
    private grn: GrnService) {
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
      this.grnNumber = localStorage.getItem('grn-number') || '';
      if (this.grnNumber) {
        this.onPageReady();
      }
      else {
        this.route.navigateByUrl('/grn');
      }
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {
    this.getUtilityDetail();
    this.getGRNDetail();
  }

  getGRNDetail() {
    this.subscription.add(
      this.grn.getGRNDetail(this.grnNumber).subscribe({
        next: response => {
          this.log.log('GRN Response : ', response);
          this.grnDetail = response || {};
          this.setStockReceiveProducts();
        },
        error: error => {
          this.log.error(error, 'grn-detail', 'getGRNDetail');
        },
        complete: () => { }
      })
    );
  }

  setStockReceiveProducts() {
    // reset list
    this.receivableProducts = [], this.receivedProducts = [];

    const products = this.grnDetail.GRN_Products || [];
    products.forEach((product: any) => {
      const quantity = parseFloat(product.Quantity || '0.00');
      const receivedQuantity = parseFloat(product.Received_Quantity || '0.00');
      const remainingQuantity = quantity - receivedQuantity;
      product.Remaining_Quantity = remainingQuantity;
      product.Entered_Quantity = remainingQuantity;
      if (remainingQuantity) {
        this.receivableProducts.push(product);
      }
      else {
        this.receivedProducts.push(product);
      }
    });
  }

  isAllChange(isChecked = false) {
    const products = this.receivableProducts || [];
    products?.forEach((product: any) => {
      product.isSelected = isChecked;
    });
  }

  saveStockReceive() {
    const products = this.utility.clone(this.receivableProducts || []);

    const receivedProducts: any[] = [];
    let subtotal = 0, roundOff = 0, grandTotal = 0;
    products.forEach((product: any) => {
      if (product.isSelected) {
        subtotal += parseFloat(product.Total_Price || '0.00');
        product.Quantity = product.Entered_Quantity;
        receivedProducts.push(product);
      }
    });

    grandTotal = Math.round(subtotal);
    roundOff = grandTotal - subtotal;

    if (!receivedProducts?.length) {
      this.alert.toastAlert('warning', 'Select minimum one product to receive');
      return;
    }

    const stockReceiveObject = {
      Stock_Receive_Number: '',
      Stock_Receive_Date: '',
      Reference_Number: this.grnDetail.GRN_Number || '',
      Reference_Date: this.utility.getDBDateFormate(this.grnDetail.GRN_Date || ''),
      Warehouse_Code: this.grnDetail.Warehouse_Code || '',
      Warehouse_Name: this.grnDetail.Warehouse_Name || '',
      Warehouse_Address: this.grnDetail.Warehouse_Address || '',
      Terms_Condition: this.grnDetail.Terms_Condition || '',
      Notes: this.grnDetail.Notes || '',
      Remarks: this.grnDetail.Remarks || '',
      Sub_Total: subtotal?.toFixed(2),
      Order_Total_Charge: '0.00',
      Order_Total_Charge_Tax: '0.00',
      Order_Total_Charge_With_Tax: '0.00',
      Rounding_Off: roundOff?.toFixed(2),
      Grand_Total: grandTotal?.toFixed(2),
      Created_By: this.employeeCode,
      Stock_Receive_Products: receivedProducts
    }
    // this.log.log('stockReceiveObject : ', stockReceiveObject);
    // return;

    this.subscription.add(
      this.stockReceiveApi.saveStockReceive(stockReceiveObject).subscribe({
        next: response => {
          this.log.log('stock receive response : ', response);
          if (response) {
            this.alert.showMixinAlert('Stock received successfully !!!', null, '/grn');
          }
        },
        error: error => { this.log.error(error, 'grn-detail', 'saveStockReceive'); },
        complete: () => { }
      })
    );

  }

  getUtilityDetail() {
    this.employeeCode = this.credential.getLoginCredentials('Employee_Code');
  }

  navigateToList() {
    this.route.navigateByUrl('/grn');
  }

  navigateBack() {
    this.route.navigateByUrl('/grn');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    localStorage.removeItem('grn-number');
  }
}
