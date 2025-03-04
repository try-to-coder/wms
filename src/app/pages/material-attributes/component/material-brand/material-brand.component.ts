import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { MaterialAttributesService } from 'src/app/services/master/material-attributes.service';

@Component({
  selector: 'app-material-brand',
  templateUrl: './material-brand.component.html',
  styleUrls: ['./material-brand.component.scss']
})
export class MaterialBrandComponent implements OnInit ,OnDestroy{

  materialBrandMaster:any={};
  subscription:Subscription= new Subscription();
  savebutton=true;
  private _materialbrandElement: string = '';
  get materialbrandElement(): string {
    return this._materialbrandElement;
  }
  @Input() set materialbrandElement(value: string) {
    this._materialbrandElement = value;
    this.onEditMaterialBrand();
   
    
  }

  constructor( private route:Router,private materialBrand:MaterialAttributesService,private log:LogService) { }

  ngOnInit() {
    this.onPageReady();
    
    

  }

  

  onPageReady(){

  }

  onEditMaterialBrand(){
    this.materialBrandMaster=this.materialbrandElement;
   
  }

  saveMaterialBrand(){
    this.subscription.add(
      this.materialBrand.postMaterialBrand(this.materialBrandMaster).subscribe({
        next: response =>{
          this.log.log('material Brand :',response);
          this.materialBrandMaster.Sort_Order=0;
          if(document.getElementById('material-brand-switch')?.click()){
            this.materialBrandMaster.Is_Active='Active';
            this.materialBrandMaster.Is_Active =response

          }
            this.materialBrandMaster.Is_Active='InActive'
            this.materialBrandMaster.Is_Active=response;
             
        }
      })
        
      
    )
  }

  updateMaterialBrand(){
    this.subscription.add(
      this.materialBrand.updateMaterialBrand(this.materialBrandMaster.Material_Brand_Master_Id,this.materialBrandMaster).subscribe({
        next: response =>{
          this.log.log('updated brand ',response)
        }
      })
      
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


}
