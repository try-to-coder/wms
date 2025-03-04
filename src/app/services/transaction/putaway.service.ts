import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PutawayService {

  constructor(private apiHandler: ApiHandlerService) { }

  getPutAwayList(warehouse: string, fromDate: string, toDate: string) {
    const requestUrl = `putaway/list/${warehouse}/${fromDate}/${toDate}`;
    return this.apiHandler.getRequest(requestUrl, null, 'put away master : list', true);
  }

  savePutAway(putAwayList: any[]) {
    const requestUrl = `putaway/`;
    return this.apiHandler.postRequest(requestUrl, putAwayList, 'put away master : save', true);
  }

  getPutAwayDetail(putAwayNumber: string) {
    const requestUrl = `putaway/${putAwayNumber}`;
    return this.apiHandler.getRequest(requestUrl, null, 'put away master : detail', true);
  }

}
