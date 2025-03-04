import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../../api-handler.service';
import { LogService } from '../../log.service';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor( private apiHandler:ApiHandlerService,private log:LogService) { }
  getTaxList(){
    const requestUrl=`tax/list`;
    return this.apiHandler.getRequest(requestUrl,null,'tax-type list :get',true);
  }
  updateTaxList( code:string,puttax: any ) {
    const requestUrl = `tax/${code}`;
    return this.apiHandler.putRequest(requestUrl, puttax, 'tax-master :update')

  }

  postTax(puttaxtype:any){
    const requestUrl=`tax`;
    return this.apiHandler.postRequest(requestUrl,puttaxtype,'tax-group :post')

  }

  deleteTax( code:string,deletion:any){
 const requestUrl=`tax/${code}`;
 return this.apiHandler.deleteRequest(requestUrl,deletion)
  }
}
