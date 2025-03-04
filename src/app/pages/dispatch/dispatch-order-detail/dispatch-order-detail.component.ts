import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, Subscription, tap } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { EmployeeService } from 'src/app/services/master/employee.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { DispatchService } from 'src/app/services/transaction/dispatch.service';
import { PickListService } from 'src/app/services/transaction/pick-list.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-dispatch-order-detail',
  templateUrl: './dispatch-order-detail.component.html',
  styleUrls: ['./dispatch-order-detail.component.scss']
})
export class DispatchOrderDetailComponent implements OnInit, OnDestroy {

  employeeCode = '';

  pickListNumber = '';
  pickListDetail: any = {};

  // 
  pickingProducts: any[] = [];

  rackMappingList: any[] = [];
  // selectedEmployee = '';
  // employeeDropdown: any[] = [];

  subscription: Subscription = new Subscription();

  isAllProduct = false;

  isValidate = false;

  pickingModal: any = {
    pickingDetail: {},
    products: [],
    barCodes: [],
    rackMasters: []
  }

  constructor(private route: Router,
    private log: LogService,
    private credential: CredentialService,
    private utility: UtilityService,
    private alert: AlertService,
    private warehouseApi: WarehouseService,
    private employeeApi: EmployeeService,
    private dispatchApi: DispatchService,
    private pickListApi: PickListService) {
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
      this.pickListNumber = localStorage.getItem('pick-list-number') || '';
      if (this.pickListNumber) {
        this.onPageReady();
      }
      else {
        alert("call redirect");
        this.route.navigateByUrl('/dispatch');
      }
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {

    this.getOrderDetail();

    // this.subscription.add(
    //   this.onLoad().subscribe({
    //     next: (response: any) => { this.log.log('pick list load response : ', response); },
    //     error: (error: any) => { this.log.error(error, 'pick-list', 'load - pick-list', true); },
    //     complete: () => { }
    //   })
    // );
  }

  // onLoad() {

  //   let pickListDetail = of(null);
  //   let rackMaster = of(null);

  //   pickListDetail = this.pickListApi.getPickListDetail(this.pickListNumber).pipe(tap(response => {
  //     this.log.log('Pick list order response : ', response);
  //     this.pickListDetail = response || {};
  //     this.filterAvailableProducts();
  //   }));

  //   return forkJoin({ order: pickListDetail, rackMaster: rackMaster });
  // }

  getOrderDetail() {
    this.subscription.add(
      this.pickListApi.getPickListDetail(this.pickListNumber).subscribe({
        next: response => {
          this.log.log('GRN Response : ', response);
          this.pickListDetail = response || {};
          this.pickingProducts = this.pickListDetail.Picklist_Products || [];
        },
        error: error => { this.log.error(error, 'pick-list-detail', 'getOrderDetail'); },
        complete: () => { }
      })
    );
  }

  isAllChange(isChecked = false) {
    const products = this.pickListDetail.Picklist_Products || [];
    products?.forEach((product: any) => {
      product.isSelected = isChecked;
    });
  }

  getUtilityDetail() {
    // this.employeeCode = this.credential.getLoginCredentials('Employee_Code');
  }

  saveDispatch() {


    // validation completed
    const dispatchObject: any = {
      Dispatch_Number: '',
      Dispatch_Date: '',
      Reference_Number: this.pickListDetail.Picklist_Number,
      Reference_Date: this.utility.getDBDateFormate(this.pickListDetail.Picklist_Date),
      From_Warehouse_Code: this.pickListDetail.Warehouse_Code,
      From_Warehouse_Name: this.pickListDetail.Warehouse_Name,
      From_Warehouse_Address: this.pickListDetail.Warehouse_Address || '',
      To_Warehouse_Code: '',
      To_Warehouse_Name: '',
      To_Warehouse_Address: '',
      Terms_Condition: this.pickListDetail.Terms_Condition,
      Remarks: this.pickListDetail.Remarks,
      Sub_Total: this.pickListDetail.Sub_Total || '0.00',
      Rounding_Off: this.pickListDetail.Rounding_Off || '0.00',
      Grand_Total: this.pickListDetail.Grand_Total || '0.00',
      Cancelled_By: '',
      Created_By: this.employeeCode,
      Dispatch_Products: []
    };
    
    // products
    const products: any[] = [];
    this.pickingProducts.forEach((obj: any, i: number) => {
      const product = {
        Dispatch_Master_Product_Id: '',
        Dispatch_Number: '',
        Line_Item_No: '',
        Rack_Code: '',
        Shelf_Code: '',
        Bin_Code: '',
        Material_Code: '',
        Part_Number: '',
        Barcode: '',
        HSN_Code: '',
        Material_Name: '',
        Material_Group: '',
        Material_Type: '',
        Material_Brand: '',
        Material_Model: '',
        Material_UOM: '',
        Base_Price: '',
        Discount_Amount: '',
        Discount_Percentage: '',
        Unit_Price: '',
        Unit_Tax_Percentage: '',
        Unit_Tax_Amount: '',
        Sell_Price: '',
        Quantity: '',
        SGST_Percentage: '',
        SGST_Amount: '',
        CGST_Percentage: '',
        CGST_Amount: '',
        IGST_Percentage: '',
        IGST_Amount: '',
        Total_Price: '',
        Total_Taxable_Amount: '',
        Total_Tax_Amount: ''
      }
      products.push(product);
    });
    dispatchObject.Dispatch_Products = products || [];

    this.subscription.add(
      this.dispatchApi.saveDispatch(dispatchObject).subscribe({
        next: response => {
          if (response) {
            this.alert.showMixinAlert('Order Dispatched successfully !!!', null, '/dispatch');
          }
        },
        error: error => { this.log.error(error, 'dispatch-order-detail', 'saveDispatch'); },
        complete: () => { }
      })
    );
  }

  navigateBack() {
    this.route.navigateByUrl('/dispatch/order');
  }


  ngOnDestroy(): void {
    // clear
    localStorage.removeItem('pick-list-number');
    localStorage.removeItem('pick-list-warehouse');

    this.subscription?.unsubscribe();
  }
}
