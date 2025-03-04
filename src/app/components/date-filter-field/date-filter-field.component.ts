import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Master } from 'src/app/constants/master';
import { LogService } from 'src/app/services/log.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-date-filter-field',
  templateUrl: './date-filter-field.component.html',
  styleUrls: ['./date-filter-field.component.scss']
})
export class DateFilterFieldComponent implements OnInit {
  /**
      * Model Object
      */
  private _dateModel: any;
  get dateModel(): any {
    return this._dateModel;
  }
  @Input() set dateModel(value: any) {
    this._dateModel = value;
    this.modelDateChange(value);
  }
  @Output() dateModelChange = new EventEmitter<any>();

  // private _label: string;
  // get label(): string {
  //   return this._label;
  // }
  // @Input() set label(value: string) {
  //   this._label = value;
  //   // this.dataChange(value);
  // }

  label = '';

  /**
   * i18 translate
   */
  // private _isTransform: boolean = true;
  // get isTransform(): boolean {
  //   return this._isTransform;
  // }
  // @Input() set isTransform(value: boolean) {
  //   this._isTransform = value;
  //   // this.dataChange(value);
  // }

  @Input() floatingLabel: boolean = false;
  @Input() hideLabel: boolean = false;
  @Input() isClear: boolean = true;

  isOptionOpened = false;

  dateList: any = [];
  dateFilterList: any = [];

  selectedObjectData: any = {};
  selectedText = '';

  selectedFromText = '';
  selectedToText = '';

  selectedLabel = '';


  dateRangeID = '7'; // for global use
  customDateObject: any = {
    id: this.dateRangeID, text: 'Custom Range',
    fromDate: '',
    toDate: ''
  }; // form date to date
  customDateValidate = false; // validate fields
  customDateInValid = false; // to date lower than from date

  constructor(private elementRef: ElementRef,
    private utility: UtilityService,
    private log: LogService) { }

