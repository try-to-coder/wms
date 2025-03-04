import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { TaxService } from 'src/app/services/master/tax/tax.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  subscription:Subscription= new Subscription();
  taxList:any[]=[];
  taxMaster:any={};
  addButton=true;
  updateButton=false;

  constructor( private route:Router,private tax:TaxService,private log:LogService,private dataTable:DataTableService) { }

  ngOnInit() {
    this.onPageReady()
  }

  onPageReady(){

    this.getTaxList()
  }

  getTaxList(){
    this.subscription.add(this.tax.getTaxList().subscribe({
     next: response =>{
       this.log.log('tax group list:',response);
       const list = response ||[]
       this.setTaxList(list)
     }
   }))
 }

 setTaxList(taxType: any[], isReRender = false): void {
   this.taxList =  taxType || [];
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


 OnAddTax(){
  console.log('tax-type',this.taxMaster)
  this.subscription.add(
    this.tax.postTax(this.taxMaster).subscribe({
      next:response =>{
        this.log.log('posted tax type:',response)
      }
    })
  )
 }
 onEditTax(tax: any) {
  this.log.log(tax)
  this.taxMaster = tax;
  this.addButton=false;
  this.updateButton=true





}
UpdateTax() {
  this.subscription.add(
    this.tax.updateTaxList(this.taxMaster.Tax_Master_Id, this.taxMaster).subscribe({
      next: response => {
        this.log.log('update template:', response)
      }
    })


  )




}

deleteTax(tax:any){
  this.subscription.add(
    this.tax.deleteTax(tax.Tax_Master_Id,this.taxMaster).subscribe({
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
