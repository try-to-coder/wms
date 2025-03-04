import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax-configure',
  templateUrl: './tax-configure.component.html',
  styleUrls: ['./tax-configure.component.scss']
})
export class TaxConfigureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  taxmaster:Array<{name:string, tax:string}>=[
    {name:'GST',tax:'0'},{name:'CGST',tax:'6%'},
    {name:'SGST/UTGST',tax:'6%'},{name:'IGST',tax:'6%'},
   ]

   taxmaster2:Array<{name:string,tax:string}>=[
    {name:'IGST',tax:'6%'},{name:'CGST',tax:'6%'},
    {name:'SGST/UTGST',tax:'6%'},{name:'IGST',tax:'6%'},
   ]

}
