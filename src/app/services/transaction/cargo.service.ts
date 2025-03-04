import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private apiHandler: ApiHandlerService) { }

  getCargoList(fromDate: string, toDate: string) {
    const requestUrl = `cargo/list/${fromDate}/${toDate}`;
    return this.apiHandler.getRequest(requestUrl, null, 'dispatch master : list');
  }

  getCargoDetail(awbNo: string, hawNo: string) {
    const requestUrl = `cargo/${awbNo}/${hawNo}`;
    return this.apiHandler.getRequest(requestUrl, null, 'dispatch master : list');
  }

  importCargoList(cargoList: any[]) {
    const requestUrl = `cargo/`;
    return this.apiHandler.postRequest(requestUrl, cargoList, 'dispatch master : cargo list');
  }

  inwardCargoList(cargoList: any[]) {
    const requestUrl = `cargo/inward/`;
    return this.apiHandler.putRequest(requestUrl, cargoList, 'dispatch master : cargo list');
  }

  outwardCargoList(cargoList: any[]) {
    const requestUrl = `cargo/outward/`;
    return this.apiHandler.putRequest(requestUrl, cargoList, 'dispatch master : cargo list');
  }

} 
