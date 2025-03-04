import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GrnService {

  constructor(private apiHandler: ApiHandlerService) { }

  getGrnList(fromDate: string, toDate: string, warehouse: string) {
    const requestUrl = `grn/list/${fromDate}/${toDate}/${warehouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'grn master : list');
  }

  getGrnNumber() {
    const requestUrl = `grn/`;
    return this.apiHandler.getRequest(requestUrl, null, 'grn number');
  }

  getGRNDetail(grnNumber: string) {
    const requestUrl = `grn/${grnNumber}`;
    return this.apiHandler.getRequest(requestUrl, null, 'grn detail');
  }

  saveGRN(GRN: any) {
    const requestUrl = `grn`;
    return this.apiHandler.postRequest(requestUrl, GRN, 'save GRN :')
  }

  importGRN(GRNlist: any[]) {
    const requestUrl = `grn`;
    return this.apiHandler.postRequest(requestUrl, GRNlist, 'import GRN :')
  }

}
