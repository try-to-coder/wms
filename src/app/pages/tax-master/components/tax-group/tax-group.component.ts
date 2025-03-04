import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { TaxGroupService } from 'src/app/services/master/tax/tax-group.service';

@Component({
  selector: 'app-tax-group',
  templateUrl: './tax-group.component.html',
  styleUrls: ['./tax-group.component.scss']
})
export class TaxGroupComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  subscription:Subscription= new Subscription();
  taxGroupList:any=[];
  taxGroupmaster:any={} 

  constructor( private route:Router,  private taxGroup:TaxGroupService, private log:LogService ,private dataTable:DataTableService) { 
    this.onPreInit()
  }

  onPreInit(){

  }

  ngOnInit() {
    this.onPageReady()
  }

  onPageReady(){

    this.getTaxGroupList()
  }


  getTaxGroupList(){
     this.subscription.add(this.taxGroup.getTaxGroupList().subscribe({
      next: response =>{
        this.log.log('tax group list:',response);
        const list = response ||[]
        this.setTaxGroupList(list)
      }
    }))
  }

  setTaxGroupList(taxType: any[], isReRender = false): void {
    this.taxGroupList =  taxType || [];
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
 onAddTaxGroup(){

  console.log('tax-group',this.taxGroupmaster)
  if(!this.taxGroupmaster){
    this.log.log('major group missing');
    return 
  }
  this.subscription.add(
    this.taxGroup.postTaxGroup(this.taxGroupmaster).subscribe({
      next: response =>{
        this.log.log('posted-value',response)
      }
    })
  )
 }

 onEditTax(taxGroup: any) {
  this.log.log(taxGroup)
  this.taxGroupmaster = taxGroup;
  




}

UpdateTaxGroup() {
  this.subscription.add(
    this.taxGroup.updateTaxGroup(this.taxGroupmaster.Tax_Group_Master_Id, this.taxGroupmaster).subscribe({
      next: response => {
        this.log.log('update template:', response)
      }
    })


  )




}

deleteTaxGroup(taxgroup:any){
  this.subscription.add(
    this.taxGroup.deleteTaxGroup(taxgroup.Tax_Group_Master_Id,this.taxGroupmaster).subscribe({
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
