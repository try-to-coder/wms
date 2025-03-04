import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private apiHandler: ApiHandlerService) { }

  getStockList(filterObject: any) {
    const requestUrl = `inventory`;
    return this.apiHandler.postRequest(requestUrl, filterObject, 'stocks-list : list');
  }

  getStockAdjustmentList(fromDate: string, toDate: string, warehouse: string) {
    const requestUrl = `stocks-adjustment/list/${fromDate}/${toDate}/${warehouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'stocks-adjustment : list');
  }

  getStockAdjustmentNumber(warehouse: string, date: string) {
    const requestUrl = `stocks-adjustment/${warehouse}/${date}`;
    return this.apiHandler.getRequest(requestUrl, null, 'stocks-adjustment : number');
  }

  getStockAdjustmentDetail(number: string) {
    const requestUrl = `stocks-adjustment/${number}`;
    return this.apiHandler.getRequest(requestUrl, null, 'stocks-adjustment : detail');
  }

  getStockAdjustmentReason(){
    const requestUrl = `stocks-adjustment/reasons/list`;
    return this.apiHandler.getRequest(requestUrl, null, 'stocks-adjustment : detail');
  }

  saveStockAdjustmentReason(adjustment:any){
    const requestUrl = `stocks-adjustment/reasons`;
    return this.apiHandler.postRequest(requestUrl, adjustment, 'stocks-adjustment : detail');
  }

  importStockAdjustment(adjustmentList: any[]) {
    const requestUrl = `stocks-adjustment`;
    return this.apiHandler.postRequest(requestUrl, adjustmentList, 'stocks-adjustment : import');
  }

 




}
