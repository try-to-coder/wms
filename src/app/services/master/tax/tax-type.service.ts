import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../../api-handler.service';
import { LogService } from '../../log.service';

@Injectable({
  providedIn: 'root'
})
export class TaxTypeService {

  constructor( private apiHandler:ApiHandlerService,private log:LogService) { }


  getTaxTypeList(){
    const requestUrl=`tax/type/list`;
    return this.apiHandler.getRequest(requestUrl,null,'tax-type list :get',true);
  }
  updateTaxType( code:string,puttaxtype: any ) {
    const requestUrl = `tax/type/${code}`;
    return this.apiHandler.putRequest(requestUrl, puttaxtype, 'tax-master :update')

  }

  postTaxType(puttaxtype:any){
    const requestUrl=`tax/type`;
    return this.apiHandler.postRequest(requestUrl,puttaxtype,'tax-group :post')

  }
  deleteTaxType( code:string,deletion:any){
    const requestUrl=`tax/type/${code}`;
    return this.apiHandler.deleteRequest(requestUrl,deletion)
     }
}
