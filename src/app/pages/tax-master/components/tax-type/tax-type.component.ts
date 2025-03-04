import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { TaxTypeService } from 'src/app/services/master/tax/tax-type.service';

@Component({
  selector: 'app-tax-type',
  templateUrl: './tax-type.component.html',
  styleUrls: ['./tax-type.component.scss']
})
export class TaxTypeComponent implements OnInit ,OnDestroy{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  subscription:Subscription= new Subscription();

  taxTypeList:any=[];
  taxTypeMaster:any={};

  constructor( private route :Router,private taxType:TaxTypeService,private log:LogService, private dataTable:DataTableService) { 
    this.onPreInit()
  }

  onPreInit(){

  }

  ngOnInit() {
    this.onPageReady();
  }

  onPageReady(){
    this.getTaxTypeList();

  }

  getTaxTypeList(){
    this.subscription.add(this.taxType.getTaxTypeList().subscribe({
     next: response =>{
       this.log.log('tax group list:',response);
       const list = response ||[]
       this.setTaxTypeList(list)
     }
   }))
 }

 setTaxTypeList(taxType: any[], isReRender = false): void {
   this.taxTypeList =  taxType || [];
   // // setTimeout(() => this.isTableDataRetrieved = true, Configuration.tableLoaderDuration);
   // if (this.employeeList.length) {
   //   if (!isReRender) {
   //     this.dtTrigger.next();
   //     if (!(jQuery('table').parents('.dataTables_scroll').length)) {
   //       setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
   //     }
   //   } else {
   //     this.reRender();
   //   }
   // }
   // else if (!type) {
   //   this.dtTrigger.next();
   // }
 }

 OnAddTaxType(){
  console.log('tax-type',this.taxTypeMaster)
  this.subscription.add(
    this.taxType.postTaxType(this.taxTypeMaster).subscribe({
      next:response =>{
        this.log.log('posted tax type:',response)
      }
    })
  )
 }
 onEditTaxType(taxtype: any) {
  this.log.log(taxtype)
  this.taxTypeMaster = taxtype;
 





}
UpdateTax() {
  this.subscription.add(
    this.taxType.updateTaxType(this.taxTypeMaster.Tax_Type_Master_Id, this.taxTypeMaster).subscribe({
      next: response => {
        this.log.log('update template:', response)
      }
    })


  )




}

deleteTaxType(taxtype:any){
  this.subscription.add(
    this.taxType.deleteTaxType(taxtype.Tax_Type_Master_Id,this.taxTypeMaster).subscribe({
      next:response =>{
        this.log.log('deleted tax',response)
      }
    })
  )
}

 

  reRender(): void {
    // if (this.dtElement.dtInstance) {
    //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //     // Destroy the table first
    //     dtInstance.destroy();
    //     // Call the dtTrigger to re render again
    //     this.dtTrigger.next();
    //     setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
    //   });
    // } else {
    //   this.dtTrigger.next();
    //   if (!(jQuery('table').parents('.dataTables_scroll').length)) {
    //     setTimeout(() => jQuery('table').wrap('<div class="dataTables_scroll" />'), 100);
    //   }
    // }
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }
  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }


  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
