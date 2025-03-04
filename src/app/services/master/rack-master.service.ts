import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class RackMasterService {

  constructor(private apiHandler: ApiHandlerService, private log: LogService) { }

  getRackList(wareHouse: string) {
    const requestUrl = `warehouse/attributes/rack/list/${wareHouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'Rack master : read');
  }

  getRackDropdown() {

  }

  getRackMappingList(wareHouse: string) {
    const requestUrl = `warehouse/attributes/mapping/list/${wareHouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'Rack master : read');
  }

  getRackMappingDropdown(wareHouse: string) {
    const requestUrl = `warehouse/attributes/mapping/${wareHouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'Rack master : read');
  }

}
