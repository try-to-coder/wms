import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { AlertService } from 'src/app/services/alert.service';
import { CredentialService } from 'src/app/services/credential.service';
import { LogService } from 'src/app/services/log.service';
import { PdfHelperService } from 'src/app/services/pdf-helper.service';
import { StockReceiveService } from 'src/app/services/transaction/stock-receive.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-stock-receive',
  templateUrl: './stock-receive.component.html',
  styleUrls: ['./stock-receive.component.scss']
})
export class StockReceiveComponent implements OnInit {
 iframe:any;
  stockReceiveNumber = '';
  stockReceiveDetail: any = {};
  image =''


  subscription: Subscription = new Subscription();

  employeeCode = '';
  organizationDetail: any = {};
  organizationImage = '';

  isAllProduct = false;

  docDefinition: any;

  constructor(private route: Router,
    private log: LogService,
    private credential: CredentialService,
    private utility: UtilityService,
    private pdfService: PdfHelperService,
    private alert: AlertService,
    private stockReceiveApi: StockReceiveService) {
    this.onPreInit()
  }

  onPreInit() {

  }

  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.stockReceiveNumber = localStorage.getItem('stock-receive-number') || '';
      if (this.stockReceiveNumber) {
        this.onPageReady();
      }
      else {
        this.route.navigateByUrl('/grn');
      }
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }

  onPageReady() {
    this.getUtilityDetail();
    this.getStockReceiveDetail();
    this.image = this.credential.getImage('Organization_Image')
  }

  getStockReceiveDetail() {
    this.subscription.add(
      this.stockReceiveApi.getStockReceive(this.stockReceiveNumber).subscribe({
        next: (response: any) => {
          this.log.log('Stock Receive Response : ', response);
          this.stockReceiveDetail = response || {};
        },
        error: (error: any) => { this.log.error(error, 'stock-receive', 'getStockReceiveDetail'); },
        complete: () => { }
      })
    );
  }

  onPrintBarcodeClick() {
    const stockDetail = this.utility.clone(this.stockReceiveDetail);
    this.pdfService.generateStockReceiveBarcode(stockDetail.Stock_Receive_Barcodes || []);
  }

  onPrintPDFClick() {

    
    const stockDetail = this.utility.clone(this.stockReceiveDetail);
    stockDetail.Organization_Name = this.organizationDetail.Organization_Name;
    console.log((  this.organizationDetail.Organization_Name,'lkjhg'))
    stockDetail.Organization_Image = this.credential.getImage('Organization_Image');

    // generate PDF
    this.pdfService.generateStockReceivePDF(stockDetail);
  }

  getUtilityDetail() {
    this.employeeCode = this.credential.getLoginCredentials('Employee_Code');

    const organization = this.credential.getLoginCredentials('Organization_Master');
    this.organizationDetail = this.utility.parseStringToJson(organization);

    // this.organizationDetail = this.credential.getLoginCredentials('Organization_Master');

  }

  navigateToList() {
    this.route.navigateByUrl('/grn');
  }

  navigateBack() {
    this.route.navigateByUrl('/grn');
  }
//          print       grn 

printNewPDF() {
  this.iframe = window.frames;
  this.iframe['receipt-printer-a4-iframe'].document.body.innerHTML = '';
  const printableContent = document.getElementById('delivery-challan-print-container')?.innerHTML;
  this.iframe['receipt-printer-a4-iframe'].document.body.innerHTML = printableContent;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.type = 'text/css';
  css.href = '../../../../assets/css/pdf-print.css';
  try {
    $('#receipt-printer-a4-iframe').contents().find('head link')?.remove();
  } catch (e) { }
  // this.log.log('head : ', window.frames['receipt-printer-a4-iframe'].document.head);
  this.iframe['receipt-printer-a4-iframe'].document.head.appendChild(css);
  this.printDCReceiptAsPDF();
}

printDCReceiptAsPDF() {
  const timeOut = setTimeout(() => {
    this.iframe['receipt-printer-a4-iframe'].focus();
    this.iframe['receipt-printer-a4-iframe'].print();
    //
    clearTimeout(timeOut);
  }, 500);
}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    localStorage.removeItem('stock-receive-number');
  }

}
