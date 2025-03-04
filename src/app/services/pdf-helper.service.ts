import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LogService } from './log.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfHelperService {

  constructor(private log: LogService) { }

  generateStockReceivePDF(stockDetail: any) {
    const pdfDocumentation: any = this.getPDFContent(stockDetail);
    this.log.log('pdf documentation : ', pdfDocumentation);
    pdfMake.createPdf(pdfDocumentation).print();
  }

  getPDFContent(stockDetail: any) {

    const stockDetailObject = stockDetail || {};

    const stockProducts = stockDetail?.Stock_Receive_Products || [];

    const image: any = stockDetailObject.Organization_Image || '';
    this.log.log('image : ', image);
    const docDefinition = {

      // set up
      pageSize: 'A4',
      pageMargins: [20, 40, 20, 90],

      // header
      header: (currentPage: any, pageCount: any, pageSize: any) => {
        return [
          { text: 'Receive Note', alignment: (currentPage % 2) ? 'center' : 'center', style: "mainHeader" },
          { canvas: [{ type: 'rect', x: 0, y: 52, w: pageSize.width - 170, h: 150 }] }
        ]
      },

      // body
      content: [
        {
          table: {
            widths: ['*', '*'],
            body: [
              // first row
              [
                // column 1
                {
                  type: 'none',
                  style: { lineHeight: 1.2 },
                  ul: this.getWarehouseAddress(stockDetailObject),
                },
                // column 2
                this.getOrganizationImage(image)
              ],
              // second row
              [
                // column 1
                {
                  table: {
                    widths: ['*', 5, '*'],
                    style: { alignment: 'left' },
                    body: [
                      [
                        {
                          type: 'none', style: { lineHeight: 1.2 }, ul: [
                            'Receive Number',
                            'Receive Date',
                            'Reference Number',
                            'Reference Date',
                            'Receive Status'
                          ]
                        },
                        {
                          type: 'none', style: { lineHeight: 1.2 },
                          ul: [':', ':', ':', ':', ':',]
                        },
                        {
                          type: 'none', style: { lineHeight: 1.2 },
                          ul: [
                            { text: stockDetailObject.Stock_Receive_Number, style: { bold: true } },
                            { text: stockDetailObject.Stock_Receive_Date, style: { bold: true } },
                            stockDetailObject.Reference_Number || '-',
                            stockDetailObject.Reference_Date || '-',
                            stockDetailObject.Stock_Receive_Status || '-'
                          ]
                        }
                      ]
                    ]
                  },
                  layout: this.getLayoutBorder(true)
                },
                // column 2
                { text: '' }
              ]
            ]
          },
          layout: this.getLayoutBorder()
        },
        {
          headerRows: 1,
          table: {
            // widths: [],
            body: this.getProductTable(stockProducts)
          },
          style: 'walkin',
          layout: this.getLayoutBorder(),
        },
      ],

      // footer
      footer: (currentPage: any, pageCount: any, pageSize: any) => {
        return [{
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  type: 'none', ul: [{ text: 'Terms and Conditions:', style: { bold: true } }, { text: 'No Return' }],
                  colSpan: 2,
                  style: { alignment: 'left' }
                }, ''
              ],
              [
                { text: 'Customer Seal and Signature' },
                {
                  type: 'none',
                  ul: [{ text: 'For Chennai Branch', style: { bold: true } }, { text: '.' }, { text: 'Autorized Signature' }],
                  style: 'header2',
                }
              ]
            ],
          },
          style: 'footer',
          layout: this.getLayoutBorder()
        }]
      },

      // styles
      styles: this.getPDFStyles()
    }

    return docDefinition;
  }

  getWarehouseAddress(stockDetail: any) {
    return [
      {
        text: stockDetail.Organization_Name, style: 'title'
      },
      (stockDetail.Warehouse_Code || '') + ' - ' + (stockDetail.Warehouse_Name || ''),
      stockDetail.Warehouse_Address || '',
    ]
  }

  getOrganizationImage(image: string) {
    const orgImage = image || '';

    if (orgImage) {
      return { image: orgImage, height: 100, alignment: 'right' }
    }

    return { text: '' };
  }

  getProductTable(products: any[]): any[] {

    const stockProducts = products || [];
    const valueList = [];

    if (stockProducts?.length) {
      valueList.push([
        { text: 'S.No', style: 'header' },
        { text: 'Item Description', style: 'header' },
        { text: 'Part Number', style: 'header' },
        { text: 'HSN Code', style: 'header' },
        { text: 'Quantity', style: 'header' }
      ]);

      stockProducts.forEach((product: any, i: number) => {
        valueList.push([
          i + 1,
          (product.Material_Code || '') + ' ' + (product.Material_Name || ''),
          product.Part_Number || '-',
          product.HSN_Code || '-',
          product.Quantity || '0',
        ]);
      });
    }

    return valueList;
  }

  getProducts(stockProducts: any[]) {
    const products = stockProducts || [];
    return [
      [
        { text: 'S.No', style: 'header' },
        { text: 'Item Description', style: 'header' },
        { text: 'Base Price', style: 'header' },
        { text: 'Product Discount', style: 'header' },
        { text: 'unit Price', style: 'header' },
        { text: 'Tax Amount', style: 'header' },
        { text: 'Sell Price', style: 'header' },
        { text: 'QTY', style: 'header' },
        { text: 'Total', style: 'header' }
      ],
      []
    ];
  }

  getLayoutBorder(noLine = false): any {

    if (noLine) {
      return {
        hLineWidth: () => { return 0 },
        vLineWidth: () => { return 0 },
        hLineColor: () => { return 'none' },
        vLineColor: () => { return 'none' }
      }
    }

    return {
      hLineWidth: function (i: any, node: any) {
        return (i === 0 || i === node.table.body.length) ? 2 : 2;
      },
      vLineWidth: function (i: any, node: any) {
        return (i === 0 || i === node.table.widths.length) ? 2 : 0;
      },
      hLineColor: function (i: any, node: any) {
        return (i === 0 || i === node.table.body.length) ? 'gray' : 'none';
      },
      vLineColor: function (i: any, node: any) {
        return (i === 0 || i === node.table.widths.length) ? 'gray' : 'none';
      }
    }
  }

  getPDFStyles(): any {
    return {
      walkin: {
        margin: [0, 10, 0, 0]
      },
      leftHeader: {
        fontSize: 20,
        bold: true,
        alignment: 'left'
      },

      headertitle1: {
        alignment: 'left',
        bold: true
      },
      headertitle2: {
        alignment: 'right',
        bold: true
      },
      header1: {
        alignment: 'left'
      },
      header2: {
        alignment: 'right'
      },
      content: {
        margin: [0, 10, 0, 0],
        alignment: 'center'
      },


      // address: {
      //   fontSize: 15,
      //   lineHeight: 1,
      // },
      mainHeader: {
        fontSize: 20,
        bold: true,
        margin: [0, 10, 0, 0]
      },
      title: {
        fontSize: 18,
        bold: true,
      },
      tableHeader: {
        bold: true,
        alignment: 'center'
      },
      footer: {
        margin: [20, 0, 20, 0],
        alignment: 'center'
      }
    }
  }

  generateStockReceiveBarcode(barCodes: any[]) {
    const barcodeList = barCodes || [];

    const pdfDocumentation: any = this.getBarcodeContent(barcodeList);
    this.log.log('barcode documentation : ', pdfDocumentation);
    pdfMake.createPdf(pdfDocumentation).print();
  }

  getBarcodeContent(barCodes: any[]) {

    const barcodeList = barCodes || [];

    const barcodeListContent: any[] = [];

    barcodeList.forEach(obj => {
      barcodeListContent.push({ qr: obj.Barcode, fit: '80', style: { alignment: 'center' } });
      barcodeListContent.push({ text: obj.Barcode, style: { fontSize: 10, alignment: 'center' }, margin: [0, 5, 0, 20] });
    });

    const docDefinition = {
      pageSize: {
        width: 204, // 3 inch
        height: 'auto'
      },
      content: barcodeListContent,
      // pageOrientation: 'portrait',
      // set up
      // pageSize: 'A4',
      pageMargins: [5, 5, 5, 5],
    }
    return docDefinition;

  }

}
