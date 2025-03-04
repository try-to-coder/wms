import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encrypt(keys: string, value: string) {
    if (keys && value) {
      // console.log("keys : " + keys + "value : " + value);
      const keyName = typeof keys === 'string' ? keys?.trim() : keys;
      const dataValue = typeof value === 'string' ? value?.trim() : JSON.stringify(value);
      let encryptedText = CryptoJS.AES.encrypt(dataValue, keyName).toString();
      return encryptedText;
    }
    return '';
  }

  decrypt(keys: string, value: string) {
    // console.log("keys : " + keys + "value : " + value);
    if (keys && value) {
      const keyName = typeof keys === 'string' ? keys?.trim() : keys;
      const dataValue = typeof value === 'string' ? value?.trim() : JSON.stringify(value);
      let decryptedText = CryptoJS.AES.decrypt(dataValue, keyName);
      return decryptedText.toString(CryptoJS.enc.Utf8);
    }
    return '';
  }
}
