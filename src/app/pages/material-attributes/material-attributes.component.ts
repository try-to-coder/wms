import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { MaterialAttributesService } from 'src/app/services/master/material-attributes.service';
import { MaterialService } from 'src/app/services/master/material.service';

@Component({
  selector: 'app-material-attributes',
  templateUrl: './material-attributes.component.html',
  styleUrls: ['./material-attributes.component.scss']
})
export class MaterialAttributesComponent implements OnInit, OnDestroy {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  isTableDataRetrieved = false;
  materialAttributeMaster: any = {};
  materialTypeMaster: any = {};
  materialGroupMaster: any = {};
  materialBrandMaster: any = {};
  materialModelMaster: any = {};
  materialUomMaster: any = {};

  materialMaster: any = {};

  materialGroupList: any = [];
  materialTypeList: any = [];
  materialBrandList: any[] = [];
  materialModelList: any = [];
  materialUomList: any = [];
  tableList: any[] = [];

  martialColName = "Brand";
  materialAttributeName: any = "";
  materialAttributeId = "";
  materialAttributesAction = "Save";
  isActive = false;
  addProduct = '';
  isDelete = false;

  subscription: Subscription = new Subscription();
  constructor(
    private material: MaterialService,
    private log: LogService,
    private route: Router,
    private materialAttributes: MaterialAttributesService,
    private dataTable: DataTableService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.dtOptions = this.dataTable.getDataTableOptions(false, false);
    this.getMaterialBrandList();
  }

  openModal() {
    this.materialAttributeName = null
    this.materialAttributesAction = "Save";
    this.materialAttributeMaster = {};
    this.isActive = true;
    this.isDelete = false;
    document.getElementById('material-attributes-open-modal')?.click();
  }

  closeModal(): void {
    // document.getElementById('stock-adjustment-reason-master-close-modal')?.click();
  }


  onEdit(response: any) {
    this.isDelete = false;
    switch (this.martialColName) {
      case this.martialColName = "Type":
        this.materialAttributeName = response.Material_Type;
        break;
      case this.martialColName = "Brand":
        this.materialAttributeName = response.Material_Brand;;
        break;
      case this.martialColName = "UOM":
        this.materialAttributeName = response.Material_UOM;
        break;
      case this.martialColName = 'Group':
        this.materialAttributeName = response.Material_Group;
        break;
      case this.martialColName = 'Model':
        this.materialAttributeName = response.Material_Model;
        break;
      default:
        this.materialAttributeName = response.Material_Type;
        break;
    }
    this.materialAttributesAction = "Update";
    this.isActive = response.Active_Status === 'Active';
    document.getElementById('material-attributes-open-modal')?.click();
    this.materialAttributeMaster = response;
  }


  saveMaterialAttributeMaster() {
    const payLoad = this.getAttributeData();
    this.subscription.add(
      payLoad.subscribe({
        next: response => {
          if (response)
            this.alertService.showMixinAlert(response.Message);
          this.getSelectTabData(this.martialColName);
        },
        error: error => {
          this.log.error(error, 'material-attributes', 'saveMaterialAttributeMaster');
        }
      })
    );
  }

  getAttributeData(): Observable<any> {
    if (!this.isDelete) {
      this.materialAttributeMaster.Is_Active = this.isActive ? '1' : '0';
    }
    switch (this.martialColName) {
      case this.martialColName = "Type":
        if (!this.isDelete) {
          this.materialAttributeMaster.Material_Type = this.materialAttributeName;
        }
        return this.materialAttributes.postMaterialType(this.materialAttributeMaster);
      case this.martialColName = "Brand":
        if (!this.isDelete) {
          this.materialAttributeMaster.Material_Brand = this.materialAttributeName;
        }
        return this.materialAttributes.postMaterialBrand(this.materialAttributeMaster);
      case this.martialColName = "UOM":
        if (!this.isDelete) {
          this.materialAttributeMaster.Material_UOM = this.materialAttributeName;
        }
        return this.materialAttributes.postMaterialUom(this.materialAttributeMaster);
      case this.martialColName = 'Group':
        if (!this.isDelete) {
          this.materialAttributeMaster.Material_Group = this.materialAttributeName;
        }
        return this.materialAttributes.postMaterialGroup(this.materialAttributeMaster);
      case this.martialColName = 'Model':
        if (!this.isDelete) {
          this.materialAttributeMaster.Material_Model = this.materialAttributeName;
        }
        return this.materialAttributes.postMaterialModel(this.materialAttributeMaster);
      default:
        if (!this.isDelete) {
          this.materialAttributeMaster.Material_Type = this.materialAttributeName;
        }
        return this.materialAttributes.postMaterialType(this.materialAttributeMaster);
    }
  }

  navigateBack() {
    this.route.navigateByUrl('/material-master');
  }

