import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, Subscription, tap } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { EmployeeService } from 'src/app/services/master/employee.service';
import { PickListService } from 'src/app/services/transaction/pick-list.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-pick-order-detail',
  templateUrl: './pick-order-detail.component.html',
  styleUrls: ['./pick-order-detail.component.scss']
})
export class PickOrderDetailComponent implements OnInit, OnDestroy {



  pickListOrderNumber = '';
  pickListOrderDetail: any = {};

  selectedEmployee = '';
  employeeDropdown: any[] = [];

  subscription: Subscription = new Subscription();

  isAllProduct = false;

  isValidate = false;

  constructor(private route: Router,
    private log: LogService,
    private credential: CredentialService,
    private utility: UtilityService,
    private alert: AlertService,
    private employeeApi: EmployeeService,
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
      this.pickListOrderNumber = localStorage.getItem('pick-sale-order-number') || '';
      if (this.pickListOrderNumber) {
        this.onPageReady();
      }
      else {
        this.route.navigateByUrl('/picking');
      }
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {
    this.subscription.add(
      this.onLoad().subscribe({
        next: (response: any) => { this.log.log('pick list load response : ', response); },
        error: (error: any) => { this.log.error(error, 'pick-list', 'load - pick-list', true); },
        complete: () => { }
      })
    );
  }

  onLoad() {

    let pickListDetail = of(null);
    let employeeList = of(null);

    pickListDetail = this.pickListApi.getSaleOrderDetail(this.pickListOrderNumber).pipe(tap(response => {
      this.log.log('Pick list order response : ', response);
      this.pickListOrderDetail = response || {};
    }));

    employeeList = this.employeeApi.getEmployeeDropdown().pipe(tap(response => {
      this.log.log('warehouse response : ', response);
      const list = response || [];
      this.employeeDropdown = this.utility.getSelectOptions(list || [], 'Employee_Code', 'Employee_Name');
    }));

    return forkJoin({ order: pickListDetail, employees: employeeList });
  }

  // getOrderDetail() {
  //   this.subscription.add(
  //     this.pickListApi.getPickListDetail(this.pickListOrderNumber).subscribe({
  //       next: response => {
  //         this.log.log('GRN Response : ', response);
  //         this.pickListOrderDetail = response || {};
  //       },
  //       error: error => {
  //         this.log.error(error, 'pick-list-detail', 'getOrderDetail');
  //       },
  //       complete: () => { }
  //     })
  //   );
  // }

  isAllChange(isChecked = false) {
    const products = this.pickListOrderDetail.Picklist_Products || [];
    products?.forEach((product: any) => {
      product.isSelected = isChecked;
    });
  }

  onAssignEmployee() {

    this.isValidate = false;

    if (!this.selectedEmployee) {
      this.isValidate = true;
      return;
    }

    const employee = this.employeeDropdown.find(obj => obj.id === this.selectedEmployee);
    const employeeName = employee ? employee.text : '';

    const selectedProducts: any = [];
    const allProducts = this.pickListOrderDetail.Picklist_Product_Master || [];
    if (allProducts?.length) {
      allProducts.forEach((product: any) => {
        if (product.isSelected) {
          const currentProduct = {
            Warehouse_Code: this.pickListOrderDetail.Warehouse_Code,
            // Picklist_Number,
            // Line_Item_No,
            Rack_Code: '',
            Shelf_Code: '',
            Bin_Code: '',
            Material_Code: product.Material_Code,
            Part_Number: product.Part_Number,
            Barcode: product.Barcode,
            HSN_Code: product.HSN_Code,
            Material_Name: product.Material_Name,
            Material_Group: product.Material_Group,
            Material_Type: product.Material_Type,
            Material_Brand: product.Material_Brand,
            Material_Model: product.Material_Model,
            Material_UOM: product.Material_UOM,
            Base_Price: product.Base_Price,
            Discount_Amount: product.Discount_Amount,
            Discount_Percentage: product.Discount_Percentage,
            Unit_Price: product.Unit_Price,
            Unit_Tax_Percentage: product.Unit_Tax_Percentage,
            Unit_Tax_Amount: product.Unit_Tax_Amount,
            Sell_Price: product.Sell_Price,
            Quantity: product.Quantity,
            SGST_Percentage: product.SGST_Percentage,
            SGST_Amount: product.SGST_Amount,
            CGST_Percentage: product.CGST_Percentage,
            CGST_Amount: product.CGST_Amount,
            IGST_Percentage: product.IGST_Percentage,
            IGST_Amount: product.IGST_Amount,
            Total_Price: product.Total_Price,
            Total_Taxable_Amount: product.Total_Taxable_Amount,
            Total_Tax_Amount: product.Total_Tax_Amount,
            Created_By: this.selectedEmployee
          }
          selectedProducts.push(currentProduct);
        }
      });
    }

    if (!selectedProducts?.length) {
      this.alert.toastAlert('warning', 'Select minimum one product to receive');
      return;
    }

    // validation completed

    this.log.log('pickListOrderDetail : ', this.pickListOrderDetail);

    const sendObject = [{
      // Picklist_Number,
      // Picklist_Date,
      Sale_Order_Number: this.pickListOrderDetail.Sale_Order_Number,
      Sale_Order_Date: this.utility.getDBDateFormate(this.pickListOrderDetail.Sale_Order_Date),
      Customer_Code: this.pickListOrderDetail.Customer_Code,
      Customer_Name: this.pickListOrderDetail.Customer_Name,
      Warehouse_Code: this.pickListOrderDetail.Warehouse_Code,
      Warehouse_Name: this.pickListOrderDetail.Warehouse_Name,
      Delivery_Date: this.utility.getDBDateFormate(this.pickListOrderDetail.Delivery_Date),
      Assign_Employee_Code: this.selectedEmployee,
      Assign: employeeName,
      Terms_Condition: this.pickListOrderDetail.Terms_Condition,
      Remarks: this.pickListOrderDetail.Remarks,
      Sub_Total: this.pickListOrderDetail.Sub_Total,
      Rounding_Off: this.pickListOrderDetail.Rounding_Off,
      Grand_Total: this.pickListOrderDetail.Grand_Total,
      Created_By: this.selectedEmployee,
      Picklist_Products: selectedProducts || []
    }]

    this.subscription.add(
      this.pickListApi.assignPickList(sendObject).subscribe({
        next: response => {
          if (response) {
            this.alert.showMixinAlert('Pick List assigned successfully !!!', null, '/picking');
          }
        },
        error: error => { this.log.error(error, 'pick-list-detail', 'onAssignEmployee') },
        complete: () => { }
      })
    );
  }

  getUtilityDetail() {
    // this.employeeCode = this.credential.getLoginCredentials('Employee_Code');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
