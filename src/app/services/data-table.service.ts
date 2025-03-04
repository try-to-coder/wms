import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor() { }

  /**
   * Default is first column removed and buttons included
   * @param isRemoveFirst whether to remove or keep first column
   * @param isButtonVisible Set false for buttons, true for no buttons
   * @param fileName File name for excel
   */
  getDataTableOptions(isRemoveFirst?: boolean, isButtonVisible?: boolean, fileName?: string) {

    const isIncludeButtons = isButtonVisible ? isButtonVisible : false;
    const exportFileName = fileName ? fileName : 'Data Export';
    const removeFirstItem = (isRemoveFirst != null) ? isRemoveFirst : true;

    let isPdfLandscape = true;

    let returnOptions = {};

    const buttonCommon = {
      exportOptions: {
        format: {
          body: (data: any, row: any, column: any, node: any) => {

            if (column.length < 5) {
              isPdfLandscape = false;
            }

            // Strip $ from salary column to make it numeric
            return column === 0 ?
              data.replace(/[$,]/g, '') :
              data;
          }
        }
      }
    };

    if (isIncludeButtons) {

      returnOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        retrieve: true,
        destroy: true,
        processing: true,
        bAutoWidth: false,
        autoFill: true,
        order: [[removeFirstItem ? 1 : 0, 'asc']],
        columnDefs: [removeFirstItem ?
          {
            targets: [0],
            visible: false,
            orderable: false
          } : {
            targets: [0],
            visible: true,
            orderable: true
          }
        ],
        // 'dom': 'lfrtip',
        info: true,
        lengthMenu: [[10, 25, 50, -1], ['10 Records', '25 Records', '50 Records', 'Show all']],
        // "orderable":      false,
        language: {
          // set paginate buttons
          paginate: {
            previous: '<i class="fas fa-caret-left datatable-nav-icon"></i>',
            next: '<i class="fas fa-caret-right datatable-nav-icon"></i>',
            first: '<i class="fas fa-step-backward"></i>',
            last: '<i class="fas fa-step-forward"></i>',
          },
          // set copy button text
          buttons: {
            copyTitle: '',
            copyKeys: '',
            copySuccess: '',
            // copyTitle: 'This text Title Text',
            // copyKeys: 'Appuyez sur <i>ctrl</i> ou <i>\u2318</i> + <i>C</i> This text appears below.
            // <br><br>This text appears last below.',
            // copySuccess: {
            //     _: '%d lines Copied',
            //     1: '1 checked'
            // }
          }
        },
        oLanguage: {
          sLengthMenu: ' _MENU_ ',
          // sLengthMenu: 'Show _MENU_ Records',
          sInfo: 'Showing _START_ to _END_ of _TOTAL_ Records',
          // "sInfo": "Got a total of _TOTAL_ entries to show (_START_ to _END_)",
          sSearch: '',
          // "sSearch": "Apply filter _INPUT_ to table"
          searchPlaceholder: 'Search'
        },
        // Declare the use of the extension in the dom parameter
        // dom: 'Bfrtip',
        dom: 'lBfrtip',
        // Configure the buttons
        buttons: [
          {
            extend: 'collection',
            className: 'collection-tool-button',
            text: 'Export',
            autoClose: true,
            collectionLayout: 'filter-column-layout',
            buttons: [
              // 'excel',
              // 'print',
              // 'pdf',
              // 'csv',
              // 'copy',
              // 'colvis',
              // excel
              {
                extend: 'excelHtml5',
                // autoFilter: true,
                filename: exportFileName,
                title: '',
                exportOptions: {
                  columns: ':visible',
                  // format: {
                  //   body: function (data, row, column, node) {
                  //     if ($(node).is("input")) {
                  //       console.log(node);
                  //       return $(node).val();
                  //     }
                  //   }
                  // }
                }
              },
              //// 'print',
              {
                extend: 'print',
                header: true,
                // title:false,
                exportOptions: {
                  // messageTop : "Hai"
                  columns: ':visible'
                }
              },
              //// 'csv',
              {
                extend: 'csvHtml5',
                // autoFilter: true,
                filename: exportFileName,
                title: '',
                exportOptions: {
                  columns: ':visible'
                }
              },
              {
                extend: 'copy',
                header: true,
                // title:false,
                exportOptions: {
                  // messageTop : "Hai"
                  columns: ':visible'
                }
              },
              //// 'pdf',
              {
                extend: 'pdfHtml5',
                // autoFilter: true,
                filename: exportFileName,
                title: '',
                exportOptions: {
                  columns: ':visible'
                },
                orientation: isPdfLandscape ? 'landscape' : 'portrait',
                // pageSize: 'LEGAL'
              },
              ////// 'column visibility'
              {
                extend: 'colvis',
                text: 'Filter Columns',
                columns: ':not(.noVis)',
                // postfixButtons: ['colvisRestore'],
                // //// customized column name in visibility
                // columnText: function ( dt:any, idx:any, title:any) {
                //   console.log(dt, idx, title);
                //   return (idx+1)+ ': ' + title;
                // }
              }
            ]
          },
          // //// 'columnsToggle',
          // {
          //   extend: 'copy',
          //   header: true,
          //   // title:false,
          //   exportOptions: {
          //     // messageTop : "Hai"
          //     columns: ':visible'
          //   }
          // },
          // //// 'csv',
          // {
          //   extend: 'csvHtml5',
          //   // autoFilter: true,
          //   filename: exportFileName,
          //   title: '',
          //   exportOptions: {
          //     columns: ':visible'
          //   }
          // },
          // //// 'print',
          // {
          //   extend: 'excelHtml5',
          //   // autoFilter: true,
          //   filename: exportFileName,
          //   title: '',
          //   exportOptions: {
          //     columns: ':visible'
          //   }
          // },
          // //// 'pdf',
          // {
          //   extend: 'pdfHtml5',
          //   // autoFilter: true,
          //   filename: exportFileName,
          //   title: '',
          //   exportOptions: {
          //     columns: ':visible'
          //   },
          //   orientation: isPdfLandscape ? 'landscape' : 'portrait',
          //   // pageSize: 'LEGAL'
          // },
          // // 'pdf',
          // // {
          // //   extend: 'colvisGroup',
          // //   text: 'Office info',
          // //   show: '.office',
          // //   hide: '.hr'
          // // },
          // ////// 'column visibility'
          // {
          //   extend: 'colvis',
          //   text: 'Filter Columns',
          //   columns: ':not(.noVis)',
          //   // postfixButtons: ['colvisRestore'],
          //   // //// customized column name in visibility
          //   // columnText: function ( dt:any, idx:any, title:any) {
          //   //   console.log(dt, idx, title);
          //   //   return (idx+1)+ ': ' + title;
          //   // }
          // }

          // add new Button
          // {
          //   text: 'Some button',
          //   key: '1',
          //   action: function (e, dt, node, config) {
          //     alert('Button activated');
          //   }
          // }
        ],
        // oColVis: {
        //   buttonText: 'Change columns',
        //   bRestore: true,
        //   "sAlign": "left"
        // }
        // // Declare the use of the extension in the dom parameter
        // dom: 'Bfrtip',
        // // Configure the buttons
        // buttons: [
        //   //'columnsToggle',
        //   'colvis',
        //   'copy',
        //   'print',
        //   'excel',
        //   'pdf',
        //   // {
        //   //   text: 'Some button',
        //   //   key: '1',
        //   //   action: function (e, dt, node, config) {
        //   //     alert('Button activated');
        //   //   }
        //   // }
        // ],
      };
    } else {
      returnOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        bAutoWidth: false,
        autoFill: true,
        order: [[removeFirstItem ? 1 : 0, 'asc']],
        columnDefs: [removeFirstItem ?
          {
            targets: [0],
            visible: false,
            orderable: false
          } : {
            targets: [0],
            visible: true,
            orderable: true
          },
        ],
        lengthMenu: [[10, 25, 50, -1], ['10 Records', '25 Records', '50 Records', 'Show all']],
        // "orderable":      false,
        language: {
          //// set paginate buttons
          paginate: {
            previous: '<i class="fas fa-caret-left datatable-nav-icon"></i>',
            next: '<i class="fas fa-caret-right datatable-nav-icon"></i>',
            first: '<i class="fas fa-step-backward"></i>',
            last: '<i class="fas fa-step-forward"></i>',
          }
        },
        oLanguage: {
          sLengthMenu: ' _MENU_ ',
          // sLengthMenu: 'Show _MENU_ Records',
          sInfo: 'Showing _START_ to _END_ of _TOTAL_ Records',
          // "sInfo": "Got a total of _TOTAL_ entries to show (_START_ to _END_)",
          sSearch: '',
          // "sSearch": "Apply filter _INPUT_ to table"
          searchPlaceholder: 'Search'
        },
        // Declare the use of the extension in the dom parameter
        //// dom: 'Bfrtip',
        // ajax: {data:datalist},
        // columns: [{ data: 'Branch_Code' }, { data: 'Branch_Name' }, { data: 'TAX_UID_Number' }, {data:'CIN_Number'}],
        // rowCallback: (row: Node, data: any[] | Object, index: number) => {
        //   const self = this;
        //   // Unbind first in order to avoid any duplicate handler
        //   // (see https://github.com/l-lin/angular-datatables/issues/87)
        //   $('td', row).unbind('click');
        //   $('td', row).bind('click', () => {
        //     console.log("index : "+ JSON.stringify(row['_DT_RowIndex']));
        //     self.someClickHandler(data);
        //   });
        //   return row;
        // }
      };
    }
    return returnOptions;
  }
}
