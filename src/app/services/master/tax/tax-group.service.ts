import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../../api-handler.service';
import { LogService } from '../../log.service';

@Injectable({
  providedIn: 'root'
})
export class TaxGroupService {

  constructor( private apiHandler:ApiHandlerService,private log:LogService) { }



  getTaxGroupList(){
    const requestUrl=`tax/group/list`
    return  this.apiHandler.getRequest(requestUrl,null,'tax-group-list :get',true)
  }

  postTaxGroup(puttaxgroup:any){
    const requestUrl=`tax/group`
    return this.apiHandler.postRequest(requestUrl,puttaxgroup,'tax-group :post')
  }
  updateTaxGroup( code:string,puttaxgroup: any ) {
    const requestUrl = `tax/group/${code}`;
    return this.apiHandler.putRequest(requestUrl, puttaxgroup, 'tax-master :update')

  }
  deleteTaxGroup( code:string,deletion:any){
    const requestUrl=`tax/group/${code}`;
    return this.apiHandler.deleteRequest(requestUrl,deletion)
     }
}