  @HostListener('document:click', ['$event']) onClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOptionOpened = false;
    }
  }

  ngOnInit(): void {
    this.getDateDropdownList();
  }

  openOptionsList() {
    // this.log.log('this.selectedObjectData : ', this.selectedObjectData);

    // hide & show
    this.isOptionOpened = !this.isOptionOpened;

    // set selected date and active class for selected
    this.dateFilterList = this.utility.clone(this.dateList);
    if (this.selectedObjectData && this.selectedObjectData.id) {
      const selectedData = this.dateFilterList.find((obj: any) => (obj.id === this.selectedObjectData.id));
      if (selectedData) {
        selectedData.isSelected = true;
        if (selectedData.id === this.dateRangeID) {
          // this.selectedObjectData
          this.customDateObject.fromDate = this.selectedObjectData.fromDate;
          this.customDateObject.toDate = this.selectedObjectData.toDate;

          // this.log.log('selectedObjectData text : ', this.selectedObjectData.text);

          // focus custom range
          if (this.isOptionOpened) {
            this.focusCustomRange();
          }
        }
      }
    }

    // this.selectedObjectData

    // // set or reset custom object
    // if (this.selectedObjectData && (this.selectedObjectData.id === this.dateRangeID)) {
    //   this.customDateObject = this.utility.clone(this.selectedObjectData);
    // }
  }

  focusCustomRange() {
    this.log.log('focusCustomRange');
    setTimeout(() => {
      const container = $('#filter-date-ul-container');
      if (container) {
        container.animate({ scrollTop: container.prop("scrollHeight") }, 1000);
        // container.scrollTop(container.prop("scrollHeight"));
      }
    }, 200);
  }

  closeOptionList() {
    this.isOptionOpened = !this.isOptionOpened;
    this.customDateObject.fromDate = '';
    this.customDateObject.toDate = '';
  }

  optionSelected(data: any): void {
    const selectedObject = data || {};
    if (selectedObject.text) {
      selectedObject.isSelected = true;
      this.selectedLabel = selectedObject.displayText;
      if (selectedObject.id === '1' || selectedObject.id === '2') {
        this.selectedText = this.getDateViewFormate(selectedObject.fromDate);
        this.selectedFromText = this.getDateViewFormate(selectedObject.fromDate);
        this.selectedToText = '';
      }
      else {
        this.selectedText = this.getDateViewFormate(selectedObject.fromDate) + ' to ' + this.getDateViewFormate(selectedObject.toDate);
        this.selectedFromText = this.getDateViewFormate(selectedObject.fromDate);
        this.selectedToText = this.getDateViewFormate(selectedObject.toDate);
      }
      this.selectedObjectData = selectedObject;
      this.setDateInDateModel(); // for model
      this.closeOptionList();
    }
  }

  /**
   * when click custom in options to open date fields
   * param event used to prevent done button click
   * @param event 
   */
  customRangeClick(event: Event) {
    event.preventDefault();
    if ($(".custom-date-container").is(':visible')) {
      $('.date-field-option-list').slideDown();
      this.customDateObject.fromDate = '';
      this.customDateObject.toDate = '';
    }
    else {
      $('.date-field-option-list').slideUp();
      // set default Date
      this.customDateObject.fromDate = moment().subtract(6, 'days').format('YYYY-MM-DD');
      this.customDateObject.toDate = moment().format('YYYY-MM-DD');
    }
    $('.custom-date-container').slideToggle();
  }

  /**
   * 
   * @param event 
   */
  customDateCompleted(event: Event) {
    // event.stopPropagation();
    this.customDateValidate = false;
    this.customDateInValid = false;

    if (!this.customDateObject.fromDate || !this.customDateObject.toDate) {
      this.customDateValidate = true;
    }
    else {
      const differDays = moment(this.customDateObject.toDate).diff(moment(this.customDateObject.fromDate), 'days');
      // invalid date
      if (differDays < 0) {
        this.customDateInValid = true;
      }
      else {
        this.selectedText = this.getDateViewFormate(this.customDateObject.fromDate) + ' to ' + this.getDateViewFormate(this.customDateObject.toDate);
        this.selectedFromText = this.getDateViewFormate(this.customDateObject.fromDate);
        this.selectedToText = this.getDateViewFormate(this.customDateObject.toDate);
        this.selectedLabel = this.customDateObject.displayText;
        this.customDateObject.isSelected = true; // for active class
        this.selectedObjectData = this.utility.clone(this.customDateObject);

        this.setDateInDateModel(); // for model

        // close options
        this.isOptionOpened = !this.isOptionOpened;
        this.customDateObject.fromDate = '';
        this.customDateObject.toDate = '';
      }
    }
  }

  customDateCancel(event: Event) {
    // event.stopPropagation();
    $(".custom-date-container").slideUp();
    $('.date-field-option-list').slideDown();
  }

  resetCustomObject() {
    this.selectedObjectData = {};
    this.selectedText = '';
    this.selectedFromText = '';
    this.selectedToText = '';
    this.selectedLabel = '';
  }

  /**
   * trigger when clear button
   */
  clearDateField(): void {
    // clear
    this.selectedText = '';
    this.selectedFromText = '';
    this.selectedToText = '';
    this.selectedLabel = '';
    this.selectedObjectData = {};
    this.customDateObject.fromDate = '';
    this.customDateObject.toDate = '';

    // reset
    const modelObject = { fromDate: '', toDate: '', text: '' };
    this.dateModel = modelObject;

    // 
    this.dateModelChange.emit(modelObject);
  }

  setDateInDateModel(): void {
    this.log.log('selectedObjectData : ', this.selectedObjectData);
    const modelObject = { fromDate: '', toDate: '', text: '' };
    if (this.selectedObjectData) {
      modelObject.fromDate = this.selectedObjectData.fromDate;
      modelObject.toDate = this.selectedObjectData.toDate;
      modelObject.text = this.selectedObjectData.text;
    }
    this.dateModel = modelObject;

    // 
    this.dateModelChange.emit(modelObject);
  }

  /**
   * 
   */
  modelDateChange(dateObject: any): void {
    // this.log.log('modelDateChange : ', dateObject);
    const modelDate = dateObject || {};
    if (this.selectedObjectData && this.selectedObjectData.id) {
      // this.log.log('inside clear');
    }
    else {
      // this.selectedText = '';
      // this.selectedLabel = '';
      // this.selectedObjectData = {};
      // this.customDateObject.fromDate = '';
      // this.customDateObject.toDate = '';
      if (modelDate.fromDate && modelDate.toDate) {

        this.selectedText = this.getDateViewFormate(modelDate.fromDate) + ' to ' + this.getDateViewFormate(modelDate.toDate);
        this.selectedFromText = this.getDateViewFormate(modelDate.fromDate);
        this.selectedToText = this.getDateViewFormate(modelDate.toDate);
        if (modelDate.fromDate === modelDate.toDate) {
          this.selectedToText = '';
        }
        this.selectedLabel = modelDate.displayText || '';
        this.label = 'Date';
      }
    }

    // this.dateModelChange.emit(dateObject);
  }


  // manualCheckedChange(isManual: boolean) {
  //   this.log.log('isManual : ' + isManual);
  // }

  getDateDropdownList() {
    const currentDate = moment().format('YYYY-MM-DD');
    this.dateList = [
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
      },
      {
        id: this.dateRangeID, text: 'Custom Range',
        displayText: Master.dateOptionDisplay.customRange,
        fromDate: '',
        toDate: ''
      }
      // {
      //   id: '7', text: 'This Quarter',
      //   fromDate: moment().startOf('quarter').format('YYYY-MM-DD'),
      //   toDate: moment().endOf('quarter').format('YYYY-MM-DD')
      // },
      // {
      //   id: '8', text: 'Last Quarter',
      //   fromDate: moment().subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD'),
      //   toDate: moment().subtract(1, 'quarter').endOf('quarter').format('YYYY-MM-DD')
      // },
      // {
      //   id: '9', text: 'Custom Range',
      //   fromDate: this.chartFilterObject.From_Date,
      //   toDate: this.chartFilterObject.To_Date
      // },
      // {
      //   id: '9', text: 'Last Three Month',
      //   fromData: moment().subtract(3, 'month').startOf('month').format('YYYY-MM-DD'),
      //   toDate: moment().subtract(3, 'month').endOf('month').format('YYYY-MM-DD')
      // },
    ]
    // this.log.log(' : dateList : ', this.dateFilterList);
  }

  getDateViewFormate(date: string) {
    return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
  }

}

