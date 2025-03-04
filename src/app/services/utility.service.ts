import { Injectable } from '@angular/core';
import { Master } from '../constants/master';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  clone(obj: any): any {
    let copy: any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' !== typeof obj) { return obj; }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) { copy[attr] = this.clone(obj[attr]); }
      }
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  }

  getDBDateFormate(date: string) {
    console.log('date : ', date);
    return date?.split('-').reverse().join('-');
  }

  getSelectOptions(dataObject: Array<any>, idKey: string, idValue: string, idValue2?: string): any[] {

    const optionList = dataObject ? dataObject : [];
    const keyID = idKey ? idKey : '';
    const keyText = idValue ? idValue : '';
    const additionalText = idValue2 ? idValue2 : '';

    const returnList: any[] = [];
    if (optionList && optionList.length && keyID && keyText) {
      optionList.forEach(element => {
        if (element[keyID] && element[keyText]) {
          let tempObject: any;
          if (additionalText) {
            tempObject = {
              id: element[keyID],
              text: element[keyText] + ' (' + element[additionalText] + ') '
            };
          } else {
            tempObject = {
              id: element[keyID],
              text: element[keyText]
            };
          }
          returnList.push(tempObject);
        }
      });
    }

    return returnList;

  }

  getDateList(text?: string): any {
    const currentDate = moment().format('YYYY-MM-DD');
    const dateList = [
      {
        id: '1', text: Master.dateOption.today,
        displayText: Master.dateOptionDisplay.today,
        fromDate: currentDate,
        toDate: currentDate
      },
      {
        id: '2', text: Master.dateOption.yesterday,
        displayText: Master.dateOptionDisplay.yesterday,
        fromDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        toDate: moment().subtract(1, 'days').format('YYYY-MM-DD')
      },
      {
        id: '3', text: Master.dateOption.thisWeek,
        displayText: Master.dateOptionDisplay.thisWeek,
        fromDate: moment().startOf('isoWeek').format('YYYY-MM-DD'),
        toDate: moment().endOf('isoWeek').format('YYYY-MM-DD'),
      },
      {
        id: '4', text: Master.dateOption.thisMonth,
        displayText: Master.dateOptionDisplay.thisMonth,
        fromDate: moment().startOf('month').format('YYYY-MM-DD'),
        toDate: moment().endOf('month').format('YYYY-MM-DD')
      },
      {
        id: '5', text: Master.dateOption.last30Days,
        displayText: Master.dateOptionDisplay.last30Days,
        fromDate: moment().subtract(29, 'days').format('YYYY-MM-DD'),
        toDate: currentDate
      },
      {
        id: '6', text: Master.dateOption.lastMonth,
        displayText: Master.dateOptionDisplay.lastMonth,
        fromDate: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
        toDate: moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      }
    ];

    if (text) {
      const selectedDate = dateList.find((obj: any) => (obj.text === text));
      if (selectedDate) {
        return selectedDate;
      }
    }
    else {
      return dateList;
    }
  }

  parseStringToJson(data: string, isArray?: boolean): any {
    let jsonObject = isArray ? [] : {};
    if (!data) {
      // console.log('data : ', data);
      return jsonObject;
    }

    try {
      jsonObject = JSON.parse(data || (isArray ? '[]' : '{}'));
    } catch (e) {
      // for only urban piper response
      let dateString = data.replace('"{', '{');
      const newDataString = dateString?.toString().replace('}"', '}');
      const parsedJSON = JSON.parse(newDataString);
      if (parsedJSON) {
        if (parsedJSON.message && typeof parsedJSON.message === 'object') {
          parsedJSON.message = JSON.stringify(parsedJSON.message);
        }
        jsonObject = parsedJSON;
      }
    }
    finally {
      return jsonObject;
    }
    return jsonObject;
  }

  isValidEmail(email: string) {
    const mail = email.trim();
    let isValid = false;
    // tslint:disable-next-line: max-line-length
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    isValid = regexp.test(mail);
    return isValid;
  }

  setDateFromLocal(key: string, dateObject: any) {
    // const text = dateObject.text || '';
    // if (text && text != 'Custom Range') {
    //   localStorage.setItem(key, text);
    // }
    // else {
    //   localStorage.setItem(key, JSON.stringify(dateObject));
    // }
    localStorage.setItem(key, JSON.stringify(dateObject));
  }

  getDateFromLocal(key: string, elseToday?: boolean) {
    const data = localStorage.getItem(key);
    let selectedKey = '';
    if (data && (data != 'null')) {
      const dateObject = this.parseStringToJson(data);
      selectedKey = dateObject.text || '';
      if (selectedKey) {
        if (selectedKey === 'Custom Range') {
          if (typeof dateObject === 'object' && dateObject["fromDate"]) {
            return dateObject;
          }
          else {
            selectedKey = '';
          }
        }
        const currentObject: any = this.getDateList(selectedKey);
        if (typeof currentObject === 'object' && currentObject["fromDate"]) {
          return currentObject;
        } else {
          selectedKey = '';
        }
      }
    }

    if (!selectedKey) {
      if (elseToday) {
        return this.getDateList(Master.dateOption.today);
      }
      else {
        return this.getDateList(Master.dateOption.thisWeek);
      }
    }
  }

}
