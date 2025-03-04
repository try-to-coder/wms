import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { IOrganization } from 'src/app/interfaces/organization';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { OrganizationService } from 'src/app/services/master/organization.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  organizationCode = '';
  orgMasterId: any

  imageSrc: any;
  imageUpload = false;
  organizationMaster: IOrganization = {} as IOrganization;
  result = '';

  isOrgImageAvailable = false;
  imageBase64 = '';

  validation = {
    isInvalid: false,
    isLoader: false
  }
  subscription: Subscription = new Subscription();

  constructor(private route: Router,
    private log: LogService,
    private sanitizer: DomSanitizer,
    private credential: CredentialService,
    private alert: AlertService,
    private organizationApi: OrganizationService,
    private validationService: ValidationService
    ) {
    this.onPreInit();
  }

  onPreInit() { }

  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const isPageAccess = this.isRightsExisting();
    if (isPageAccess) {
      this.onPageReady()
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {
    this.organizationCode = this.credential.getCredentialsData('Organization_Master_Id')
    this.getOrganizationDetail();
  }

  getOrganizationDetail() {
    this.subscription.add(
      this.organizationApi.getOrganization(this.organizationCode).subscribe({
        next: response => {
          this.log.log("organization update response : ", response);
          if (response) {
            this.organizationMaster = response || {};
            this.setOrganizationDetail();
          }
        },
        error: error => { this.log.error(error, 'organization', 'getOrganizationDetail'); },
        complete: () => { }
      })
    );
  }

  setOrganizationDetail() {
    // set detail
    const Fiscal_Year_Start = this.organizationMaster.Fiscal_Year_Start.split('-').reverse().join('-');
    const Fiscal_Year_End = this.organizationMaster.Fiscal_Year_End.split('-').reverse().join('-')
    const Inventory_Start_Date = this.organizationMaster.Inventory_Start_Date.split('-').reverse().join('-')
    this.organizationMaster.Inventory_Start_Date = Inventory_Start_Date;
    this.organizationMaster.Fiscal_Year_Start = Fiscal_Year_Start;
    this.organizationMaster.Fiscal_Year_End = Fiscal_Year_End;

    // set image
    // for set organization image
    if (this.organizationMaster.Organization_Image) {
      this.isOrgImageAvailable = true;
      const imageSource = 'data:image/jpeg;base64,' + this.organizationMaster.Organization_Image;
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(imageSource);
    } else {
      this.isOrgImageAvailable = false;
      this.log.log('emp image not available, setting default image');
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
            this.isOrgImageAvailable = true;
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

  removeOrganizationLogo(): void {
    this.isOrgImageAvailable = false;
    this.imageBase64 = '';
    // this.imageSrc = Master.defaultOrganizationImage;
    this.organizationMaster.Organization_Image = '';
  }

  navigateBack() {
    this.route.navigateByUrl('/home');
  }

  numberValidation(e: any, packing: any, num: number) {
    if (e.keyCode == 13) { return; }
    return this.validationService.customValidation(e, packing, num, "^[0-9]+$")
  }

  updateOrganization() {

    this.validation.isInvalid = false;
    this.validation.isLoader = true;

    // validate
    if (!this.organizationMaster.Industry_Type || !this.organizationMaster.Organization_Name ||
      !this.organizationMaster.Fiscal_Year_Start || !this.organizationMaster.Fiscal_Year_End ||
      !this.organizationMaster.Time_Zone) {
      this.alert.toast('Enter mandatory fields !!!');
      this.validation.isLoader = false;
      this.validation.isInvalid = true;
      return;
    }

    if (this.imageBase64) {
      this.organizationMaster.Organization_Image = this.imageBase64;
    }

    this.subscription.add(
      this.organizationApi.updateOrganization(this.organizationCode, this.organizationMaster).subscribe({
        next: response => {
          this.log.log('update response : ', response);
          if (response) {
            this.alert.showMixinAlert('Organization updated successfully !!!');
            this.organizationMaster = response || {};
            this.setOrganizationDetail();

            // 
            const timeOutID = setTimeout(() => { this.validation.isLoader = false; clearTimeout(timeOutID); }, 1000);
          }
        },
        error: error => {
          this.log.error(error, 'organization', 'updateOrganization');
          const timeOutID = setTimeout(() => { this.validation.isLoader = false; clearTimeout(timeOutID); }, 1000);
        }
      })
    );
  }

}
