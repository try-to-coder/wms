import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { IMaterial } from 'src/app/interfaces/material';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { MaterialService } from 'src/app/services/master/material.service';

@Component({
  selector: 'app-material-master',
  templateUrl: './material-master.component.html',
  styleUrls: ['./material-master.component.scss']
})
export class MaterialMasterComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject()

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  materialMaster: IMaterial = {} as IMaterial;
  materialList: any[] = [];
  isTableDataRetrieved = false;

  subscription: Subscription = new Subscription();

  selectedMaterialID = '';

  constructor(private route: Router,
    private material: MaterialService,
    private log: LogService,
    private dataTable: DataTableService) {
    this.onPreInit();
  }

  onPreInit() { }

  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.getBasicUtility();
      this.onPageReady();
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {
    this.getMaterialList();
  }

  getMaterialList(isReRender = false) {
    this.subscription.add(
      this.material.getMaterialList().subscribe({
        next: response => {
          this.log.log('material list response :', response);
          const list = response || []
          this.setMaterialList(list, isReRender);
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        },
        error: error => {
          this.log.error(error, 'material-master', 'getMaterialList');
          const timeOutID = setTimeout(() => { this.isTableDataRetrieved = true; clearTimeout(timeOutID); }, Master.tableLoaderDuration);
        }
      })
    )
  }

  setMaterialList(materials: any[], isReRender = false) {
    this.materialList = materials || [];
    if (this.materialList.length) {
      if (!isReRender) {
        this.dtTrigger.next();
        if (!(jQuery('table').parents('.dataTables_scroll').length)) {
          setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
        }
      } else {
        this.reRender();
      }
    }
  }

  reRender(): void {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to re render again
        this.dtTrigger.next();
        setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
      });
    } else {
      this.dtTrigger.next();
      if (!(jQuery('table').parents('.dataTables_scroll').length)) {
        setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
      }
    }
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }

  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }

  onEditMaterial(material: any) {
    this.log.log('selected material : ', material);
    const selectedMaterial = material || {};
    if (!selectedMaterial.Material_Master_Id) {
      this.log.log('material ID is empty!');
      return;
    }

    this.selectedMaterialID = selectedMaterial.Material_Master_Id;

    this.openMaterialModal();
  }

  onAddMaterial() {
    this.selectedMaterialID = '';
    this.openMaterialModal();
  }

  openMaterialModal() {
    document.getElementById('material-master-open-modal')?.click();
  }

  closeMaterialModal(isRefresh = false) {
    document.getElementById('material-master-close-modal')?.click();
    this.selectedMaterialID = '';

    if (isRefresh) {
      this.isTableDataRetrieved = false;
      this.getMaterialList(true);
    }
  }

  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions();
  }

  navigateBack() {
    this.route.navigateByUrl('/home');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    this.subscription.unsubscribe();
  }
}





