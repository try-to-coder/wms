import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor( private apiHandler:ApiHandlerService) { }

  getOrganization(code:string){
    const requestUrl = `organization/${code}`;
    return this.apiHandler.getRequest(requestUrl,null,'organization-master :read');


  }

  updateOrganization(code:string, organizationDetail:any){
    delete organizationDetail['Organization_Master_Id']
    const requestUrl = `organization/${code}`;
    return this.apiHandler.putRequest(requestUrl,organizationDetail,'organization-master : update');
  }

 
  
}
