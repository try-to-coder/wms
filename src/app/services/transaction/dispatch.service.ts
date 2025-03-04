import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private apiHandler: ApiHandlerService) { }

  getDispatchList(warehouse: string, fromDate: string, toDate: string) {
    const requestUrl = `dispatch/list/${warehouse}/${fromDate}/${toDate}`;
    return this.apiHandler.getRequest(requestUrl, null, 'dispatch master : list', true);
  }

  saveDispatch(dispatch: any) {
    const requestUrl = `dispatch/`;
    return this.apiHandler.postRequest(requestUrl, dispatch, 'dispatch master : save', true);
  }

}
