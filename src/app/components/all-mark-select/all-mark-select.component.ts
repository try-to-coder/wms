import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-all-mark-select',
  templateUrl: './all-mark-select.component.html',
  styleUrls: ['./all-mark-select.component.scss']
})
export class AllMarkSelectComponent implements OnInit {
// @Input() data: any[]; // received array data
  // @Output() dataChange = new EventEmitter<[any]>();

  // option list data
  private _data: any[] = [];
  get data(): any[] {
    return this._data;
  }
  @Input() set data(value: any[]) {
    this._data = value;
    this.dataChange(value);
  }

  // model for element
  private _allMarkModel = '';
  get allMarkModel(): string {
    return this._allMarkModel;
  }
  @Input() set allMarkModel(value: string) {
    this._allMarkModel = value;
    this.selectorChange(value);
  }

  // @Input() allMarkModel: string; // ngModel for parent
  @Output() allMarkModelChange = new EventEmitter<string>();

  // validation
  private _required = '';
  get required(): string {
    return this._required;
  }
  @Input() set required(value: string) {
    this._required = value;
  }

  // readonly 
  @Input() disabled: boolean = false; // ngModel for parent
  @Output() disabledChange = new EventEmitter<boolean>();

  // clear option
  @Input() isClear: boolean = true; // ngModel for parent

  isClearShow: boolean = true;

  // placeholder
  @Input() placeholder: string = '';

  // private _isClear: boolean = true;
  // get isClear(): boolean {
  //   return this._isClear;
  // }
  // @Input() set isClear(value: boolean) {
  //   this._isClear = value;
  // }


  private _searchable: boolean = true;
  get searchable(): boolean {
    return this._searchable;
  }
  @Input() set searchable(value: boolean) {
    this._searchable = value;
  }

  @Input() isMandatory: boolean = false;


  // in future we receive id column and text column of json array
  @Input() dataField = '';
  @Input() textField = '';

  isOptionOpened = false;
  selectOptionList: any = []; // default received list
  optionFilterList: any = []; // filtered list

  isMouseHover = false;

  searchFieldFocus: boolean = false; // set focus search field

  //// remove later
  selectedText = '';
  selectedItem = '';
  searchText = '';

  // private _selectedText: string;
  // get selectedText(): string {
  //   return this._selectedText;
  // }
  // set selectedText(value: string) {
  //   this._selectedText = value;
  //   this.selectorTextChange(value);
  // }



  constructor(public elementRef: ElementRef, public renderer: Renderer2,
    public utility: UtilityService,
    private cd: ChangeDetectorRef) {
    // console.log('sll select component call');
  }

  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if(this.elementRef.nativeElement.contains(event.target)) {
  //     console.log("clicked inside");
  //    } else {
  //     this.isOptionOpened = false;
  //    }
  // }
  @HostListener('document:click', ['$event']) onClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOptionOpened = false;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // if (this.searchable === undefined) {
    //   this.searchable = true;
    // }

    // this.basicInitialization();
    // before generate element here
    // this.domCtrl.write(() => {
    //   // this.header = this.renderer.createElement('div');
    //   // this.renderer.insertBefore(this.element.nativeElement, this.header, this.element.nativeElement.firstChild);
    // });
  }

  basicInitialization() {
    this.selectOptionList = this.data ? this.data : [];
    // console.log('component dropdown array List : ', this.selectOptionList);
    this.optionFilterList = this.utility.clone(this.selectOptionList);
    // console.log('isClear : ', this.isClear);

    // if (typeof this.isClear === "string") {
    //   this.isClear = Boolean(this.isClear);

    //   console.log('type : ',this.isClear, typeof this.isClear);
    // }

    this.isClearShow = this.isClear;
    this.setDefaultSelected();
  }

