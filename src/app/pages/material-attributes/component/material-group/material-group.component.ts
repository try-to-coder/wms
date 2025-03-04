import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/services/log.service';
import { MaterialAttributesService } from 'src/app/services/master/material-attributes.service';

@Component({
  selector: 'app-material-group',
  templateUrl: './material-group.component.html',
  styleUrls: ['./material-group.component.scss']
})
export class MaterialGroupComponent implements OnInit,OnDestroy {

  subscription:Subscription = new Subscription() ;
  materialGroupMaster:any={};
    
  private _materialgroupElement: string = '';
  get materialgroupElement(): string {
    return this._materialgroupElement;
  }
  @Input() set materialgroupElement(value: string) {
    this._materialgroupElement = value;
    this.onEditMaterialGroup()
    
  }

  constructor( private route:Router,private materialGroup:MaterialAttributesService,private log:LogService) { }

  ngOnInit() {
    this.onPageReady()
  }
  onPageReady(){

  }

  onEditMaterialGroup(){
    this.materialGroupMaster=this.materialgroupElement
  }
  SaveMaterialGroup(){
    this.subscription.add(
      this.materialGroup.postMaterialGroup(this.materialGroupMaster).subscribe({
        next: response =>{
          this.log.log('material Group :',response);
          this.materialGroupMaster.Sort_Order=0;
          if(document.getElementById('material-group-switch')?.click()){
            this.materialGroupMaster.Is_Active='Active'
          }
            this.materialGroupMaster.Is_Active='InActive'

          

        }
      })
    )

  }

  updateMaterialGroup(){
    this.subscription.add(
      this.materialGroup.updateMaterialGroup(this.materialGroupMaster.Material_Group_Master_Id,this.materialGroupMaster).subscribe({
        next: response =>{
          this.log.log('updated Material Group',response)

        }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
