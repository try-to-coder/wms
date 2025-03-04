import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LogService } from './log.service';
import { ResponseHandlerService } from './response-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private readonly api: ApiService,
    private responseHandler: ResponseHandlerService,
    private log: LogService) {
  }
  
  getRequest(url: string, request?: any, tag?: string, isNoCache?: boolean): Observable<any> {
    const requestUrl = url || '';
    const requestObject = request || null;

    return this.api.get(requestUrl, requestObject, undefined, false, isNoCache).pipe(map(response => {
      this.log.log(tag + 'response : ', response);
      const data = this.responseHandler.formatResponse(response);
      return data;
    }, (error: any) => this.log.error(error, 'api-handler', tag)));
  }

  postRequest(url: string, request?: any, tag?: string, isAvoidHandler?: boolean, isLogin?: boolean): Observable<any> {
    const requestUrl = url || '';
    const requestObject = request || null;
    return this.api.post(requestUrl, requestObject, undefined, isLogin).pipe(map(response => {
      this.log.log(tag + 'response : ', response);
      if (isAvoidHandler) {
        return response;
      }
      const data = this.responseHandler.formatResponse(response);
      return data;
    }, (error: any) => this.log.error(error, 'api-handler', tag)));
  }

  putRequest(url: string, request?: any, tag?: string): Observable<any> {
    const requestUrl = url || '';
    const requestObject = request || null;
    return this.api.put(requestUrl, requestObject).pipe(map(response => {
      this.log.log(tag + 'response : ', response);
      const data = this.responseHandler.formatResponse(response);
      return data;
    }, (error: any) => this.log.error(error, 'api-handler', tag)));
  }

  deleteRequest(url: string, tag?: string): Observable<any> {
    const requestUrl = url || '';
    // const requestObject = request || null;
    return this.api.delete(requestUrl).pipe(map(response => {
      this.log.log(tag + 'response : ', response);
      const data = this.responseHandler.formatResponse(response);
      return data;
    }, (error: any) => this.log.error(error, 'api-handler', tag)));
  }
  
}