  setDefaultSelected() {
    if (this.optionFilterList.length && this.allMarkModel) {
      const dataIndex = this.optionFilterList.findIndex((obj:any) => obj.id === this.allMarkModel);
      const currentData = ((dataIndex !== -1) && (dataIndex < this.optionFilterList.length))
        ? this.optionFilterList[dataIndex] : null;
      if (currentData) {
        // this.optionFilterList[dataIndex].isSelected = true;
        this.selectedText = currentData.text;
        // setTimeout(() => {
        //   this.selectedText = currentData.text;
        //   console.log('this.selectedText', this.selectedText);
        // }, 0);
      }
      else {
        // list doesn't have value ? clear value
        this.clearSelectOption();
      }
    }
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (let property in changes) {
  //     if (property === 'allMarkModel') {
  //       console.log('this.dataField', this.dataField);
  //       console.log('Previous:', changes[property].previousValue);
  //       console.log('Current:', changes[property].currentValue);
  //       console.log('firstChange:', changes[property].firstChange);
  //     }
  //   }
  // }

  selectorChange(data: string) {
    // console.log('selectorChange', this.allMarkModel);
    if (data) {
      this.basicInitialization();
    } else {
      this.selectedText = '';
    }
  }

  dataChange(data: any[]) {
    // console.log('dataChange', this.data);
    this.basicInitialization();
  }

  // selectorTextChange(data: string) {
  //   console.log('text change : ', data);
  // }

  // modelDataChange(data?: any) {
  //   console.log('change');
  // }

  // ngOnChanges() {
  //   if (this.allMarkModel) {
  //     console.log('ngOnChanges', this.allMarkModel);
  //   }
  // }

  // search field filter
  searchItem(data: any, event: any) {
    // up down arrow key press
    if (event.keyCode === 40 || event.keyCode === 38) {
      return;
    }
    // when text field empty
    const optionLengthList = this.optionFilterList; // filter before list

    if (!data && optionLengthList.length === this.selectOptionList.length) {
      //
    }
    else {
      this.optionFilterList = this.filterItems(this.selectOptionList, data, 'text');
      if (this.optionFilterList.length) {
        this.removeActiveClass();
        this.optionFilterList[0].isActive = true;
      }
    }
    if (this.optionFilterList.length) {
      if ((event.key === 'Enter') || (event.keyCode === 13)) {
        const dataIndex = this.optionFilterList.findIndex((obj:any) => obj.isActive === true);
        if ((dataIndex !== -1) && (dataIndex < this.optionFilterList.length)) {
          this.optionSelected(this.optionFilterList[dataIndex]);
        }
      }
    }
  }

  // filter option
  filterItems(items: any[], searchText: string, column: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it[column] ? it[column].toLowerCase().includes(searchText) : null;
    });
  }

  optionSelected(data: any) {
    const selectedObject = data ? data : null;
    if (selectedObject) {
      this.selectedText = selectedObject.text ? selectedObject.text : '';
      this.allMarkModel = selectedObject.id ? selectedObject.id : '';
      this.allMarkModelChange.emit(this.allMarkModel); // for parent access;
      this.openOptionList();
    }
  }



  // open and close select option
  openOptionList() {
    this.optionFilterList = this.utility.clone(this.selectOptionList);
    this.isOptionOpened = !this.isOptionOpened;
    this.searchText = '';
    this.searchFieldFocus = !this.searchFieldFocus;
    //after open add class active
    if (this.isOptionOpened) {
      this.addIsSelected(this.allMarkModel);
    }
  }

  // call only when option open
  addIsSelected(data: string) {
    if (this.allMarkModel && this.optionFilterList.length) {
      const dataIndex = this.optionFilterList.findIndex((obj:any) => obj.id === this.allMarkModel);
      if ((dataIndex !== -1) && (dataIndex < this.optionFilterList.length)) {
        // setTimeout(() => { 
        this.optionFilterList[dataIndex].isSelected = true;
        // }, 10);
        this.removeActiveClass();
        this.optionFilterList[dataIndex].isActive = true;
        // show selected option as default
        setTimeout(() => {
          if (dataIndex && $('ul.select-list li').length > 3 && $('ul.select-list li').length > dataIndex) {
            const scrollPosition = $('li:nth-child(' + dataIndex + ')').position().top - $('li:nth-child(4)').position().top;
            $('.select-search-container').animate({ scrollTop: scrollPosition });
          }
        }, 100);
      }
    }

    if (this.optionFilterList.length) {
      if (!this.allMarkModel) { // active first option when no option selected
        this.removeActiveClass();
        this.optionFilterList[0].isActive = true;
      }
    }
  }

  clearSelectOption() {
    this.allMarkModel = '';
    this.selectedText = '';
    this.allMarkModelChange.emit(this.allMarkModel); // for parent access;
  }

