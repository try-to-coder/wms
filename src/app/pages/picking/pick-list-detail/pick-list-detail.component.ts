import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, Subscription, tap } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { EmployeeService } from 'src/app/services/master/employee.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { PickListService } from 'src/app/services/transaction/pick-list.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-pick-list-detail',
  templateUrl: './pick-list-detail.component.html',
  styleUrls: ['./pick-list-detail.component.scss']
})
export class PickListDetailComponent implements OnInit, OnDestroy {

  pickListNumber = '';
  warehouseCode = '';
  pickListDetail: any = {};

  // 
  pickingProducts: any[] = [];
  pickedProducts: any[] = [];

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
      this.warehouseCode = localStorage.getItem('pick-list-warehouse') || '';
      if (this.pickListNumber) {
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
    let rackMaster = of(null);

    pickListDetail = this.pickListApi.getPickListDetail(this.pickListNumber).pipe(tap(response => {
      this.log.log('Pick list order response : ', response);
      this.pickListDetail = response || {};
      this.filterAvailableProducts();
    }));

    rackMaster = this.warehouseApi.getRackMappingDropdown(this.warehouseCode || '').pipe(tap(response => {
      this.log.log('rack master response : ', response);
      this.rackMappingList = response || [];
    }))

    return forkJoin({ order: pickListDetail, rackMaster: rackMaster });
  }

  // getOrderDetail() {
  //   this.subscription.add(
  //     this.pickListApi.getPickListDetail(this.pickListNumber).subscribe({
  //       next: response => {
  //         this.log.log('GRN Response : ', response);
  //         this.pickListDetail = response || {};
  //       },
  //       error: error => {
  //         this.log.error(error, 'pick-list-detail', 'getOrderDetail');
  //       },
  //       complete: () => { }
  //     })
  //   );
  // }

  isAllChange(isChecked = false) {
    const products = this.pickListDetail.Picklist_Products || [];
    products?.forEach((product: any) => {
      product.isSelected = isChecked;
    });
  }

  getUtilityDetail() {
    // this.employeeCode = this.credential.getLoginCredentials('Employee_Code');
  }

  filterAvailableProducts() {
    // filter only available products
    const products = this.pickListDetail.Picklist_Products || [];

    // empty
    this.pickingProducts = [];
    this.pickedProducts = [];

    products.forEach((product: any) => {
      // 
      const quantity = parseFloat(product.Quantity || '0.00');
      const pickingQuantity = parseFloat(product.Picking_Quantity || '0.00');
      const availableQuantity = quantity - pickingQuantity;

      product.Available_Quantity = availableQuantity;
      if (availableQuantity > 0) {
        this.pickingProducts.push(product);
      }
      else {
        this.pickedProducts.push(product);
      }
    });
  }

  //#region  Pick list modal

  startPicking() {

    const selectedProducts: any[] = [], selectedBarCodes: any[] = [];
    this.pickingProducts.forEach(product => {
      if (product.isSelected) {
        selectedProducts.push(product);

        // // add barcode
        // const currentProductBarCodes = this.stockReceiveBarCodes.filter(obj => (obj.Stock_Receive_Product_Id === product.Stock_Receive_Product_Id) && !obj.Putaway_Number);
        // selectedBarCodes.push(...currentProductBarCodes);
      }
    });

    if (!selectedProducts?.length) {
      this.alert.toastAlert('warning', 'Select minimum one product to start picking');
      return;
    }

    // open new start put away modal
    this.pickingModal = {
      pickingDetail: this.pickListDetail,
      products: selectedProducts,
      barCodes: [],
      rackMasters: this.rackMappingList
    }

    this.openPickListModal();
  }

  openPickListModal() {
    document.getElementById('pick-list-master-open-modal')?.click();
  }

  closePickListModal() {
    document.getElementById('pick-list-master-close-modal')?.click();
  }

  //#endregion


  ngOnDestroy(): void {
    // clear
    localStorage.removeItem('pick-list-number');
    localStorage.removeItem('pick-list-warehouse');

    this.subscription?.unsubscribe();
  }
}
