import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../../api-handler.service';
import { LogService } from '../../log.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private apiHandler:ApiHandlerService,private log:LogService ) { }


  getConnectionlist() {
    const requestUrl = `label-printer/connection/list`;
    return this.apiHandler.getRequest(requestUrl, null, 'label printer connection : list', true);
  }

  deleteConnection(connectionId : string){
    const requestUrl=`label-printer/connection/${connectionId}`
    return this.apiHandler.deleteRequest(requestUrl,'employee master : delete')
  }


 
}