  getSelectTabData(tabName: any) {
    this.isTableDataRetrieved = false;
    switch (tabName) {
      case tabName = "Type":
        this.getMaterialTypeList(true);
        // this.tableList = this.materialTypeList;
        this.addProduct = 'Add ' + tabName
        break;
      case tabName = "Brand":
        this.getMaterialBrandList(true)
        // this.tableList = this.materialBrandList;
        this.addProduct = 'Add ' + tabName
        break;
      case tabName = "UOM":
        this.getMaterialUomList(true)
        // this.tableList = this.materialUomList
        this.addProduct = 'Add ' + tabName
        break;
      case tabName = 'Group':
        this.getMaterialGroupList(true)
        // this.tableList = this.materialGroupList;
        this.addProduct = 'Add ' + tabName
        break;
      case tabName = 'Model':
        this.getMaterialModelList(true);
        // this.tableList = this.materialModelList;
        this.addProduct = 'Add ' + tabName
        break;
    }
    this.martialColName = tabName;
  }

  onDelete(response: any) {
    this.isDelete = true;
    this.materialAttributeMaster = {};
    switch (this.martialColName) {
      case "Type":
        this.materialAttributeMaster.code = response.Material_Type_Master_Id;
        break;
      case "Brand":
        this.materialAttributeMaster.code = response.Material_Brand_Master_Id;
        break;
      case "UOM":
        this.materialAttributeMaster.code = response.Material_UOM_Master_Id;
        break;
      case 'Group':
        this.materialAttributeMaster.code = response.Material_Group_Master_Id;
        break;
      case 'Model':
        this.materialAttributeMaster.code = response.Material_Model_Master_Id;
        break;
      default:
        this.materialAttributeMaster.code = response.Material_Brand_Master_Id;
        break;
    }
     this.deleteMaterialAttributes();
  }

  deleteMaterialAttributes() {
    let callMethod = this.materialAttributes.deleteAttributes(this.materialAttributeMaster.code, this.martialColName);
    this.subscription.add(
      callMethod.subscribe({
        next: response => {
          if (response)
            this.alertService.showMixinAlert(response.message || 'Delete Successfully');
          this.getSelectTabData(this.martialColName);
        },
        error: error => {
          this.log.error(error, 'material-attributes', 'Delete - MaterialAttributeMaster');
        }
      })
    );
  }

  getMaterialGroupList(isReRender = false) {
    this.subscription.add(
      this.material.getMaterialGroupList().subscribe({
        next: response => {
          this.log.log('material group List', response);
          const list = response || [];
          this.materialGroupList = response;
          this.setList(response, isReRender);
        },
        error: error => { const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration); }
      })
    )
  }

  getMaterialTypeList(isReRender = false) {
    this.subscription.add(
      this.material.getMaterialTypeList().subscribe({
        next: response => {
          this.log.log('material Type List', response);
          const list = response || [];
          this.materialTypeList = response
          this.setList(response, isReRender);
        },
        error: error => { const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration); }
      })
    )
  }

  getMaterialBrandList(isReRender = false) {
    this.subscription.add(
      this.material.getMaterialBrandList().subscribe({
        next: response => {
          this.log.log('material Brand List', response);
          const list = response || [];
          this.materialBrandList = response;
          //  this.tableList = this.materialBrandList
          this.setList(response, isReRender);
        },
        error: error => { const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration); }
      })
    )
    this.addProduct = 'Add Brand';
  }
  getMaterialModelList(isReRender = false) {
    this.subscription.add(
      this.material.getMaterialModelList().subscribe({
        next: response => {
          this.log.log('material Model List', response);
          const list = response || [];
          this.materialModelList = response;
          this.setList(response, isReRender);
        }
      })
    )
  }
  getMaterialUomList(isReRender = false) {
    this.subscription.add(
      this.material.getMaterialUomList().subscribe({
        next: response => {
          this.log.log('material Uom List', response);
          const list = response || [];
          this.materialUomList = response;
          this.setList(response, isReRender);
        },
        error: error => { const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration); }
      })
    )
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  reRender() {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to re render again
        this.dtTrigger.next();
        const timeOutID = setTimeout(() => {
          jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
        }, 100);
      });
    } else {
      this.dtTrigger.next();
      if (!(jQuery('table').parents('.dataTables_scroll').length)) {
        const timeOutID = setTimeout(() => {
          jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
        }, 100);
      }
    }
  }


  setList(list: any[] = [], isReRender = false): void {
    this.tableList = list;
    const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
    if (!isReRender) {
      this.dtTrigger.next();
      if (!(jQuery('table').parents('.dataTables_scroll').length)) {
        const timeOutID = setTimeout(() => {
          jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
        }, 100);
      }
    } else {
      this.reRender();
    }

    // if (this.tableList.length) {
    //   if (!isReRender) {
    //     this.dtTrigger.next();
    //     if (!(jQuery('table').parents('.dataTables_scroll').length)) {
    //       const timeOutID = setTimeout(() => {
    //         jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
    //       }, 100);
    //     }
    //   } else {
    //     this.reRender();
    //   }
    // }
    // else if (!isReRender) {
    //   this.dtTrigger.next();
    // }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
