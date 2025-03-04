import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../../api-handler.service';
import { LogService } from '../../log.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor( private apiHandler:ApiHandlerService,private log:LogService) { }

    getTemplatelist() {
    const requestUrl = `label-printer/template/list`;
    return this.apiHandler.getRequest(requestUrl, null, 'label printer size : list', true);
  }
  updateTemplate( code:string,puttemplate: any ) {
    const requestUrl = `label-printer/template/${code}`;
    return this.apiHandler.putRequest(requestUrl, puttemplate, 'material-master :update')

  }
  postTemplate(putTemplate:any){
    const requestUrl=`label-printer/template`
    return this.apiHandler.postRequest(requestUrl,putTemplate,'employee master : get')
  }

  deleteTemplate(templateId : string){
    const requestUrl=`label-printer/template/${templateId}`
    return this.apiHandler.deleteRequest(requestUrl,'employee master : delete')
  }

}
