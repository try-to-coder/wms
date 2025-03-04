import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PickListService {

  constructor(private apiHandler: ApiHandlerService) { }

  //#region Picking Sale Order

  getSaleOrderList(fromDate: string, toDate: string, warehouse: string) {
    const requestUrl = `picklist/master/${fromDate}/${toDate}/${warehouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'picklist master : list', true);
  }

  getSaleOrderDetail(pickListNumber: string) {
    const requestUrl = `picklist/master/${pickListNumber}`;
    return this.apiHandler.getRequest(requestUrl, null, 'picklist detail', true);
  }

  importPickListOrder(pickListOrder: any[]) {
    const requestUrl = `picklist/master`;
    return this.apiHandler.postRequest(requestUrl, pickListOrder, 'import picklist :')
  }

  //#endregion


  //#region Assigned Pick List

  getPickList(filterObject: any) {
    const requestUrl = `picklist/list/`;
    return this.apiHandler.postRequest(requestUrl, filterObject, 'picklist master : list');
  }

  getPickListDetail(pickListNumber: string) {
    const requestUrl = `picklist/${pickListNumber}`;
    return this.apiHandler.getRequest(requestUrl, null, 'picklist master : list');
  }

  assignPickList(pickList: any) {
    const requestUrl = `picklist`;
    return this.apiHandler.postRequest(requestUrl, pickList, 'picklist master : list');
  }

  //#endregion

  //#region Complete Pick List

  savePickingList(pickListProducts: any[]) {
    const requestUrl = `picklist/${pickListProducts[0].Picklist_Number}`;
    return this.apiHandler.putRequest(requestUrl, pickListProducts, 'picklist product master : list');
  }

  //#endregion

}
