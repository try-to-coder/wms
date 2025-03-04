import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { MaterialAttributesService } from 'src/app/services/master/material-attributes.service';

@Component({
  selector: 'app-material-uom',
  templateUrl: './material-uom.component.html',
  styleUrls: ['./material-uom.component.scss']
})
export class MaterialUomComponent implements OnInit ,OnDestroy{
  materialUomMaster:any={};
  subscription:Subscription= new Subscription();

  private _materialuomElement: string = '';
  get materialuomElement(): string {
    return this._materialuomElement;
  }
  @Input() set materialuomElement(value: string) {
    this._materialuomElement = value;
    this.onEditMaterialUom()
    
  }


  constructor( private materialuom:MaterialAttributesService,private log:LogService) { }

  ngOnInit() {
    this.onPageReady()
  }

  onPageReady(){

  }
  onEditMaterialUom(){
    this.materialUomMaster=this.materialuomElement;
  }
  saveMaterialUom(){
    this.subscription.add(
      
    this.materialuom.postMaterialUom(this.materialUomMaster).subscribe({
      next: response =>{
        this.log.log(' material uom :post',response)
        if(document.getElementById('material-uom-switch')?.click()){
          this.materialUomMaster.Is_Active='Active'
          this.materialUomMaster.Is_Active=response;
        }
          this.materialUomMaster.Is_Active='InActive';
          this.materialUomMaster.Is_Active=response;
      }

    }))

  }
   
  updateMaterialUom(){
    this.subscription.add(
      this.materialuom.updateMaterialUom(this.materialUomMaster.Material_UOM_Master_Id,this.materialUomMaster).subscribe({
        next: response => {
          this.log.log('updated material type',response)
        }
      })
    )
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
