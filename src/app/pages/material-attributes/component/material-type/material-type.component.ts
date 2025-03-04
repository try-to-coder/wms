import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { MaterialAttributesService } from 'src/app/services/master/material-attributes.service';
import { MaterialService } from 'src/app/services/master/material.service';

@Component({
  selector: 'app-material-type',
  templateUrl: './material-type.component.html',
  styleUrls: ['./material-type.component.scss']
})
export class MaterialTypeComponent implements OnInit {
   subscription:Subscription= new Subscription();
   materialTypeMaster:any={};

   
  private _materialtypeElement: string = '';
  get materialtypeElement(): string {
    return this._materialtypeElement;
  }
  @Input() set materialtypeElement(value: string) {
    this._materialtypeElement = value;
    this.onEditMaterialType()
    
  }

  constructor( private materialtype :MaterialAttributesService ,private log:LogService) { }

  ngOnInit() {
    this.onPageReady()
  
  }

  onEditMaterialType(){
    this.materialTypeMaster=this.materialtypeElement
  }

  onPageReady(){

  }

  
 
 
  SaveMaterialType(){
    this.subscription.add(
      this.materialtype.postMaterialType(this.materialTypeMaster).subscribe({
        next:response =>{
          this.log.log('material type:post',response);
          if(document.getElementById('material-type-switch')?.click()){
            this.materialTypeMaster.Is_Active='Active'
            this.materialTypeMaster.Is_Active=response;
          }
            this.materialTypeMaster.Is_Active='InActive';
            this.materialTypeMaster.Is_Active=response;
          
        
        }
      })
    )
    
  }

  
  updateMaterialType(){
    this.subscription.add(
      this.materialtype.updateMaterialType(this.materialTypeMaster.Material_Type_Master_Id,this.materialTypeMaster).subscribe({
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
