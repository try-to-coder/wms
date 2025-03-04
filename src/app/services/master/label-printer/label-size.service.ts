import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LabelSizeService {

  constructor( private apiHandler:ApiHandlerService) { }

  getLabelSizelist() {
    const requestUrl = `label-printer/size/list`;
    return this.apiHandler.getRequest(requestUrl, null, 'label printer size : list', true);
  }
  updatelabelSize( code:string,putlabelsize: any ) {
    const requestUrl = `label-printer/template/${code}`;
    return this.apiHandler.putRequest(requestUrl, putlabelsize, 'material-master :update')

  }

  postLabelSize(putLabelSize:any){
    const requestUrl=`label-printer/size`
    return this.apiHandler.postRequest(requestUrl,putLabelSize,'employee master : get')
  }

  deleteTemplate(sizeId : string){
    const requestUrl=`label-printer/size/${sizeId}`
    return this.apiHandler.deleteRequest(requestUrl,'employee master : delete')
  }

}
