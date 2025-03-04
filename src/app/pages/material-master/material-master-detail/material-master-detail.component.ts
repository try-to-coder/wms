import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { forkJoin, Observable, of, Subscription, tap } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { IMaterial } from 'src/app/interfaces/material';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { MaterialService } from 'src/app/services/master/material.service';

@Component({
  selector: 'app-material-master-detail',
  templateUrl: './material-master-detail.component.html',
  styleUrls: ['./material-master-detail.component.scss']
})
export class MaterialMasterDetailComponent implements OnInit, OnDestroy {
  @Output() toggleEvent = new EventEmitter<boolean>();

  imageSrc: any
  imageUpload = false;
  isMaterialImageAvailable = false;
  imageBase64 = '';

  materialMaster: IMaterial = {} as IMaterial
  materialGroupList: any = [];
  materialTypeList: any = [];
  materialBrandList: any = [];
  materialModelList: any = [];
  materialUomList: any = [];

  subscription: Subscription = new Subscription()

  validation = {
    isInvalid: false,
    isLoader: false
  }

  private _materialID: string = '';
  get materialID(): string {
    return this._materialID;
  }
  @Input() set materialID(value: string) {
    this._materialID = value;
    this.onMaterialIDChange();
  }


  constructor(private materialApi: MaterialService,
    private log: LogService,
    private route: Router,
    private alert: AlertService,
    private sanitizer: DomSanitizer,
    private credential: CredentialService) { this.onPreInit(); }

  onPreInit() {

  }

  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.onPageReady();
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }


  onPageReady() {

    this.subscription.add(
      this.onLoad().subscribe({
        next: response => { },
        error: error => { },
        complete: () => { }
      })
    );

    // this.getMaterialGroupList();
    // this.getMaterialTypeList();
    // this.getMaterialBrandList();
    // this.getMaterialModelList();
    // this.getMaterialUomList();
  }

  onLoad(): Observable<any> {
    let materialGroup = of(null);
    let materialType = of(null);
    let materialBrand = of(null);
    let materialModel = of(null);
    let materialUom = of(null);

    materialGroup = this.materialApi.getMaterialGroupList().pipe(tap({
      next: response => {
        this.log.log('material group response : ', response);
        this.materialGroupList = response || [];
      }
    }));

    materialType = this.materialApi.getMaterialTypeList().pipe(tap({
      next: response => {
        this.log.log('material type response : ', response);
        this.materialTypeList = response || [];
      }
    }));

    materialBrand = this.materialApi.getMaterialBrandList().pipe(tap({
      next: response => {
        this.log.log('material brand response : ', response);
        this.materialBrandList = response || [];
      }
    }));

    materialModel = this.materialApi.getMaterialModelList().pipe(tap({
      next: response => {
        this.log.log('material modal response : ', response);
        this.materialModelList = response || [];
      }
    }));

    materialUom = this.materialApi.getMaterialUomList().pipe(tap({
      next: response => {
        this.log.log('material UOM response : ', response);
        this.materialUomList = response || [];
      }
    }));
    return forkJoin({ group: materialGroup, type: materialType, branch: materialBrand, model: materialModel, uom: materialUom });
  }

  onMaterialIDChange() {
    this.log.log('materialID : ', this.materialID);
    if (this.materialID) {
      this.getMaterialDetail();
    }
    else {
      this.materialMaster = {} as IMaterial;
      this.removeMaterialImage();
    }
  }

  getMaterialDetail() {
    this.subscription.add(
      this.materialApi.getMaterial(this.materialID).subscribe({
        next: response => {
          this.log.log('material detail response : ', response);
          this.materialMaster = response || {};
          this.setMaterialMaster();
        },
        error: error => { this.log.error(error, 'material-master-detail', 'getMaterialDetail') }
      })
    );
  }

  setMaterialMaster() {
    // for set material image
    if (this.materialMaster.Material_Image) {
      this.isMaterialImageAvailable = true;
      const imageSource = 'data:image/jpeg;base64,' + this.materialMaster.Material_Image;
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(imageSource);
    } else {
      this.isMaterialImageAvailable = false;
      this.log.log('material image not available, setting default image');
      this.imageSrc = null;
    }
  }

  saveOrUpdateMaterial() {

    this.validation.isInvalid = false;
    this.validation.isLoader = true;

    if (!this.materialMaster.Material_Code || !this.materialMaster.Material_Name ||
      !this.materialMaster.Part_Number || !this.materialMaster.Barcode) {
      this.log.log('mandatory fields are missing');
      this.validation.isInvalid = true;
      this.validation.isLoader = false;
      return;
    }

    if (this.imageBase64) {
      this.materialMaster.Material_Image = this.imageBase64;
    }

    const material = this.materialID ? this.materialApi.updateMaterial(this.materialID, this.materialMaster) :
      this.materialApi.saveMaterial(this.materialMaster);

    this.subscription.add(material.subscribe({
      next: response => {
        this.log.log('material master save or update response :', response);
        if (response) {
          const message = this.materialID ? 'Material master updated successfully !!!' : 'Material master saved successfully !!!';
          this.alert.showMixinAlert(message);

          // for refresh list
          this.close(true);
        }
        const timeOutID = setTimeout(() => { this.validation.isLoader = false; clearTimeout(timeOutID); }, 1000);
      },
      error: error => {
        this.log.error(error, 'material-master-detail', 'saveOrUpdateMaterial');
        const timeOutID = setTimeout(() => { this.validation.isLoader = false; clearTimeout(timeOutID); }, 1000);
      }
    }))
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
            this.isMaterialImageAvailable = true;
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

  removeMaterialImage(): void {
    this.isMaterialImageAvailable = false;
    this.imageBase64 = '';
    // this.imageSrc = Master.defaultOrganizationImage;
    this.materialMaster.Material_Image = "";
  }

  close(isRefresh = false) {
    this.toggleEvent.emit(isRefresh);
    this.validation.isInvalid = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
