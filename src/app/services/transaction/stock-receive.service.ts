import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class StockReceiveService {

  constructor(private apiHandler: ApiHandlerService) { }

  getStockReceiveList(fromDate: string, toDate: string, warehouse: string) {
    const requestUrl = `stock-receive/list/${fromDate}/${toDate}/${warehouse}`;
    return this.apiHandler.getRequest(requestUrl, null, 'stock-receive master : list');
  }

  getStockReceive(stockReceiveNumber: string) {
    const requestUrl = `stock-receive/${stockReceiveNumber}`;
    return this.apiHandler.getRequest(requestUrl, null, 'stock-receive master : read');
  }

  saveStockReceive(stockReceive: any) {
    const requestUrl = `stock-receive`;
    return this.apiHandler.postRequest(requestUrl, stockReceive, 'stock-receive master : save');
  }

  getStockReceiveProducts(stockReceiveNumber: string) {
    const requestUrl = `stock-receive/products/${stockReceiveNumber}`;
    return this.apiHandler.getRequest(requestUrl, null, 'stock-receive master : product list');
  }

  saveStockReceiveProducts(receiveProduct: any) {
    const requestUrl = `stock-receive/products`;
    return this.apiHandler.postRequest(requestUrl, receiveProduct, 'stock-receive master : save');
  }

  getStockReceiveBarcode(warehouseCode: string, stockReceiveNumber: string, materialCode?: string) {
    const requestUrl = `stock-receive/barcode/${warehouseCode}/${stockReceiveNumber}/${materialCode || ''}`;
    return this.apiHandler.getRequest(requestUrl, null, 'stock-receive master : barcode list ');
  }

}
