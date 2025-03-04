import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/employee';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { EmployeeService } from 'src/app/services/master/employee.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  @Output() toggleEvent = new EventEmitter<boolean>();

  imageUpload = false;
  isEmpImageAvailable = false;
  imageBase64 = '';

  employee_Id = '';
  generatedEmployeeCode = '';

  employeeMaster: IEmployee = {} as IEmployee;
  softwareRightsList: any[] = [];
  rightsGroupDropdown: any[] = [];

  imageSrc: any;

  employeeCode: any = this.employee_Id;

  subscription: Subscription = new Subscription();

  defaultImageSource = '';

  private _employeeID: string = '';
  get employeeID(): string {
    return this._employeeID;
  }
  @Input() set employeeID(value: string) {
    this._employeeID = value;
    this.onEmployeeIdChange();
  }

  validation = {
    isInvalid: false,
    isLoader: false
  }

  constructor(
    private employee: EmployeeService,
    private log: LogService,
    private sanitizer: DomSanitizer,
    private credential: CredentialService,
    private utility: UtilityService,
    private alert: AlertService,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.onPageReady();
    this.getPageUtility();
  }

  onPageReady() {
    this.employeeCode = this.credential.getCredentialsData('Employee_Master_Id');
    this.getSoftwareRightsList();
  }

  getPageUtility(): void {
    this.generateEmployeeCode();
  }

  generateEmployeeCode(): void {
    this.subscription.add(
      this.employee.generateEmployeeCode().subscribe({
        next: (response: any) => {
          this.generatedEmployeeCode = response.Employee_Master_Id || '';
          this.log.log(response);
        }, error: (error: any) => {
          this.log.log(error);
        }
      })
    )
  }

  onEmployeeIdChange() {
    this.log.log('employee id change');
    if (this.employeeID) {
      this.getEmployeeDetail();
    }
    else {
      this.employeeMaster = {} as IEmployee;
      this.removeEmployeeLogo();
    }
  }

  getEmployeeDetail() {
    this.subscription.add(
      this.employee.getEmployee(this.employeeID).subscribe({
        next: response => {
          this.log.log('employee read : ', response);
          this.employeeMaster = response || {};
          this.setEmployeeDetail();
        },
        error: error => { this.log.error(error, 'employee-detail', 'getEmployeeDetail'); },
        complete: () => { }
      })
    );
  }

  setEmployeeDetail() {
    // for set employee image
    if (this.employeeMaster.Employee_Image) {
      this.isEmpImageAvailable = true;
      const imageSource = 'data:image/jpeg;base64,' + this.employeeMaster.Employee_Image;
      // this.sanitizer.bypassSecurityTrustUrl(imageSource);
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(imageSource);
      // this.imageSrc = this.organizationDetailObject.Organization_Image;
    } else {
      this.isEmpImageAvailable = false;
      this.log.log('emp image not available, setting default image');
      this.imageSrc = this.defaultImageSource;
    }

    const Date_Of_Birth = this.employeeMaster.Date_Of_Birth.split('-').reverse().join('-');
    const Date_Of_Join = this.employeeMaster.Date_Of_Join.split('-').reverse().join('-')
    this.employeeMaster.Date_Of_Birth = Date_Of_Birth;
    this.employeeMaster.Date_Of_Join = Date_Of_Join;
  }

  saveOrUpdateEmployee() {
    this.validation.isInvalid = false;

    this.employeeMaster.Employee_Code = this.generatedEmployeeCode || '';
    if (!this.employeeMaster.Employee_Code || !this.employeeMaster.First_Name ||
      !this.employeeMaster.Last_Name) {
      this.validation.isInvalid = true;
      this.alert.toastAlert('warning', 'Enter mandatory fields');
      return;
    }

    if (this.employeeMaster.Email) {
      this.validation.isInvalid = !this.utility.isValidEmail(this.employeeMaster.Email);
      if (this.validation.isInvalid) {
        this.alert.toastAlert('warning', 'Invalid Email');
        return;
      }
    }

    // validation completed
    this.validation.isLoader = true;

    if (this.imageBase64) {
      this.employeeMaster.Employee_Image = this.imageBase64;
    }

    const employee = this.employeeID ?
      this.employee.updateEmployee(this.employeeID, this.employeeMaster) : this.employee.saveEmployee(this.employeeMaster);

    this.subscription.add(employee.subscribe({
      next: response => {
        this.log.log('employee response :', response);
        if (response) {
          const message = this.employeeID ? 'Employee updated successfully !!!' : 'Employee saved successfully !!!';
          this.alert.showMixinAlert(message);
          this.close(true);
        }
        const timeOutID = setTimeout(() => { this.validation.isLoader = false; clearTimeout(timeOutID); }, 1000);
      },
      error: error => {
        this.log.error(error, 'employee-detail', 'saveOrUpdateEmployee');
        const timeOutID = setTimeout(() => { this.validation.isLoader = false; clearTimeout(timeOutID); }, 1000);
      }
    }))
  }

  getSoftwareRightsList() {
    this.subscription.add(
      this.employee.getSoftwareRightsList().subscribe({
        next: response => {
          this.log.log('software rights list', response);
          const list = response || [];
          this.softwareRightsList = list;
          this.rightsGroupDropdown = this.utility.getSelectOptions(list, 'Software_Rights_Group', 'Software_Rights_Group');
        },
        error: error => { this.log.error(error, 'employee-detail', 'getSoftwareRightsList', true); },
        complete: () => { }
      })
    )
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
            this.isEmpImageAvailable = true;
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

  removeEmployeeLogo(): void {
    this.isEmpImageAvailable = false;
    this.imageBase64 = '';
    this.employeeMaster.Employee_Image = '';
  }

  numberValidation(e: any, packing: any, num: number) {
    if (e.keyCode == 13) { return; }
    return this.validationService.customValidation(e, packing, num, "^[0-9]+$")
  }

  close(isRefresh = false) {
    this.toggleEvent.emit(isRefresh);
    this.employeeMaster = {} as IEmployee;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
