import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private apiHandler: ApiHandlerService, private log: LogService) { }

  getWarehouseList() {
    const requestUrl = `warehouse/list`;
    return this.apiHandler.getRequest(requestUrl, null, 'warehouse master : read', true);
  }

  gerWarehouseDropdown() {
    const requestUrl = `warehouse`;
    return this.apiHandler.getRequest(requestUrl, null, 'warehouse master : read', true);
  }

  getWarehouse(warehouseID: any) {
    const requestUrl = `warehouse/${warehouseID}`;
    return this.apiHandler.getRequest(requestUrl, null, 'get update warehouse : get');
  }

  addWarehouse(warehouse: any) {
    const requestUrl = `warehouse`;
    return this.apiHandler.postRequest(requestUrl, warehouse, 'warehouse master : add');
  }

  updateWarehouse(warehouseID: string, putMaterial: any) {
    const requestUrl = `warehouse/${warehouseID}`;
    return this.apiHandler.putRequest(requestUrl, putMaterial, 'warehouse master : update');
  }

  deleteWareHouse(warehouseID: string) {
    const requestUrl = `warehouse/${warehouseID}`;
    return this.apiHandler.deleteRequest(requestUrl, 'warehouse master : delete');
  }

  // Rack Master
  getRackList(wareHouse: string) {
    const requestUrl = `warehouse/attributes/rack/list/${wareHouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'Rack master : read');
  }

  getRackMaster(wareHouse: string, rackCode: string) {
    const requestUrl = `warehouse/attributes/rack/${wareHouse}/${rackCode}`;
    return this.apiHandler.getRequest(requestUrl, null, 'Rack master detail: read');
  }

  getRackMappingList(wareHouse: string) {
    const requestUrl = `warehouse/attributes/mapping/list/${wareHouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'Rack master : read');
  }

  getRackMappingDropdown(wareHouse: string) {
    const requestUrl = `warehouse/attributes/mapping/${wareHouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'Rack master : read');
  }

  getRackDropdown(wareHouse: string) {
    const requestUrl = `warehouse/attributes/rack`;
    return this.apiHandler.getRequest(requestUrl, null, 'warehouse : rack dropdown');
  }

  addRackMaster(rack: any) {
    const requestUrl = `warehouse/attributes/rack`;
    return this.apiHandler.postRequest(requestUrl, rack, 'warehouse : save rack master');
  }

  updateRackMaster(rackMasterID: string, rack: any) {
    const requestUrl = `warehouse/attributes/rack/${rackMasterID}`;
    return this.apiHandler.putRequest(requestUrl, rack, 'warehouse : save rack master');
  }

  deleteRackMaster(rackMasterID: string) {
    const requestUrl = `warehouse/attributes/rack/${rackMasterID}`;
    return this.apiHandler.deleteRequest(requestUrl, 'warehouse : delete rack master');
  }

}
