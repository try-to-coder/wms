import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSanitizerService {
  public alterTextSQuotes = '\\\'';
  public alterTextSlash = '\\\\';

  constructor() { }

  /**\
   * formate is present normal
   */
   removeInvalidData(dataObject: any) {

    const receiveObject = dataObject ? dataObject : {};

    Object.keys(receiveObject).forEach(key => {

      if (key !== '' && receiveObject[key]) {
        if (typeof receiveObject[key] === 'string') {
          let newValue = receiveObject[key].replace(/\\/g, this.alterTextSlash); // patterns
          newValue = newValue.replace(/'/g, this.alterTextSQuotes);
          receiveObject[key] = newValue;
        } else if (typeof receiveObject[key] === 'number') {
          let newValue = receiveObject[key].toString().replace(/\\/g, this.alterTextSlash); // patterns
          newValue = newValue.replace(/'/g, this.alterTextSQuotes);
          receiveObject[key] = newValue;
        } else if (typeof receiveObject[key] === 'object') {
          // is Array
          if (Array.isArray(receiveObject[key])) {
            const objectArray = this.removeDataInArray(receiveObject[key]);
            receiveObject[key] = objectArray;
          } else {
            // It is array
            const objectArray = this.removeDataInObject(receiveObject[key]);
            receiveObject[key] = objectArray;
          }
        }
      }
    });
    return receiveObject;
  }

  removeDataInObject(jObject: any) {
    const newData = jObject ? jObject : {};

    Object.keys(newData).forEach(key => {

      if (key !== '') {
        if (typeof newData[key] === 'string') {
          let newValue = newData[key].replace(/\\/g, this.alterTextSlash); //// patterns
          newValue = newValue.replace(/'/g, this.alterTextSQuotes);
          newData[key] = newValue;
        } else if (typeof newData[key] === 'number') {
          let newValue = newData[key].toString().replace(/\\/g, this.alterTextSlash); //// patterns
          newValue = newValue.replace(/'/g, this.alterTextSQuotes);
          newData[key] = newValue;
        }
      }
    });
    return newData;
  }

  removeDataInArray(jArray: any) {
    const newData = jArray ? jArray : [];
    if (newData.length) {
      newData.forEach((element:any) => {
        // check whether is string or object
        if (typeof element === 'string') {
          let newValue = element.replace(/\\/g, this.alterTextSlash); //// patterns
          newValue = newValue.replace(/'/g, this.alterTextSQuotes);
          element = newValue;
        }
        else {
          Object.keys(element).forEach(key => {
            if (key !== '') {
              if (typeof element[key] === 'string') {
                let newValue = element[key].replace(/\\/g, this.alterTextSlash); //// patterns
                newValue = newValue.replace(/'/g, this.alterTextSQuotes);
                element[key] = newValue;
              } else if (typeof element[key] === 'number') {
                let newValue = element[key].toString().replace(/\\/g, this.alterTextSlash); //// patterns
                newValue = newValue.replace(/'/g, this.alterTextSQuotes);
                element[key] = newValue;
              }
            }
          });
        }
      });
    }
    return newData;
  }
}
