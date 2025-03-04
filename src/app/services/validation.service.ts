import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  validation: any = []
  filedCount = 0;

  constructor() { }

  required(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;
    if (val === null || val === '') return { 'required': true };
    if (val.toString().match(/^[ \t\r\n]*$/)) return { 'required': true };
    return null;
  }

  gstValidation(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!val.toString().match(/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[a-zA-Z0-9]{1}$/)) return { 'gstValidation': true };
    return null;
  }

  hsnCodeValidation(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]{6}$/)) return { 'hsnCode': true };

    return null;

  }

  fssaiCodeValidation(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]{14}$/)) return { 'fssai': true };

    return null;

  }

  emailValidation(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;

    if (val === null || val === '') return null;
    if (!val.toString().match(/^[a-z0-9._%+-]+@[a-z0-9-]+[.]{1}[a-z]{1,30}$/)) return { 'email': true };

    return null;

  }

  numeric(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }

  hsnCodeValidation2(control: AbstractControl): { [key: string]: any } | null {
    var str = control.value;
    var patt1 = /[0-9]/g;
    var patt2 = /[a-zA-Z]/g;
    var letters = str.match(patt2);
    var digits = str.match(patt1);
    if (letters != null && digits != null) {
      if (control.value.length < 6) {
        return { "hsnCode": "less" }
      }
      else if (control.value.length > 8) {
        return { "hsnCode": "greater" }
      }
      else {
        return null
      }
    }
    else {
      return { "hsnCode": "L and N" }
    }
  }

  otpChecker(e: { charCode: number; which: number; preventDefault: () => void; }, value: string | any[], length: number, pattern: string | RegExp) {
    var regex = new RegExp(pattern);
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str) && value?.length <= length) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  otpCounter(e: { preventDefault: () => void; }, value: string | any[]) {
    if (value?.length <= 1) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  customValidation(e: { charCode: number; which: number; preventDefault: () => void; }, value: string | any[], length: number, pattern: string | RegExp) {

    var regex = new RegExp(pattern);
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str) && value?.length <= length) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  onPaste(e: { preventDefault: () => void; }) {
    e.preventDefault();
    return false;
  }


  validate(value: any) {

    console.log("init", this.validation);

    if (value) {

    }

    this.validation.push(value)

    console.log("push", this.validation);

    return {
      error: true,
      validations: ['required', 'only-number', 'only-aAzZ', 'no-special', 'email'],
      errorMessage: ""
    }

  }

  notOnlyNumber(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;
    if (val === null || val === '') return null;
    if (val.toString().match(/^[~!@#$%^&*0-9 ]*$/)) return { 'notOnlyNumber': true };
    return null;
  }

  specialChar(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;
    if (val === null || val === '') return null;
    if (val.toString().match(/^[~!@#$%^&*]*$/)) return { 'spacialChar': true };
    return null;
  }

  emptySpace(control: AbstractControl): { [key: string]: any } | null {
    let val = control.value;
    if (val === null || val === '') return null;
    if (val.toString().match(/^[ ]*$/)) return { 'emptySpace': true };
    return null;
  }

}
