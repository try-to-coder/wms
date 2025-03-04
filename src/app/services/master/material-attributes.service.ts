import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialAttributesService {

  constructor(private apiHandler: ApiHandlerService, private log: LogService) { }

  postMaterialBrand(putMaterialBrand: any) {
    const requestUrl = `material/attributes/brand`
    return this.apiHandler.postRequest(requestUrl, putMaterialBrand, 'add material brand')

  }
  postMaterialUom(putMaterialUom: any) {
    const requestUrl = `material/attributes/uom`
    return this.apiHandler.postRequest(requestUrl, putMaterialUom, 'add material UOM')

  }
  postMaterialType(putMaterialType: any) {
    const requestUrl = `material/attributes/type`
    return this.apiHandler.postRequest(requestUrl, putMaterialType, 'add material Type')

  }
  postMaterialModel(putMaterialModel: any) {
    const requestUrl = `material/attributes/model`
    return this.apiHandler.postRequest(requestUrl, putMaterialModel, 'add material Model')

  }
  postMaterialGroup(putMaterialGroup: any) {
    const requestUrl = `material/attributes/group`
    return this.apiHandler.postRequest(requestUrl, putMaterialGroup, 'add material Group')

  }

  updateMaterialBrand(code: string, updateMaterialBrand: any) {
    const requestUrl = `material/attributes/brand/${code}`;
    return this.apiHandler.putRequest(requestUrl, updateMaterialBrand, 'update material Brand : put')
  }
  updateMaterialUom(code: string, updateMaterialUom: any) {
    const requestUrl = `material/attributes/uom/${code}`;
    return this.apiHandler.putRequest(requestUrl, updateMaterialUom, 'update material Brand : put')
  }
  updateMaterialType(code: string, updateMaterialType: any) {
    const requestUrl = `material/attributes/type/${code}`;
    return this.apiHandler.putRequest(requestUrl, updateMaterialType, 'update material Brand : put')
  }
  updateMaterialModel(code: string, updateMaterialModel: any) {
    const requestUrl = `material/attributes/model/${code}`;
    return this.apiHandler.putRequest(requestUrl, updateMaterialModel, 'update material Brand : put')
  }
  updateMaterialGroup(code: string, updateMaterialGroup: any) {
    const requestUrl = `material/attributes/group/${code}`;
    return this.apiHandler.putRequest(requestUrl, updateMaterialGroup, 'update material Brand : put')
  }
  deleteMaterialBrand(code: string, deletebrand: any) {
    const requestUrl = `material/attributes/brand/${code}`;
    return this.apiHandler.deleteRequest(requestUrl, deletebrand)
  }
  deleteMaterialType(code: string, deletetype: any) {
    const requestUrl = `material/attributes/type/${code}`;
    return this.apiHandler.deleteRequest(requestUrl, deletetype)
  }
  deleteMaterialUom(code: string, deleteuom: any) {
    const requestUrl = `material/attributes/uom/${code}`;
    return this.apiHandler.deleteRequest(requestUrl, deleteuom)
  }
  deleteMaterialModel(code: string, deletemodel: any) {
    const requestUrl = `material/attributes/model/${code}`;
    return this.apiHandler.deleteRequest(requestUrl, deletemodel)
  }
  deleteMaterialGroup(code: string, deleteGroup: any) {
    const requestUrl = `material/attributes/group/${code}`;
    return this.apiHandler.deleteRequest(requestUrl, deleteGroup)
  }

  deleteAttributes(code: any, deleteGroup: any) {
    const type = deleteGroup.toLowerCase();
    const requestUrl = `material/attributes/${type}/${code}`;
    return this.apiHandler.deleteRequest(requestUrl, deleteGroup)

  }






}
