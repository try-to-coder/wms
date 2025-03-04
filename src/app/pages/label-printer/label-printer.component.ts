import { KeyValue } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Master } from 'src/app/constants/master';
import { IConnectionType } from 'src/app/interfaces/label-printer/connection-type';
import { ILabelSize } from 'src/app/interfaces/label-printer/label-size';
import { ITemplate } from 'src/app/interfaces/label-printer/template';
import { CredentialService } from 'src/app/services/credential.service';
import { DataTableService } from 'src/app/services/data-table.service';
import { LogService } from 'src/app/services/log.service';
import { ConnectionService } from 'src/app/services/master/label-printer/connection.service';
import { LabelSizeService } from 'src/app/services/master/label-printer/label-size.service';
import { TemplateService } from 'src/app/services/master/label-printer/template.service';

@Component({
  selector: 'app-label-printer',
  templateUrl: './label-printer.component.html',
  styleUrls: ['./label-printer.component.scss']
})
export class LabelPrinterComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<void> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  addLabelSizeButton = true;
  UpdateLabelSizeButoon = false;
  addTemplateButoon = true;
  UpdateTemplateButton = false;
  tablelist: any[] = [];
  LabelColName = 'Template';




  subscription: Subscription = new Subscription()

  ConnectionTypeMaster: IConnectionType = {} as IConnectionType;
  labelSizeMaster: ILabelSize = {} as ILabelSize;
  TemplateMaster: ITemplate = {} as ITemplate;






  constructor(private route: Router, private connection: ConnectionService, private dataTable: DataTableService, private log: LogService,
    private labelSize: LabelSizeService, private template: TemplateService, private credential: CredentialService) {

    this.onPreInit()
  }


  onPreInit() {
    this.dtOptions = this.dataTable.getDataTableOptions(false, false);
  }


  isRightsExisting(): boolean {
    return true;
  }

  ngOnInit() {
    const isPageAccess = this.isRightsExisting(); // check rights
    if (isPageAccess) {
      this.getBasicUtility();
      this.onPageReady();
    }
    else {
      this.route.navigateByUrl(Master.unAuthorizedUrl);
    }
  }


  getSelectTabData(tabName: any) {
    switch (tabName) {
      case tabName = "Connection":
        this.getConnectionList(true);
        // this.addProduct = 'Add ' + tabName
        break;
      case tabName = "Label":
        this.getLabelSizeList(true)
        // this.addProduct = 'Add ' + tabName
        break;
      case tabName = "Template":
        this.getTemplateList(true)
        // this.addProduct = 'Add ' + tabName
        break;
      
    }

    this.LabelColName = tabName
  }

  onPageReady() {
    this.getTemplateList();

  }



  setList(list: any[] = [], isReRender = false): void {
    this.tablelist = list;
    if (this.tablelist.length) {
      if (!isReRender) {
        this.dtTrigger.next();
        if (!(jQuery('table').parents('.dataTables_scroll').length)) {
          const timeOutID = setTimeout(() => {
            jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
          }, 100);
        }
      } else {
        this.reRender();
      }
    }
    // else if (!isReRender) {
    //   this.dtTrigger.next();
    // }
  }

  getConnectionList(isReRender = false) {
    this.subscription.add(
      this.connection.getConnectionlist().subscribe({
        next: response => {
          this.log.log('selected connection type :', response);
          const list = response || [];
          this.setList(response, isReRender);
        },
        error: error => {

        }

      })
    )
  }

  getLabelSizeList(isReRender = false) {
    this.subscription.add(
      this.labelSize.getLabelSizelist().subscribe({
        next: response => {
          this.log.log('Selected Label Size :', response);
          const list = response || []
          this.setList(response, isReRender);
        },
        error: error => {

        }
      })
    )
  }

  getTemplateList(isReRender = false) {
    this.subscription.add(
      this.template.getTemplatelist().subscribe({
        next: response => {
          this.log.log('label printer template : List', response);
          const list = response || []
          this.setList(response, isReRender);
        }
      })
    )
  }
  

  /*       post   label sixe */
  onAddLabelSize() {
     
    if (!this.labelSizeMaster.Label_Size_Name) {
      this.log.log('major name misiing');
      return
    }

    this.subscription.add(
      this.labelSize.postLabelSize(this.labelSizeMaster).subscribe({
        next: response => {
          this.log.log('posted value', response)

        }
      })
    )




  }

  onAddTemplate() {
    if (!this.TemplateMaster.Label_Template_Name) {
      this.log.log('please enter the valid name')
      return
    }
    this.subscription.add(
      this.template.postTemplate(this.TemplateMaster).subscribe({
        next: response => {
          this.log.log('add tempalte', response)
        }
      })
    )

    this.TemplateMaster.Label_Template_Name = ''
    this.TemplateMaster.Label_Template_Content = ''
    this.TemplateMaster.Label_Template_Description = ''



  }

  /*                       UPDATE TEMPLATE & SIZE   */

  onEditTemplate(template: any) {
    this.log.log(template)
    this.TemplateMaster = template;
    this.addTemplateButoon = false;
    this.UpdateTemplateButton = true;
  }

  onEditLabelSize(labelSize: any) {
    this.log.log(labelSize)
    this.labelSizeMaster = labelSize;
    this.UpdateLabelSizeButoon = true;
    this.addLabelSizeButton = false

  }

  UpdateTemplate() {
    this.subscription.add(
      this.template.updateTemplate(this.TemplateMaster.Label_Template_Master_Id, this.TemplateMaster).subscribe({
        next: response => {
          this.log.log('update template:', response)
        }
      })
    )
  }

  UpdateLabelSize() {
    this.subscription.add(
      this.labelSize.updatelabelSize(this.labelSizeMaster.Label_Size_Master_Id, this.labelSizeMaster).subscribe({
        next: response => {
          this.log.log('update label size :put', response)
        }
      })
    )
  }

 deleteTemplate(Object:any){

  this.subscription.add(
    this.template.deleteTemplate(Object.Label_Template_Master_Id).subscribe({
      next: response => {
        this.log.log('update label size :put', response)
      }
    })
  )
 }
 deleteLabel(Object:any){
  this.subscription.add(
    this.labelSize.deleteTemplate(Object.Label_Size_Master_Id).subscribe({
      next: response => {
        this.log.log('update label size :put', response)
      }
    })
  )
 }

  reRender() {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to re render again
        this.dtTrigger.next();
        const timeOutID = setTimeout(() => {
          jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
        }, 100);
      });
    } else {
      this.dtTrigger.next();
      if (!(jQuery('table').parents('.dataTables_scroll').length)) {
        const timeOutID = setTimeout(() => {
          jQuery('table').wrap('<div class="dataTables_scroll" />'); clearTimeout(timeOutID);
        }, 100);
      }
    }
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }
  removeUS(title: string): string {
    return title.replace(/_/g, ' ');
  }





  getBasicUtility() {
    this.dtOptions = this.dataTable.getDataTableOptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
