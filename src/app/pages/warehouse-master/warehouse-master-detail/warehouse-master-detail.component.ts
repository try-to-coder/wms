import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IWarehouse } from 'src/app/interfaces/warehouse';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-warehouse-master-detail',
  templateUrl: './warehouse-master-detail.component.html',
  styleUrls: ['./warehouse-master-detail.component.scss']
})
export class WarehouseMasterDetailComponent implements OnInit, OnDestroy {

  @Output() toggleEvent = new EventEmitter<boolean>();

  private _warehouseID: string = '';
  get warehouseID(): string {
    return this._warehouseID;
  }
  @Input() set warehouseID(value: string) {
    this._warehouseID = value
    this.onWarehouseIDChange()
  }

  imageSrc: any;
  imageBase64 = '';
  imageUpload = false;
  isWarehouseImageAvailable = false;

  warehouseMaster: IWarehouse = {} as IWarehouse;

  subscription: Subscription = new Subscription();

  validation = {
    isInvalid: false,
    isLoader: false
  }

  constructor(private warehouseApi: WarehouseService,
    private log: LogService,
    private alert: AlertService,
    private sanitizer: DomSanitizer,
    private credential: CredentialService,
    private validationService: ValidationService) { }

  ngOnInit() {
    this.onPageReady();
  }

  onPageReady() { }

  onWarehouseIDChange() {
    this.log.log('warehouse id change: ', this.warehouseID);
    if (this.warehouseID) {
      this.getWarehouseDetail();
    }
    else {
      this.warehouseMaster = {} as IWarehouse;
      this.removeWarehouseLogo();
    }
  }

  getWarehouseDetail() {
    this.subscription.add(
      this.warehouseApi.getWarehouse(this.warehouseID).subscribe({
        next: response => {
          this.log.log('material id', response);
          if (response) {
            this.warehouseMaster = response || {};
            this.setWarehouseDetail();
          }
        },
        error: error => { this.log.error(error, 'warehouse-master-detail', 'getWarehouseDetail') }
      })
    );
  }

  setWarehouseDetail() {
    // for set employee image
    if (this.warehouseMaster.Warehouse_Image) {
      this.isWarehouseImageAvailable = true;
      const imageSource = 'data:image/jpeg;base64,' + this.warehouseMaster.Warehouse_Image;
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(imageSource);
    } else {
      this.isWarehouseImageAvailable = false;
      this.log.log('warehouse image not available, setting default image');
      this.imageSrc = null;
    }
  }

  /* On Change Logo image*/
  onLogoChange(event: any): void {
    const fileSize = 1024000; // 1MB

    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type && event.target.files[0].type.split('/')[0] === 'image') {
        if (event.target.files[0].size <= fileSize) {
          this.imageBase64 = '';

          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = (events: any) => {
            this.log.log('events : ', events);
            const imageSource = events.target.result;
            this.imageSrc = events.target.result;
            const imageArray = this.imageSrc.split(',');
            this.imageBase64 = (imageArray.length > 1) ? imageArray[1] : '';
            this.isWarehouseImageAvailable = true;
          };
          reader.readAsDataURL(event.target.files[0]);
          event.target.value = "";
        } else {
          event.target.value = "";
          this.alert.toastAlert('error', 'Max image upload size is 1MB only');
        }
      } else {
        event.target.value = "";
        this.alert.toastAlert('error', 'Could not support selected image format. Choose valid image file ');
      }
    }
  }

  removeWarehouseLogo(): void {
    this.isWarehouseImageAvailable = false;
    this.imageBase64 = '';
    // this.imageSrc = Master.defaultOrganizationImage;
    this.warehouseMaster.Warehouse_Image = "";
  }

  numberValidation(e: any, packing: any, num: number) {
    if (e.keyCode == 13) { return; }
    return this.validationService.customValidation(e, packing, num, "^[0-9]+$")
  }

  saveOrUpdateWarehouse() {
    //
    this.validation.isInvalid = false;
    this.validation.isLoader = true;
   
  //  For Image
    if(this.imageBase64){
    
    this.warehouseMaster.Warehouse_Image = this.imageBase64;
    }
    //
    if (!this.warehouseMaster.Warehouse_Code || !this.warehouseMaster.Warehouse_Name) {
      this.validation.isInvalid = true;
      this.validation.isLoader = false;
      this.alert.toastAlert('warning', 'Enter mandatory fields');
      return;
    }

    const warehouse = this.warehouseID ? this.warehouseApi.updateWarehouse(this.warehouseID, this.warehouseMaster) : this.warehouseApi.addWarehouse(this.warehouseMaster);

    this.subscription.add(
      warehouse.subscribe({
        next: response => {
          if (response) {
            const message = this.warehouseID ? 'Warehouse updated successfully !!!' : 'Warehouse saved successfully !!!';
            this.alert.showMixinAlert(message);

            this.close(true);
          }
        },
        error: error => { this.log.error(error, 'warehouse-master-detail', 'saveOrUpdateWarehouse'); },
        complete: () => { }
      })
    );
  }
  
  close(isRefresh = false) {
    this.toggleEvent.emit(isRefresh);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
