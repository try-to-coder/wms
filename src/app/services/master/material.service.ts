import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHandlerService } from '../api-handler.service';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private apiHandler: ApiHandlerService, private log: LogService) { }

  getMaterialList() {
    const requestUrl = `material/list`;
    return this.apiHandler.getRequest(requestUrl, null, 'material master : read', true);
  }

  getMaterialDropdown() {
    const requestUrl = `material/dropdown`;
    return this.apiHandler.getRequest(requestUrl, null, 'material master : read', true);
  }

  getMaterialGroupList(){
    const requestUrl=`material/attributes/group/list`;
    return this.apiHandler.getRequest(requestUrl,null,'material group List',true)
  }
  getMaterialTypeList(){
    const requestUrl=`material/attributes/type/list`;
    return this.apiHandler.getRequest(requestUrl,null,'material group List',true)
  }
  getMaterialBrandList(){
    const requestUrl=`material/attributes/brand/list`;
    return this.apiHandler.getRequest(requestUrl,null,'material group List',true)
  }
  getMaterialModelList(){
    const requestUrl=`material/attributes/model/list`;
    return this.apiHandler.getRequest(requestUrl,null,'material group List',true)
  }
  getMaterialUomList(){
    const requestUrl=`material/attributes/uom/list`;
    return this.apiHandler.getRequest(requestUrl,null,'material group List',true)
  }

  getMaterial(materialID:string) {
    const requestUrl = `material/${materialID}`;
    return this.apiHandler.getRequest(requestUrl, null, 'material-master :read')
  }

  saveMaterial(putMaterial: any) {
    const requestUrl = `material`;
    return this.apiHandler.postRequest(requestUrl, putMaterial, 'add material master : post')
  }

  updateMaterial( code: string,putMaterial: any ) {
    const requestUrl = `material/${code}`;
    return this.apiHandler.putRequest(requestUrl, putMaterial, 'material-master :update')

  }


}
