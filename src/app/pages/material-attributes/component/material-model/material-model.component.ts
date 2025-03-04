import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { MaterialAttributesService } from 'src/app/services/master/material-attributes.service';

@Component({
  selector: 'app-material-model',
  templateUrl: './material-model.component.html',
  styleUrls: ['./material-model.component.scss']
})
export class MaterialModelComponent implements OnInit {
  subscription:Subscription=new Subscription();
  materialModelMaster:any={};
  private _materialmodelElement: string = '';
  get materialmodelElement(): string {
    return this._materialmodelElement;
  }
  @Input() set materialmodelElement(value: string) {
    this._materialmodelElement = value;
    this.onEditMaterialModel()
    
  }

  constructor( private materialModel:MaterialAttributesService, private log:LogService) { }

  ngOnInit() {
    this.onPageReady()
  }

  onPageReady(){

  }
  onEditMaterialModel(){
    this.materialModelMaster=this.materialmodelElement
  }


  saveMaterialModel(){
    this.subscription.add(
      this.materialModel.postMaterialModel(this.materialModelMaster).subscribe({
        next: response =>{
          this.log.log('material model :post',response);
          if(document.getElementById('material-model-switch')?.click()){
            this.materialModelMaster.Is_Active='Active'
            this.materialModelMaster.Is_Active=response;
          }
            this.materialModelMaster.Is_Active='InActive';
            this.materialModelMaster.Is_Active=response;
          
        }
      })
    )

  }

  updateMaterialModel(){
    this.subscription.add(
      this.materialModel.updateMaterialModel(this.materialModelMaster.Material_Model_Master_Id,this.materialModelMaster).subscribe({
        next: response => {
          this.log.log('updated material model',response)
        }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
