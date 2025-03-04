import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor(private router: Router,
    private cryptoService: CryptoService) { }

  /**
    * Saves logged in user's data into local storage.
    *
    * @param data  logged in user data
    */
  saveLoginCredentials(data: any, userName?: string) {
    const loginCredentials = data || {};

    if (loginCredentials) {
      // this.currencyCode = loginCredentials.Currency_Code || 'INR';

      const currentObject: any = {};
      // currentObject.User_Name = this.cryptoService.encrypt('User_Name', userName);

      // encrypt data User_Name
      Object.keys(loginCredentials).forEach(key => {
        // this.log.log('key : ', key);
        let returnedText = '';
        let organization: any = {};
        let branch: any = {};
        let employee: any = {};

        switch (key) {
          case 'Organization_Master':
            organization = loginCredentials[key] || {};
            // for currency code
            this.saveCurrencyCode(organization);

            // save country
            const country = this.cryptoService.encrypt('Country', organization.Country);
            currentObject['Country'] = country;

            // save timezone
            const timeZone = this.cryptoService.encrypt('Time_Zone', organization.Time_Zone);
            currentObject['Time_Zone'] = timeZone;

            // save image
            if (organization.Organization_Image) {
              this.saveImageLocal('Organization_Image', organization.Organization_Image);
              organization.Organization_Image = '';
            }

            returnedText = this.cryptoService.encrypt(key.toString(), JSON.stringify(organization));
            currentObject[key] = returnedText;
            break;
          case 'Employee_Master':
            employee = loginCredentials[key] || {};
            // save image
            if (employee.Employee_Image) {
              this.saveImageLocal('Employee_Image', employee.Employee_Image);
              employee.Employee_Image = '';
            }

            if (employee.Software_Rights_Group) {
              const employeeRole = this.cryptoService.encrypt('Software_Rights_Group', employee.Software_Rights_Group);
              currentObject['Software_Rights_Group'] = employeeRole;
            }

            returnedText = this.cryptoService.encrypt(key.toString(), JSON.stringify(loginCredentials[key]));
            currentObject[key] = returnedText;
            break;
          default:
            returnedText = this.cryptoService.encrypt(key?.toString(), loginCredentials[key]);
            currentObject[key] = returnedText;
            break;
        }
      });

      localStorage.setItem('user-log-data', JSON.stringify(currentObject).toString());
    }
  }

  /**
 * Returns logged in user's data.
 *
 * @param type  required field name
 * @param isMasterType 0 as Organization master, 1 as Branch Master, 2 as Employee Master
 */
  getLoginCredentials(type: string, isMasterType?: string): string {
    const logType = type || '';
    let master = '';
    // final
    let returnValue = '';

    if ((type === 'Employee_Image') || (type === 'Organization_Image')) {
      return this.getImage(type);
    }

    if (logType) {
      if (isMasterType) {
        master = this.getMasterName(isMasterType);
      }
      returnValue = this.getCredentialsData(logType, master);
    }
    return returnValue;
  }

  getCredentialsData(key: string, master?: string): string {
    const appMaster = master || '';
    let returnValue = '';
    const userLog = localStorage.getItem('user-log-data');
    if (userLog && userLog !== 'null') {
      const userLogObject = JSON.parse(userLog || '{}');
      // this.log.log('userLogObject : ', userLogObject);

      if (appMaster) {
        const masterData:any = this.cryptoService.decrypt(appMaster, userLogObject[appMaster]);
        returnValue = masterData[key] || '';
        return returnValue;
      }

      if (key && userLogObject[key]) {
        returnValue = this.cryptoService.decrypt(key, userLogObject[key]);
      }
    }
    return returnValue;
  }

  getMasterName(isMasterType?: string): string {
    switch (isMasterType) {
      case '1': // Organization_Master
        return 'Organization_Master';
        break;
      case '3': // Employee_Master
        return 'Employee_Master';
        break;
      default:
        return '';
        break;
    }
  }

  getImage(key: string) {
    const userImage = localStorage.getItem(key);
    if (userImage && userImage !== 'null') {
      return 'data:image/jpeg;base64,' + userImage;
    } else {
      return '';
    }
  }

  saveImageLocal(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  saveCurrencyCode(currency: any) {
    const currencyData = currency || {};
    // console.log('currencyData : ', currencyData);
    if (currencyData.Currency_Code) {
      const returnedText = this.cryptoService.encrypt('Currency_Code', currencyData.Currency_Code);
      localStorage.setItem('Currency_Code', returnedText);
    }
    if (currencyData.Culture_Info_Code) {
      const returnedText = this.cryptoService.encrypt('Culture_Info_Code', currencyData.Culture_Info_Code);
      localStorage.setItem('Culture_Info_Code', returnedText);
    }
  }

  restoreInfo(isRedirect = true) {

    // get 
    const reloadDate = localStorage.getItem('reload-date');

    localStorage.clear(); // clear all

    // set
    (reloadDate && reloadDate != 'null') ? localStorage.setItem('reload-date', reloadDate) : null;

    if (isRedirect) {
      this.router.navigateByUrl('/login');
    }
  }

}
