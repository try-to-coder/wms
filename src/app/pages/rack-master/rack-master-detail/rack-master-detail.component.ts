import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { LogService } from 'src/app/services/log.service';
import { WarehouseService } from 'src/app/services/master/warehouse.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-rack-master-detail',
  templateUrl: './rack-master-detail.component.html',
  styleUrls: ['./rack-master-detail.component.scss']
})
export class RackMasterDetailComponent implements OnInit, OnDestroy {

  @Output() toggleEvent = new EventEmitter();

  subscription: Subscription = new Subscription();

  rackMaster: any = {};
  isRackActive = true;
  shelveMasterList: any[] = [];

  // 
  shelveMaster: any = {};
  isShelfActive = true;
  binList: any[] = [{ isActive: true }];

  isShelfInvalid = false;

  private _logData: any;
  get logData(): any {
    return this._logData;
  }
  @Input() set logData(value: any) {
    this._logData = value;
    this.onLogDataChange(value);
  }

  wareHouseCode = '';
  rackMasterCode = '';
  isDetailFlow = false;

  constructor(
    private log: LogService,
    private wareHouse: WarehouseService,
    private utility: UtilityService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  onLogDataChange(value: any) {
    this.log.log('log data : ', value);
    const data = value || {};
    if (data.rack) {
      this.isDetailFlow = true;
      this.getRackMasterDetail();
    }
    else {
      this.isDetailFlow = false;
    }
  }

  addBinRow(index: number) {
    this.binList.push({ isActive: true });
  }

  deleteBinRow(index: number) {
    if (this.binList?.length > 1) {
      this.binList.splice(index, 1)
    }
  }

  addShelfMaster() {

    this.isShelfInvalid = false;

    // 
    if (!this.shelveMaster.Shelf_Code || !this.shelveMaster.Shelf_Name) {
      // this.alert.toastMandatoryAlert();
      this.isShelfInvalid = true;
      return;
    }

    // 
    const validBinList: any = [];
    this.binList.forEach(bin => {
      if (bin.Bin_Code && bin.Bin_Name) {
        bin.Is_Active = bin.isActive ? '1' : '0'
        validBinList.push(bin);
      }
    });

    if (!validBinList?.length) {
      this.alert.toastAlert('warning', 'Add minimum one bin');
      return;
    }

    // check is duplicate
    if (!this.shelveMaster.isUpdate) {

      const shelveExist = this.shelveMasterList.find(obj => obj.Shelf_Code === this.shelveMaster.Shelf_Code);

      if (shelveExist) {
        this.alert.toastAlert('warning', 'Shelf already exits');
        return;
      }

      // shelve code duplicated

    }

    // validation completed

    const shelveObject: any = {
      Shelf_Code: this.shelveMaster.Shelf_Code || '',
      Shelf_Name: this.shelveMaster.Shelf_Name || '',
      Sort_Order: this.shelveMaster.Sort_Order || '',
      isActive: this.isShelfActive,
      Is_Active: this.isShelfActive ? '1' : '0',
      Bins: validBinList
    }

    this.shelveMasterList.push(shelveObject);

    // reset form
    this.resetShelf();
  }

  editShelfMaster(shelf: any) {
    this.shelveMaster = shelf || {};
  }

  deleteShelfMaster(shelf: any, i: number) {
    this.log.log('selected shelf : ', shelf, i);
    this.shelveMasterList?.splice(i, 1);
  }

  resetShelf() {
    this.shelveMaster = {};
    this.isShelfActive = false;
    this.binList = [{ isActive: true }];
    this.isShelfInvalid = false;
  }

  getRackMasterDetail() {
    this.subscription.add(
      this.wareHouse.getRackMaster(this.logData.warehouse, this.logData.rack).subscribe({
        next: response => {
          this.log.log('rack master detail response : ', response);
        },
        error: error => { this.log.error(error, 'rack-master-detail', 'getRackMasterDetail') }
      })
    );
  }
  
  saveOrUpdateRackMaster() {
    const rackObject = this.utility.clone(this.rackMaster);
    this.rackMaster.Warehouse_Code = this.logData.warehouse;
    rackObject.Is_Active = this.isRackActive ? '1' : '0';
    
    const shelves = this.utility.clone(this.shelveMasterList);
    rackObject.Shelfs = shelves;
    
    rackObject.Warehouse_Code = this.logData.warehouse;
    this.log.log('rack master save : ', rackObject);
    // return;

    this.subscription.add(
      this.wareHouse.addRackMaster(rackObject).subscribe({
        next: response => {
          this.log.log('save rack master : ', response);
          if (response) {
            this.alert.showMixinAlert('Rack Master created successfully');
            //
            this.close(true);
          }
        },
        error: error => { this.log.error(error, 'rack-master-detail', 'saveOrUpdateRackMaster'); },
        complete: () => { }
      })
    );

  }

  close(isRefresh = false) {
    this.toggleEvent.emit(isRefresh);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
