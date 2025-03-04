import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription, forkJoin, of, tap } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { MaterialService } from 'src/app/services/master/material.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { GrnService } from 'src/app/services/transaction/grn.service';
import { StockReceiveService } from 'src/app/services/transaction/stock-receive.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-grn',
  templateUrl: './add-grn.component.html',
  styleUrls: ['./add-grn.component.scss']
})
export class AddGrnComponent implements OnInit {
  employeeCode = '';

  submitted: boolean = false;

  grnDetail: any = {};
  productDetail: any = {
    Material_Code: '',
    Material_Name: '',
    Part_Number: '',
    HSN_Code: '',
    Quantity: ''
  };

  materialList: any[] = [];
  warehouseList: any[] = [];
  receivableProducts: any[] = [];
  receivedProducts: any[] = [];

  subscription: Subscription = new Subscription();

  constructor(
    private route: Router,
    private log: LogService,
    private credential: CredentialService,
    private utility: UtilityService,
    private alert: AlertService,
    private stockReceiveApi: StockReceiveService,
    private material: MaterialService,
    private warehouse: WarehouseService
  ) {
    this.onPreInit()
  }

  onPreInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.setPageUtility();
      this.onPageReady();
    } else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  isRightsExisting(): boolean {
    return true;
  }

  setPageUtility() {
    this.employeeCode = this.credential.getLoginCredentials('Employee_Code');
  }


  ngOnInit() {

  }

  onPageReady(isRerender = false) {
    this.subscription.add(this.load().subscribe(
      response => {
        this.log.log('get grn response : ', response)
        const load = response || {};

        this.materialList = load.material || [];
        this.log.log('material list : ', this.materialList);

        this.warehouseList = load.warehouse || [];
        this.log.log('warehouse list : ', this.warehouseList);
      },
      error => { this.log.error(error, 'grn add', 'onPageReady'); },
      () => this.log.log('get grn add completed : ')
    ));
  }

  load(): Observable<any> {
    return forkJoin({ 
      material: this.material.getMaterialList(),
      warehouse: this.warehouse.gerWarehouseDropdown()
    });
  }

  getMaterial(e: any): void {
    const code = e.target.value || '';
    this.subscription.add(
      this.material.getMaterial(code).subscribe({
        next: (response: any) => {
          this.log.log('material detail :', response);
          this.productDetail = response || {};
          this.productDetail.Base_Price = response.Purchase_Price || '0.00';
        }, error: (error: any) => {
          this.log.log(error.message || 'Get material details');
        }
      })
    )
  }

  getWarehouse(e: any): void {
    const code = e.target.value || '';
    this.subscription.add(
      this.warehouse.getWarehouse(code).subscribe({
        next: (response: any) => {
          const data = response || {}
          this.log.log('warehouse detail :', response);
          this.grnDetail.Warehouse_Address = data.Address_Line_1 || '';
          this.grnDetail.Warehouse_Code = data.Warehouse_Code || '';
          this.grnDetail.Warehouse_Name = data.Warehouse_Name || '';
        }, error: (error: any) => {
          this.log.log(error.message || 'Get warehouse details');
        }
      })
    )
  }

  addProductToList(): void {
    if (!this.productDetail.Material_Code) {
      return;
    }

    if (this.receivableProducts.length) {
      const existMaterial = this.receivableProducts.find((item: any) => item.Material_Code == this.productDetail.Material_Code);

      if (existMaterial) {
        this.alert.errorAlert('Material code is already exist');
        return;
      }
    }

    this.receivableProducts.push(this.productDetail);
    this.resetProduct();
  }

  removeProduct(code: any): void {
    const indexToRemove = this.receivableProducts.findIndex((item: any) => item.Material_Code == code);
    if (indexToRemove !== -1) {
      this.receivableProducts.splice(indexToRemove, 1);
    }
  }

  saveStockReceive() {
    this.submitted = true;

    if (!this.grnDetail.GRN_Number ||
      !this.grnDetail.GRN_Date ||
      !this.grnDetail.Purchase_Order_Number ||
      !this.grnDetail.Purchase_Order_Date ||
      !this.grnDetail.Supplier_Name ||
      !this.grnDetail.Warehouse_Name ||
      !this.grnDetail.Warehouse_Address) {
      this.alert.errorAlert('Enter mandatory fields');
      return;
    }
    const products = this.utility.clone(this.receivableProducts || []);

    if (!products.length) {
      this.alert.errorAlert('Add minimum one product');
      return;
    }

    // const charges = {
    //   Stock_Receive_Charge_Id: "",
    //   Stock_Receive_Number: "",
    //   Charge_Line_Item_No: "",
    //   Charge_Code: "",
    //   Charge_Name: "",
    //   Charge_Amount: "",
    //   SGST_Percentage: "",
    //   SGST_Amount: "",
    //   CGST_Percentage: "",
    //   CGST_Amount: "",
    //   IGST_Percentage: "",
    //   IGST_Amount: "",
    //   Charge_Total_Amount: ""
    // }

    const receivedProducts: any[] = [];
    let subtotal: any = 0, roundOff: any = 0, grandTotal: any = 0;
    products.forEach((product: any) => {
      const unitPrice: any = (parseFloat(product.Base_Price || '0.00') - parseFloat(product.Discount_Amount || '0.00')).toFixed(2) || '0.00';
      const sellPrice: any = (parseFloat(unitPrice || '0.00') + parseFloat(product.Unit_Tax_Amount || '0.00')).toFixed(2) || '0.00';
      const totalPrice: any = (parseFloat(sellPrice || '0.00') * parseFloat(product.Quantity || '0.00')).toFixed(2) || '0.00';
      const totalTaxableAmount: any = (parseFloat(unitPrice || '0.00') * parseFloat(product.Quantity || '0.00')).toFixed(2) || '0.00';
      const totalTaxAmount: any = (parseFloat(product.Unit_Tax_Amount || '0.00') * parseFloat(product.Quantity || '0.00')).toFixed(2) || '0.00';

      const productObject = {
        // Stock_Receive_Product_Id: "",
        // Stock_Receive_Number: "",
        // Line_Item_No: "",
        Material_Code: product.Material_Code || '',
        Part_Number: product.Part_Number || '',
        Barcode: product.Barcode || '',
        HSN_Code: product.HSN_Code || '',
        Material_Name: product.Material_Name || '',
        Material_Group: product.Material_Group || '', // not in read
        Material_Type: product.Material_Type || '', // not in read 
        Material_Brand: product.Material_Brand || '', // not in read
        Material_Model: product.Material_Model || '', // not in read
        Material_UOM: product.Material_UOM || '', // not in read
        Base_Price: (product.Base_Price) || '0.00',
        Discount_Amount: '0.00',
        Discount_Percentage: "0.00",
        Unit_Price: unitPrice,
        Unit_Tax_Percentage: "0.00",
        Unit_Tax_Amount: "0.00",
        Sell_Price: sellPrice,
        Quantity: product.Quantity,
        Putaway_Quantity: product.Putaway_Quantity || '', // not in read
        Received_Quantity: product.Received_Quantity || '', // not in read
        SGST_Percentage: "0.00",
        SGST_Amount: "0.00",
        CGST_Percentage: "0.00",
        CGST_Amount: "0.00",
        IGST_Percentage: "0.00",
        IGST_Amount: "0.00",
        Total_Price: totalPrice,
        Total_Taxable_Amount: totalTaxableAmount,
        Total_Tax_Amount: totalTaxAmount
      }
      subtotal += parseFloat(productObject.Total_Price || '0.00');
      receivedProducts.push(productObject);
    });

    grandTotal = Math.round(subtotal);
    roundOff = Math.round(grandTotal);

    const stockReceiveObject: any = {
      Stock_Receive_Number: '',
      Stock_Receive_Date: '',
      Reference_Number: this.grnDetail.GRN_Number || '',
      Reference_Date: moment(this.grnDetail.GRN_Date, 'DD-MM-YYYY').format('YYYY-MM-DD') || '',
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
      Stock_Receive_Products: receivedProducts,
      // Stock_Receive_Charges: [charges]
    }

    this.log.log('stockReceiveObject : ', stockReceiveObject);
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

  resetProduct(): void {
    this.productDetail = {
      Material_Code: '',
      Material_Name: '',
      Part_Number: '',
      HSN_Code: '',
      Quantity: ''
    };
  }

  navigateBack() {
    this.route.navigateByUrl('/grn');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
