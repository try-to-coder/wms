import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  private readonly success = 'success';
  private readonly fail = 'fail';
  private readonly error = 'error';

  constructor(private alert: AlertService) { }

  formatResponse(response: any, isAvoidErrorMessage?: boolean): any {
    const responseObj = response || {};
    let data = null; // for returnable object
    switch (responseObj.status) {
      case this.success:
        data = responseObj.data || {};
        break;
      case this.fail:
        if (!isAvoidErrorMessage) {
          this.alert.errorAlert(responseObj.message || 'Failed!', responseObj.error?.message);
        }
        break;
      case this.error:
        if (!isAvoidErrorMessage) {
          this.alert.errorAlert(responseObj.message || 'Error!', responseObj.error?.message);
        }
        break;
      default:
        break;
    }
    return data;
  }

  /**
   * @param response 
   * @param isAvoidErrorMessage 
   * @returns object contains status, message, description.
   * @private data - response.data
   * @private status - true, 
   * @private message - response message, 
   * @private description - response error.message, 
   */
  formateResponseWithMessage(response: any, isAvoidErrorMessage?: boolean): any {
    const responseObj = response || {};

    let data = null; // for returnable object
    switch (responseObj.status) {
      case this.success:
        data = responseObj.data || {};
        break;
      case this.fail:
        if (!isAvoidErrorMessage) { this.alert.errorAlert(responseObj.message || 'Failed!', responseObj.error?.message); }
        break;
      case this.error:
        if (!isAvoidErrorMessage) { this.alert.errorAlert(responseObj.message || 'Error!', responseObj.error?.message); }
        break;
      default:
        break;
    }
    const returnResponse: any = {
      data: data,
      status: data ? true : false,
      message: response.message
    };
    if (response.error) {
      returnResponse.description = response.error.message;
    }
    return returnResponse;
  }
}
