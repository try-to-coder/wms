import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  invalidMessage = 'Something went wrong. Please try again later';

  constructor(private alert: AlertService) { }

  log(...args: any) {

    if (!environment.production) {
      if (arguments.length) {
        for (const message of arguments) {
          console.log(message);
        }
      }
    }
  }
  
  warn(...args: any) {
    if (arguments.length) {
      for (const message of arguments) {
        console.warn(message);
      }
    }
  }

  error(error: any, component: string, method: string | undefined, isAvoidDisplay: boolean = false) {
    if (environment.production) {
      console.warn('http request : ', `${method} : `, error);
      // send bug report to server
    }
    else {
      console.error('http request : ', `${component} - ${method} :`, error);
    }

    // for show message
    if (isAvoidDisplay) {
      return;
    }

    if (typeof error === 'object') {
      const code = error.code || '';
      if (code == '0') {
        // this.alert.errorMessage(error.message);
      }
      else {
        // this.alert.errorMessage(error.message || this.invalidMessage);
      }
    }
    else {
      // this.alert.errorMessage(this.invalidMessage);
    }
  }

}