  addActiveClass(index: number) {
    if (this.optionFilterList.length > index) {
      this.removeActiveClass();
      if (this.optionFilterList.length > 3) {
        // setTimeout(() => {
        if (index) {
          if ($('ul.select-list li').length > 3) {
            const scrollPosition = $('ul.select-list li:nth-child(' + index + ')').position().top - $('ul.select-list li:nth-child(4)').position().top;
            $('.select-search-container').animate({ scrollTop: scrollPosition });
          }
        }
        else {
          if ($('ul.select-list li').length > 3) {
            const scrollPosition = $('ul.select-list li:first-child').position().top - $('ul.select-list li:nth-child(4)').position().top;
            $('.select-search-container').animate({ scrollTop: scrollPosition });
          }
        }
        this.optionFilterList[index].isActive = true;
        // }, 0);
      }
      else {
        // setTimeout(() => this.optionFilterList[index].isActive = true, 0);
        this.optionFilterList[index].isActive = true;
      }

      // if (index === 0) {
      //   console.log('index : 0');
      //   if (this.optionFilterList.length > 3) {
      //     setTimeout(() => {
      //       try {
      //         const scrollPosition = $('li:first-child').position().top - $('li:nth-child(4)').position().top;
      //         $('.select-search-container').animate({ scrollTop: scrollPosition });
      //       }
      //       catch (error) {
      //         console.log('error : ', error);
      //       }
      //       this.optionFilterList[index].isActive = true;
      //     }, 0);
      //   }
      //   else {
      //     setTimeout(() => this.optionFilterList[index].isActive = true, 0);
      //   }
      // } else {
      //   console.log('index : ' + index + 'length : ' + this.optionFilterList.length);
      //   if (this.optionFilterList.length > 3) {
      //     setTimeout(() => {
      //       try {
      //         const scrollPosition = $('li:nth-child(' + index + ')').position().top - $('li:nth-child(4)').position().top;
      //         $('.select-search-container').animate({ scrollTop: scrollPosition });
      //       }
      //       catch (error) {
      //         console.log('error : ', error);
      //       }
      //       this.optionFilterList[index].isActive = true;
      //     }, 0);
      //   }
      //   else {
      //     setTimeout(() => this.optionFilterList[index].isActive = true, 0);
      //   }
      // }
      // setTimeout(() =>  $('ul.select-list li a').removeClass('active'), 1);
    }
  }

  removeActiveClass() {
    this.optionFilterList.forEach((element:any) => {
      if (element.isActive) {
        element.isActive = false;
      }
    });
  }

  getCurrentIndex() {
    for (let i = 0; i < this.optionFilterList.length; i++) {
      const currentOption = this.optionFilterList[i];
      if (currentOption.isSelected) {
        this.addActiveClass(i);
        break;
      }
    }
  }

  // Enter key press open option list
  keyEnterSelect(event: any) {
    if (event.keyCode === 13 || event.Key === 'Enter') {
      // console.log('Enter Event');
      this.openOptionList();
    }
  }

  // Down and Up arrow navigate option list
  onKeyUp(event: any) {
    const keyCode = event.keyCode;
    if (this.isOptionOpened && this.optionFilterList.length && (keyCode === 38 || keyCode === 40)) {
      this.isMouseHover = false;
      // get default selected index
      let currentIndex = 0;
      for (let i = 0; i < this.optionFilterList.length; i++) {
        const currentOption = this.optionFilterList[i];
        if (currentOption.isActive == true) {
          currentIndex = i;
          break;
        }
      }
      if (keyCode === 38) { /// key up
        if (currentIndex != 0) {
          this.addActiveClass(currentIndex - 1);
        }
      }
      else if (keyCode === 40) { // key down
        this.addActiveClass(currentIndex + 1);
      }
    }
  }

  onMouseEnter() {
    this.isMouseHover = true;
  }
  onMouseLeave() {
    this.isMouseHover = false;
  }

  optionMouseEnter(data: any) {
    // console.log('optionMouseEnter');
    // if (this.isMouseHover) {
    this.removeActiveClass();
    data.isActive = true;
    // }
  }

  optionMouseLeave(data: any) {
    // console.log('optionMouseLeave');
    // if (this.isMouseHover) {
    this.removeActiveClass();
    data.isActive = false;
    // }
  }

  // isClearVisible(): boolean {
  //   let boolean = true;
  //   console.log('===============:', typeof this.isClear, this.isClear, (this.disabled || false), (this.selectedText?.length > 1));

  //   return true;
  // }

}


