"use strict";(self.webpackChunkwms_web_alstom=self.webpackChunkwms_web_alstom||[]).push([[817],{1817:(st,P,l)=>{l.r(P),l.d(P,{PutawayModule:()=>ot});var d=l(6814),p=l(2253),f=l(7394),u=l(2962),t=l(4946),y=l(3251),v=l(6815),C=l(7981),T=l(1017),w=l(2553);let x=(()=>{class n{constructor(e,i,a,s,o,c){this.route=e,this.alert=i,this.utility=a,this.warehouseApi=s,this.putAwayApi=o,this.log=c,this.subscription=new f.w0,this.onPreInit()}onPreInit(){}isRightsExisting(){return!0}ngOnInit(){if(this.isRightsExisting()){const i=localStorage.getItem("putaway-number");i?this.getPutAwayDetail(i):this.route.navigateByUrl("/putaway")}else this.route.navigateByUrl(u.Q.unAuthorizedUrl)}onPageReady(){}getPutAwayDetail(e){this.subscription.add(this.putAwayApi.getPutAwayDetail(e).subscribe({next:i=>{this.log.log("put away detail response : ",i)},error:i=>{this.log.error(i,"put-away-detail","getPutAwayDetail")}}))}getBasicUtility(){}ngOnDestroy(){}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(p.F0),t.Y36(y.c),t.Y36(v.t),t.Y36(C.l),t.Y36(T.a),t.Y36(w.$))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-put-away-detail"]],decls:0,vars:0,template:function(i,a){}})}return n})();var _=l(627),M=l(8645),b=l(2096),A=l(9397),L=l(9315),R=l(3359),Q=l(8437),g=l(6223),D=l(3580),S=l(6149),J=l(6551);function B(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"a",24),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.clearRackField())}),t.O4$(),t.TgZ(1,"svg",25),t._UZ(2,"path",26)(3,"path",27),t.qZA()()}}function O(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"a",24),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.clearShelfField())}),t.O4$(),t.TgZ(1,"svg",25),t._UZ(2,"path",26)(3,"path",27),t.qZA()()}}function U(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"a",24),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.clearBinField())}),t.O4$(),t.TgZ(1,"svg",25),t._UZ(2,"path",26)(3,"path",27),t.qZA()()}}function N(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"span",32),t.qZA(),t.TgZ(3,"td"),t._UZ(4,"span",32),t.qZA(),t.TgZ(5,"td"),t._UZ(6,"span",32),t.qZA(),t.TgZ(7,"td"),t._UZ(8,"span",32),t.qZA(),t.TgZ(9,"td",30),t._UZ(10,"span",32),t.qZA(),t.TgZ(11,"td")(12,"a",33),t.NdJ("click",function(){const s=t.CHM(e).$implicit,o=t.oxw(3);return t.KtG(o.onDeleteScannedProduct(s))}),t.O4$(),t.TgZ(13,"svg",34),t._UZ(14,"path",35)(15,"line",36)(16,"line",37)(17,"line",38)(18,"path",39)(19,"path",40),t.qZA()()()()}if(2&n){const e=r.$implicit,i=t.oxw().$implicit;t.xp6(2),t.Q6J("innerHtml",i.Rack_Code,t.oJD),t.xp6(2),t.Q6J("innerHtml",i.Shelf_Code,t.oJD),t.xp6(2),t.Q6J("innerHtml",i.Bin_Code,t.oJD),t.xp6(2),t.Q6J("innerHtml",(e.Material_Code||"")+" - "+(e.Material_Name||""),t.oJD),t.xp6(2),t.Q6J("innerHtml",e.Quantity,t.oJD)}}function q(n,r){if(1&n&&(t.ynx(0),t.YNc(1,N,20,5,"tr",31),t.BQk()),2&n){const e=r.$implicit;t.xp6(1),t.Q6J("ngForOf",e.Putaway_Product)}}function I(n,r){if(1&n&&(t.TgZ(0,"div",28)(1,"div",21)(2,"table",29)(3,"thead")(4,"tr")(5,"th"),t._uU(6,"Rack"),t.qZA(),t.TgZ(7,"th"),t._uU(8,"Shelf"),t.qZA(),t.TgZ(9,"th"),t._uU(10,"Bin"),t.qZA(),t.TgZ(11,"th"),t._uU(12,"Item"),t.qZA(),t.TgZ(13,"th",30),t._uU(14,"Quantity"),t.qZA(),t._UZ(15,"th"),t.qZA()(),t.TgZ(16,"tbody"),t.YNc(17,q,2,1,"ng-container",31),t.qZA()()()()),2&n){const e=t.oxw();t.xp6(17),t.Q6J("ngForOf",e.putAwayList)}}let F=(()=>{class n{get data(){return this._data}set data(e){this._data=e,this.onDataChange(e)}constructor(e,i,a,s,o){this.log=e,this.alert=i,this.credential=a,this.utility=s,this.putAwayApi=o,this.toggleEvent=new t.vpe,this.selectedProductList=[],this.selectedProductBarCodes=[],this.rackMasterList=[],this.stockReceiveDetail={},this.subscription=new f.w0,this.totalQuantity=0,this.scanRack="",this.scanShelf="",this.scanBin="",this.scanItem="",this.employeeCode="",this.putAwayList=[],this.scannedBarcodeList=[]}ngOnInit(){this.employeeCode=this.credential.getLoginCredentials("Employee_Code")}onDataChange(e){const i=e||{};this.log.log("param data : ",i),this.stockReceiveDetail=i.receiveDetail||{},this.selectedProductList=i.products||[],this.selectedProductBarCodes=i.barCodes||[],this.rackMasterList=i.rackMasters||[];let a=0;this.selectedProductList.forEach(s=>{a+="string"==typeof s.Available_Quantity?parseFloat(s.Available_Quantity||"0.00"):s.Available_Quantity}),this.totalQuantity=a,this.putAwayList=[]}onRackChange(e,i){if(13===(e=e||window.event).keyCode&&!this.rackMasterList.filter(o=>o.Rack_Code===this.scanRack)?.length)return this.alert.toastAlert("warning","Rack is invalid !"),void this.invalidSound()}onShelveChange(e,i){if(13===(e=e||window.event).keyCode){if(!this.scanRack)return this.alert.toastAlert("warning","Scan Rack before shelf"),void this.invalidSound();if(!this.rackMasterList.filter(o=>o.Rack_Code===this.scanRack&&o.Shelf_Code===this.scanShelf)?.length)return this.alert.toastAlert("warning","Shelf is invalid !"),void this.invalidSound()}}onBinChange(e,i){if(13===(e=e||window.event).keyCode){if(!this.scanRack||!this.scanShelf)return this.alert.toastAlert("warning","Scan Rack and Shelf before bin"),void this.invalidSound();if(!this.rackMasterList.filter(o=>o.Rack_Code===this.scanRack&&o.Shelf_Code===this.scanShelf&&o.Bin_Code===this.scanBin)?.length)return this.alert.toastAlert("warning","Bin is invalid !"),void this.invalidSound()}}onItemChange(e,i){this.log.log("data : => ",e,i);const a=(e=e||window.event).keyCode;if(this.log.log("keyCode : ",a),13===a){if(!this.scanRack||!this.scanShelf||!this.scanBin)return void this.alert.toastAlert("warning","Add Rack, Shelf, Bin properly");if(!this.rackMasterList.filter(h=>h.Rack_Code===this.scanRack&&h.Shelf_Code===this.scanShelf&&h.Bin_Code===this.scanBin)?.length)return void this.alert.toastAlert("warning","Added Rack, Shelf, Bin are invalid");const o=this.selectedProductBarCodes.find(h=>h.Barcode===this.scanItem);if(!o)return void this.alert.toastAlert("warning","Scanner barcode is invalid");if(this.scannedBarcodeList?.some(h=>h===this.scanItem))return void this.alert.toastAlert("warning","Barcode already scanned");const m=this.selectedProductList.filter(h=>h.Material_Code===o.Material_Code),k=m?.length;if(!k)return void this.alert.toastAlert("warning","Item mismatched");this.addToScannedList(m[0])}}addToScannedList(e){const i=e||{},a=this.putAwayList.find(o=>o.Rack_Code===this.scanRack&&o.Shelf_Code===this.scanShelf&&o.Bin_Code===this.scanBin);if(a){const o=a.Putaway_Product?.find(c=>c.Material_Code===i.Material_Code&&c.Stock_Receive_Product_Id===i.Stock_Receive_Product_Id);if(o)return o.Quantity=parseFloat(o.Quantity||"0")+1,o.Barcodes?.push(this.scanItem),this.scannedBarcodeList.push(this.scanItem),void this.resetScan()}const s={Putaway_Number:"",Putaway_Date:"",Warehouse_Code:this.stockReceiveDetail.Warehouse_Code,Warehouse_Name:this.stockReceiveDetail.Warehouse_Name,Reference_Number:this.stockReceiveDetail.Stock_Receive_Number,Reference_Date:this.utility.getDBDateFormate(this.stockReceiveDetail.Stock_Receive_Date),Rack_Code:this.scanRack,Shelf_Code:this.scanShelf,Bin_Code:this.scanBin,Created_By:this.employeeCode,Putaway_Product:[{GRN_Number:"",GRN_Date:"",Material_Code:i.Material_Code,Part_Number:i.Part_Number,Barcode:i.Barcode,HSN_Code:i.HSN_Code,Material_Name:i.Material_Name,Quantity:"1",Stock_Receive_Product_Id:i.Stock_Receive_Product_Id,Barcodes:[this.scanItem]}]};this.putAwayList.push(s),this.scannedBarcodeList.push(this.scanItem),this.resetScan()}resetScan(){this.scanItem=""}clearRackField(){this.scanRack="",this.scanShelf="",this.scanBin="",this.scanItem=""}clearShelfField(){this.scanShelf="",this.scanBin=""}clearBinField(){this.scanBin=""}onDeleteScannedProduct(e,i){this.log.log("selected product : ",e);const a=e.Barcodes||[];if(this.log.log("barCodes : ",a),a?.length){const s=[];this.scannedBarcodeList.forEach((o,c)=>{a.includes(o)||s.push(o)}),this.scannedBarcodeList=s}this.putAwayList.splice(i,1)}onCompletePutAway(){this.putAwayList?.length?this.log.log("putAwayList : ",this.putAwayList):this.alert.toastAlert("warning","Scan products to add")}validSound(){}invalidSound(){}ngOnDestroy(){this.subscription?.unsubscribe()}onClose(){this.toggleEvent.emit()}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(w.$),t.Y36(y.c),t.Y36(J.T),t.Y36(v.t),t.Y36(T.a))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-put-away-modal"]],inputs:{data:"data"},outputs:{toggleEvent:"toggleEvent"},decls:39,vars:10,consts:[[1,"modal-content"],[1,"modal-header"],[1,"d-flex","align-items-center","justify-content-between","w-100"],["id","putawayGenerateModalLabel",1,"modal-title"],[1,"d-flex","align-items-center","gap-2"],["type","button",1,"all-button","ms-3",3,"click"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"all-close-button"],[1,"modal-body"],[1,"row","mb-3"],[1,"col-md-6"],[1,"ps-2","fw-bold",3,"innerHtml"],[1,"col-md-6","text-end"],[1,"pe-2"],[1,"pe-2",3,"innerHtml"],[1,"row","mt-4"],[1,"col-md-4"],[1,"form-input-field","scan-field-container"],["type","text","placeholder","Scan Rack here",1,"form-control",3,"ngModel","ngModelChange","keypress"],["class","clear-icon",3,"click",4,"ngIf"],["type","text","placeholder","Scan Shelf here",1,"form-control",3,"ngModel","ngModelChange","keypress"],["type","text","placeholder","Scan Bin here",1,"form-control",3,"ngModel","ngModelChange","keypress"],[1,"col-md-12"],["type","text","placeholder","Scan item here",1,"form-control",3,"ngModel","ngModelChange","keypress"],["class","row mt-2",4,"ngIf"],[1,"clear-icon",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","fill","currentColor","viewBox","0 0 16 16",1,"bi","bi-x-circle"],["d","M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"],["d","M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"],[1,"row","mt-2"],[1,"table","put-away-table"],[1,"text-center"],[4,"ngFor","ngForOf"],[3,"innerHtml"],[1,"action-icon-button","delete-icon",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","16","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor","fill","none","stroke-linecap","round","stroke-linejoin","round",1,"icon","icon-tabler","icon-tabler-trash"],["stroke","none","d","M0 0h24v24H0z","fill","none"],["x1","4","y1","7","x2","20","y2","7"],["x1","10","y1","11","x2","10","y2","17"],["x1","14","y1","11","x2","14","y2","17"],["d","M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"],["d","M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"]],template:function(i,a){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div")(4,"h5",3),t._uU(5,"Putaway"),t.qZA()(),t.TgZ(6,"div",4)(7,"button",5),t.NdJ("click",function(){return a.onCompletePutAway()}),t._uU(8,"Complete"),t.qZA(),t.TgZ(9,"button",6),t._uU(10,"Close"),t.qZA()()()(),t.TgZ(11,"div",7)(12,"div",8)(13,"div",9)(14,"span"),t._uU(15,"Total Products"),t.qZA(),t._UZ(16,"span",10),t.qZA(),t.TgZ(17,"div",11)(18,"span",12),t._uU(19,"Total Quantity"),t.qZA(),t._UZ(20,"span",13),t.qZA()(),t.TgZ(21,"div",14)(22,"div",15)(23,"div",16)(24,"input",17),t.NdJ("ngModelChange",function(o){return a.scanRack=o})("keypress",function(o){return a.onRackChange(o,a.scanRack)}),t.qZA(),t.YNc(25,B,4,0,"a",18),t.qZA()(),t.TgZ(26,"div",15)(27,"div",16)(28,"input",19),t.NdJ("ngModelChange",function(o){return a.scanShelf=o})("keypress",function(o){return a.onShelveChange(o,a.scanShelf)}),t.qZA(),t.YNc(29,O,4,0,"a",18),t.qZA()(),t.TgZ(30,"div",15)(31,"div",16)(32,"input",20),t.NdJ("ngModelChange",function(o){return a.scanBin=o})("keypress",function(o){return a.onBinChange(o,a.scanBin)}),t.qZA(),t.YNc(33,U,4,0,"a",18),t.qZA()()(),t.TgZ(34,"div",14)(35,"div",21)(36,"div",16)(37,"input",22),t.NdJ("ngModelChange",function(o){return a.scanItem=o})("keypress",function(o){return a.onItemChange(o,a.scanItem)}),t.qZA()()()(),t.YNc(38,I,18,1,"div",23),t.qZA()()),2&i&&(t.xp6(16),t.Q6J("innerHtml",(null==a.selectedProductList?null:a.selectedProductList.length)||"0",t.oJD),t.xp6(4),t.Q6J("innerHtml",a.totalQuantity||"0",t.oJD),t.xp6(4),t.Q6J("ngModel",a.scanRack),t.xp6(1),t.Q6J("ngIf",a.scanRack),t.xp6(3),t.Q6J("ngModel",a.scanShelf),t.xp6(1),t.Q6J("ngIf",a.scanShelf),t.xp6(3),t.Q6J("ngModel",a.scanBin),t.xp6(1),t.Q6J("ngIf",a.scanBin),t.xp6(4),t.Q6J("ngModel",a.scanItem),t.xp6(1),t.Q6J("ngIf",null==a.putAwayList?null:a.putAwayList.length))},dependencies:[d.sg,d.O5,g.Fj,g.JJ,g.On],styles:[".scan-field-container[_ngcontent-%COMP%]{position:relative}.scan-field-container[_ngcontent-%COMP%]   .clear-icon[_ngcontent-%COMP%]{color:var(--bs-danger);position:absolute;top:.5rem;right:.5rem}.put-away-table[_ngcontent-%COMP%]{margin-top:2rem}.put-away-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:rgba(var(--app-primary-rgb),75%);color:#fff}.put-away-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{vertical-align:middle}.put-away-table[_ngcontent-%COMP%]   .action-icon-button[_ngcontent-%COMP%]{padding:.25rem .5rem}"]})}return n})();function H(n,r){if(1&n&&(t.TgZ(0,"th"),t.ynx(1),t._uU(2),t.BQk(),t.qZA()),2&n){const e=r.$implicit,i=t.oxw(2);t.xp6(2),t.Oqu(i.removeUS(e.key))}}function W(n,r){if(1&n&&(t.TgZ(0,"tr"),t.YNc(1,H,3,1,"th",35),t.ALo(2,"keyvalue"),t.qZA()),2&n){const e=r.$implicit,i=t.oxw();t.xp6(1),t.Q6J("ngForOf",t.xi3(2,1,e,i.originalOrder))}}function G(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"td",60),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit,s=t.oxw();return t.KtG(s.onTableRowClick(a))}),t.ynx(1),t._uU(2),t.BQk(),t.qZA()}if(2&n){const e=r.$implicit;t.xp6(2),t.Oqu(e.value)}}function Y(n,r){if(1&n&&(t.TgZ(0,"tr"),t.YNc(1,G,3,1,"td",59),t.ALo(2,"keyvalue"),t.qZA()),2&n){const e=r.$implicit,i=t.oxw();t.xp6(1),t.Q6J("ngForOf",t.xi3(2,1,e,i.originalOrder))}}function E(n,r){1&n&&(t.TgZ(0,"div",61)(1,"div",62),t._UZ(2,"img",63),t.qZA()())}function $(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"tr")(1,"td")(2,"div")(3,"input",64),t.NdJ("ngModelChange",function(a){const o=t.CHM(e).$implicit;return t.KtG(o.isSelected=a)}),t.qZA()()(),t._UZ(4,"td",65),t.TgZ(5,"td"),t._UZ(6,"span",65),t.qZA(),t.TgZ(7,"td"),t._UZ(8,"span",65),t.qZA(),t.TgZ(9,"td",51),t._UZ(10,"span",65),t.qZA(),t.TgZ(11,"td",51),t._UZ(12,"span",65),t.qZA()()}if(2&n){const e=r.$implicit,i=r.index;t.xp6(3),t.Q6J("ngModel",e.isSelected),t.xp6(1),t.Q6J("innerHtml",i+1,t.oJD),t.xp6(2),t.Q6J("innerHtml",(e.Material_Code||"")+" "+(e.Material_Name||""),t.oJD),t.xp6(2),t.Q6J("innerHtml",e.Part_Number||"-",t.oJD),t.xp6(2),t.Q6J("innerHtml",e.Available_Quantity||"-",t.oJD),t.xp6(2),t.Q6J("innerHtml",e.Putaway_Quantity||"-",t.oJD)}}function j(n,r){if(1&n&&(t.TgZ(0,"tr")(1,"td")(2,"span",66),t._uU(3,"Completed"),t.qZA()(),t._UZ(4,"td",65),t.TgZ(5,"td"),t._UZ(6,"span",65),t.qZA(),t.TgZ(7,"td"),t._UZ(8,"span",65),t.qZA(),t.TgZ(9,"td",51),t._UZ(10,"span",65),t.qZA(),t.TgZ(11,"td",51),t._UZ(12,"span",65),t.qZA()()),2&n){const e=r.$implicit,i=r.index;t.xp6(4),t.Q6J("innerHtml",i+1,t.oJD),t.xp6(2),t.Q6J("innerHtml",(e.Material_Code||"")+" "+(e.Material_Name||""),t.oJD),t.xp6(2),t.Q6J("innerHtml",e.Part_Number||"-",t.oJD),t.xp6(2),t.Q6J("innerHtml",e.Available_Quantity||"-",t.oJD),t.xp6(2),t.Q6J("innerHtml",e.Putaway_Quantity||"-",t.oJD)}}let z=(()=>{class n{constructor(e,i,a,s,o,c,m){this.route=e,this.alert=i,this.utility=a,this.dataTable=s,this.warehouseApi=o,this.stockReceiveApi=c,this.log=m,this.dtOptions={},this.dtTrigger=new M.x,this.isTableDataRetrieved=!1,this.subscription=new f.w0,this.stockReceiveList=[],this.rackMappingList=[],this.warehouseDropdown=[],this.isAccessWarehouseDropdown=!0,this.filterWareHouseCode="",this.filterDate={},this.stockReceiveDetail={},this.stockReceiveProducts=[],this.stockReceivedProducts=[],this.stockReceiveBarCodes=[],this.putAwayModal={receiveDetail:{},products:[],barCodes:[],rackMasters:[]},this.isAllSelect=!1,this.originalOrder=(k,Z)=>0,this.onPreInit()}onPreInit(){}isRightsExisting(){return!0}ngOnInit(){this.isRightsExisting()?(this.getBasicUtility(),this.getWarehouseList()):this.route.navigateByUrl(u.Q.unAuthorizedUrl)}getWarehouseList(){this.subscription.add(this.warehouseApi.gerWarehouseDropdown().subscribe({next:e=>{this.log.log("response : ",e);const i=e||[];if(!i?.length)return this.alert.toastAlert("warning","Add warehouse before view GRN List"),void(this.warehouseDropdown=[]);this.setWarehouse(i)},error:e=>{this.log.error(e,"grn-list","getWarehouseList")},complete:()=>{}}))}setWarehouse(e=[]){const i=e;this.warehouseDropdown=this.utility.getSelectOptions(i||[],"Warehouse_Code","Warehouse_Name"),this.filterWareHouseCode||(this.filterWareHouseCode=i[0]?.Warehouse_Code||""),this.getStockReceiveList()}onFilterClick(){this.isTableDataRetrieved=!1,this.getStockReceiveList(!0)}onLoad(e=!1){let i=(0,b.of)(null),a=(0,b.of)(null);return i=this.stockReceiveApi.getStockReceiveList(this.filterDate.fromDate,this.filterDate.toDate,this.filterWareHouseCode||"").pipe((0,A.b)(s=>{this.log.log("stock receive response : ",s),this.setList(s||[],e);const c=setTimeout(()=>{this.isTableDataRetrieved=!0,clearTimeout(c)},u.Q.tableLoaderDuration)})),a=this.warehouseApi.getRackMappingDropdown(this.filterWareHouseCode||"").pipe((0,A.b)(s=>{this.log.log("rack master response : ",s),this.rackMappingList=s||[]})),(0,L.D)({receiveList:i,rackMaster:a})}getStockReceiveList(e=!1){this.subscription.add(this.onLoad(e).subscribe({next:i=>{this.log.log("stock receive total response : ",i)},error:i=>{this.log.error(i,"put-away-generation","getStockReceiveList");const a=setTimeout(()=>{this.isTableDataRetrieved=!0,clearTimeout(a)},u.Q.tableLoaderDuration)},complete:()=>{}}))}setList(e=[],i=!1){if(this.stockReceiveList=e,this.stockReceiveList.length)if(i)this.reRender();else if(this.dtTrigger.next(),!jQuery("table").parents(".dataTables_scroll").length){const a=setTimeout(()=>{jQuery("table").wrap('<div class="dataTables_scroll" />'),clearTimeout(a)},100)}}onTableRowClick(e){this.log.log("selected stock receive : ",e);const i=e||{};i.Stock_Receive_Number?this.getStockReceiveDetail(i.Stock_Receive_Number):this.log.warn("Stock Receive Number is empty")}getStockReceiveDetail(e){const i=e||"";i?this.subscription.add(this.getStockReceiveDetailAndBarCodes(i).subscribe({next:a=>{this.filterAvailableProducts()},error:a=>{},complete:()=>{}})):this.log.warn("Stock Receive Number is empty")}getStockReceiveDetailAndBarCodes(e){const i=e||"";let a=(0,b.of)(null),s=(0,b.of)(null);return a=this.stockReceiveApi.getStockReceive(i).pipe((0,A.b)({next:o=>{this.log.log("stock receive detail response : ",o),this.stockReceiveDetail=o||{}}})),s=this.stockReceiveApi.getStockReceiveBarcode(this.filterWareHouseCode,i).pipe((0,A.b)({next:o=>{this.log.log("stock receive barcode response : ",o),this.stockReceiveBarCodes=o||[]}})),(0,L.D)({detail:a,barcode:s})}filterAvailableProducts(){const e=this.stockReceiveDetail.Stock_Receive_Products||[];this.stockReceiveProducts=[],this.stockReceivedProducts=[],e.forEach(i=>{const o=parseFloat(i.Quantity||"0.00")-parseFloat(i.Putaway_Quantity||"0.00");i.Available_Quantity=o,o>0?this.stockReceiveProducts.push(i):this.stockReceivedProducts.push(i)}),this.openProductSelectionModal()}openProductSelectionModal(){document.getElementById("receive-product-open-modal")?.click()}isAllSelectChange(e=!1){this.stockReceiveProducts.forEach(i=>i.isSelected=e)}onStartPutAway(){const e=[],i=[];this.stockReceiveProducts.forEach(a=>{if(a.isSelected){e.push(a);const s=this.stockReceiveBarCodes.filter(o=>o.Stock_Receive_Product_Id===a.Stock_Receive_Product_Id&&!o.Putaway_Number);i.push(...s)}}),e?.length?(this.closeProductSelectionModal(),this.putAwayModal={receiveDetail:this.stockReceiveDetail,products:e||[],barCodes:i||[],rackMasters:this.rackMappingList},this.openPutAwayModal()):this.alert.toastAlert("warning","Select minimum one product to start putaway")}closeProductSelectionModal(){document.getElementById("receive-product-close-modal")?.click()}openPutAwayModal(){document.getElementById("putaway-master-open-modal")?.click()}closePutAwayModal(){document.getElementById("putaway-master-close-modal")?.click()}reRender(){if(this.dtElement.dtInstance)this.dtElement.dtInstance.then(e=>{e.destroy(),this.dtTrigger.next();const i=setTimeout(()=>{jQuery("table").wrap('<div class="dataTables_scroll" />'),clearTimeout(i)},100)});else if(this.dtTrigger.next(),!jQuery("table").parents(".dataTables_scroll").length){const e=setTimeout(()=>{jQuery("table").wrap('<div class="dataTables_scroll" />'),clearTimeout(e)},100)}}getBasicUtility(){this.dtOptions=this.dataTable.getDataTableOptions(),this.filterDate=this.utility.getDateList(u.Q.dateOption.thisWeek)}removeUS(e){return e.replace(/_/g," ")}startPutaway(){}navigateBack(){this.route.navigateByUrl("/putaway")}ngOnDestroy(){}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(p.F0),t.Y36(y.c),t.Y36(v.t),t.Y36(R.n),t.Y36(C.l),t.Y36(Q.l),t.Y36(w.$))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-put-away-generation"]],viewQuery:function(i,a){if(1&i&&t.Gf(_.G,5),2&i){let s;t.iGM(s=t.CRH())&&(a.dtElement=s.first)}},decls:99,vars:26,consts:[[1,"breadcrumb-container"],[1,"breadcrumb-bar"],["aria-label","breadcrumb ",2,"--bs-breadcrumb-divider","'>'"],[1,"breadcrumb","mb-0"],["aria-current","page",1,"breadcrumb-item","active"],[3,"routerLink"],["aria-current","page",1,"breadcrumb-item"],[1,"aside-container"],["type","button",1,"all-back-button",3,"click"],["xmlns","http://www.w3.org/2000/svg","className","icon icon-tabler icon-tabler-arrow-back-up","width","24","height","24","viewBox","0 0 24 24","strokeWidth","2","stroke","currentColor","fill","none","strokeLinecap","round","strokeLinejoin","round"],["stroke","none","d","M0 0h24v24H0z","fill","none"],["d","M9 14l-4 -4l4 -4"],["d","M5 10h11a4 4 0 1 1 0 8h-1"],[1,"hover-text"],[1,"document-main-container"],[1,"form-container"],[1,"row"],[1,"col-md-12"],[1,"table-filter-container"],[1,"table-filter-content-container"],[1,"input-field-container"],[1,"floating-label"],[1,"all-select-comp-container"],[3,"data","isClear","allMarkModel","disabled","allMarkModelChange"],[1,"input-field-container","input-date-container"],["label","Date","floatingLabel","true",3,"isClear","dateModel","dateModelChange"],[1,"table-filter-button-container"],[1,"input-field-container","filter-button-container"],[1,"all-filter-icon-button",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor","fill","none","stroke-linecap","round","stroke-linejoin","round",1,"icon","icon-tabler","icon-tabler-filter"],["d","M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"],[1,"data-table-scroll-container"],[1,"table-spinner-container"],["role","status",1,"spinner-border","text-success"],["datatable","",1,"row-border","hover",3,"dtOptions","dtTrigger"],[4,"ngFor","ngForOf"],["class","no-record-found-container",4,"ngIf"],["id","receive-product-selection-modal","data-bs-backdrop","static","data-bs-keyboard","false","tabindex","-1","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered","modal-xl"],[1,"modal-content"],[1,"modal-header"],[1,"d-flex","align-items-center","justify-content-between","w-100"],[1,"modal-title"],[1,"d-flex","align-items-center","gap-2"],[1,"all-button",3,"click"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"all-close-button"],[1,"modal-body"],[1,"total-table-container"],[1,"form-check"],["type","checkbox","value","","id","defaultCheck1",1,"form-check-input",3,"ngModel","ngModelChange"],["for","defaultCheck1",1,"form-check-label"],[1,"text-center"],[1,"d-none"],["id","receive-product-open-modal","data-bs-toggle","modal","data-bs-target","#receive-product-selection-modal"],["id","receive-product-close-modal","data-bs-target","#receive-product-selection-modal","data-bs-dismiss","modal","aria-label","Close"],["id","putawayGenerateModal","data-bs-backdrop","static","data-bs-keyboard","false","tabindex","-1","aria-labelledby","putawayGenerateModalLabel","aria-hidden","true",1,"modal","fade"],[3,"data","toggleEvent"],["id","putaway-master-open-modal","data-bs-toggle","modal","data-bs-target","#putawayGenerateModal"],["id","putaway-master-close-modal","data-bs-target","#putawayGenerateModal","data-bs-dismiss","modal","aria-label","Close"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[1,"no-record-found-container"],[1,"no-record-found-img-div"],["src","../../../assets/images/no-data-found.png","alt","No data found","title","No data found"],["type","checkbox","id","checkboxNoLabel","value","","aria-label","...",1,"form-check-input",3,"ngModel","ngModelChange"],[3,"innerHtml"],[1,"text-success"]],template:function(i,a){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"nav",2)(3,"ol",3)(4,"li",4)(5,"a",5),t._uU(6,"Putaway"),t.qZA()(),t.TgZ(7,"li",6),t._uU(8,"Create"),t.qZA()()()(),t.TgZ(9,"div",7)(10,"div",7)(11,"button",8),t.NdJ("click",function(){return a.navigateBack()}),t.TgZ(12,"span"),t.O4$(),t.TgZ(13,"svg",9),t._UZ(14,"path",10)(15,"path",11)(16,"path",12),t.qZA()(),t.kcU(),t.TgZ(17,"span",13),t._uU(18,"Back"),t.qZA()()()()(),t.TgZ(19,"div",14)(20,"div",15)(21,"div",16)(22,"div",17)(23,"div",18)(24,"div",19)(25,"div",20)(26,"label",21),t._uU(27,"Warehouse"),t.qZA(),t.TgZ(28,"div",22)(29,"app-all-mark-select",23),t.NdJ("allMarkModelChange",function(o){return a.filterWareHouseCode=o}),t.qZA()()(),t.TgZ(30,"div",24)(31,"app-date-filter-field",25),t.NdJ("dateModelChange",function(o){return a.filterDate=o}),t.qZA()()(),t.TgZ(32,"div",26)(33,"div",27)(34,"button",28),t.NdJ("click",function(){return a.onFilterClick()}),t.TgZ(35,"span"),t.O4$(),t.TgZ(36,"svg",29),t._UZ(37,"path",10)(38,"path",30),t.qZA()()()()()()()(),t.kcU(),t.TgZ(39,"div",16)(40,"div",17)(41,"div",31)(42,"div",32),t._UZ(43,"div",33),t.qZA(),t.TgZ(44,"table",34)(45,"thead"),t.YNc(46,W,3,4,"tr",35),t.ALo(47,"slice"),t.qZA(),t.TgZ(48,"tbody"),t.YNc(49,Y,3,4,"tr",35),t.qZA()()(),t.YNc(50,E,3,0,"div",36),t.qZA()()()(),t.TgZ(51,"div",37)(52,"div",38)(53,"div",39)(54,"div",40)(55,"div",41)(56,"div")(57,"h5",42),t._uU(58,"Products"),t.qZA()(),t.TgZ(59,"div",43)(60,"button",44),t.NdJ("click",function(){return a.onStartPutAway()}),t._uU(61,"Create"),t.qZA(),t.TgZ(62,"button",45),t._uU(63,"Close"),t.qZA()()()(),t.TgZ(64,"div",46)(65,"div",16)(66,"div",17)(67,"div",47)(68,"table")(69,"thead")(70,"tr")(71,"th")(72,"div",48)(73,"input",49),t.NdJ("ngModelChange",function(o){return a.isAllSelect=o})("ngModelChange",function(o){return a.isAllSelectChange(o)}),t.qZA(),t.TgZ(74,"label",50),t._uU(75," Select all "),t.qZA()()(),t.TgZ(76,"th"),t._uU(77,"S.No"),t.qZA(),t.TgZ(78,"th"),t._uU(79,"Material"),t.qZA(),t.TgZ(80,"th"),t._uU(81,"PartNumber"),t.qZA(),t.TgZ(82,"th",51),t._uU(83,"Quantity"),t.qZA(),t.TgZ(84,"th",51),t._uU(85,"Completed"),t.qZA()()(),t.TgZ(86,"tbody"),t.YNc(87,$,13,6,"tr",35),t.qZA(),t.TgZ(88,"tfoot"),t.YNc(89,j,13,5,"tr",35),t.qZA()()()()()()()()(),t.TgZ(90,"div",52),t._UZ(91,"button",53)(92,"button",54),t.qZA(),t.TgZ(93,"div",55)(94,"div",38)(95,"app-put-away-modal",56),t.NdJ("toggleEvent",function(){return a.closePutAwayModal()}),t.qZA()()(),t.TgZ(96,"div",52),t._UZ(97,"button",57)(98,"button",58),t.qZA()),2&i&&(t.xp6(5),t.Q6J("routerLink","/putaway"),t.xp6(24),t.Q6J("data",a.warehouseDropdown)("isClear",!1)("allMarkModel",a.filterWareHouseCode)("disabled",!a.isAccessWarehouseDropdown),t.xp6(2),t.Q6J("isClear",!1)("dateModel",a.filterDate),t.xp6(3),t.ekj("button-loader",!a.isTableDataRetrieved),t.xp6(7),t.ekj("table-spinner",!a.isTableDataRetrieved)("hide-when-no-data",0==(null==a.stockReceiveList?null:a.stockReceiveList.length)),t.xp6(3),t.Q6J("dtOptions",a.dtOptions)("dtTrigger",a.dtTrigger),t.xp6(2),t.Q6J("ngForOf",t.Dn7(47,22,a.stockReceiveList,0,1)),t.xp6(3),t.Q6J("ngForOf",a.stockReceiveList),t.xp6(1),t.Q6J("ngIf",0==(null==a.stockReceiveList?null:a.stockReceiveList.length)&&a.isTableDataRetrieved),t.xp6(23),t.Q6J("ngModel",a.isAllSelect),t.xp6(14),t.Q6J("ngForOf",a.stockReceiveProducts),t.xp6(2),t.Q6J("ngForOf",a.stockReceivedProducts),t.xp6(6),t.Q6J("data",a.putAwayModal))},dependencies:[d.sg,d.O5,p.rH,_.G,g.Wl,g.JJ,g.On,D.j,S.u,F,d.OU,d.Nd]})}return n})();function K(n,r){if(1&n&&(t.TgZ(0,"th"),t.ynx(1),t._uU(2),t.BQk(),t.qZA()),2&n){const e=r.$implicit,i=t.oxw(2);t.xp6(2),t.Oqu(i.removeUS(e.key))}}function X(n,r){if(1&n&&(t.TgZ(0,"tr"),t.YNc(1,K,3,1,"th",37),t.ALo(2,"keyvalue"),t.qZA()),2&n){const e=r.$implicit,i=t.oxw();t.xp6(1),t.Q6J("ngForOf",t.xi3(2,1,e,i.originalOrder))}}function V(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"td",40),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit,s=t.oxw();return t.KtG(s.onPutAwaySelect(a))}),t.ynx(1),t._uU(2),t.BQk(),t.qZA()}if(2&n){const e=r.$implicit;t.xp6(2),t.Oqu(e.value)}}function tt(n,r){if(1&n&&(t.TgZ(0,"tr"),t.YNc(1,V,3,1,"td",39),t.ALo(2,"keyvalue"),t.qZA()),2&n){const e=r.$implicit,i=t.oxw();t.xp6(1),t.Q6J("ngForOf",t.xi3(2,1,e,i.originalOrder))}}function et(n,r){1&n&&(t.TgZ(0,"div",41)(1,"div",42),t._UZ(2,"img",43),t.qZA()())}const it=[{path:"",component:(()=>{class n{constructor(){}ngOnInit(){}static#t=this.\u0275fac=function(i){return new(i||n)};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-putaway"]],decls:1,vars:0,template:function(i,a){1&i&&t._UZ(0,"router-outlet")},dependencies:[p.lC]})}return n})(),children:[{path:"",component:(()=>{class n{constructor(e,i,a,s,o,c,m){this.route=e,this.log=i,this.dataTable=a,this.alert=s,this.utility=o,this.warehouseApi=c,this.putAwayApi=m,this.dtOptions={},this.dtTrigger=new M.x,this.subscription=new f.w0,this.putAwayList=[],this.isTableDataRetrieved=!1,this.warehouseDropdown=[],this.isAccessWarehouseDropdown=!0,this.filterWareHouseCode="",this.filterDate={},this.originalOrder=(k,Z)=>0,this.onPreInit()}onPreInit(){}isRightsExisting(){return!0}ngOnInit(){this.isRightsExisting()?this.onPageReady():this.route.navigateByUrl(u.Q.unAuthorizedUrl)}onPageReady(){this.getBasicUtility(),this.getWarehouseList()}getWarehouseList(){this.subscription.add(this.warehouseApi.gerWarehouseDropdown().subscribe({next:e=>{this.log.log("response : ",e);const i=e||[];if(!i?.length)return this.alert.toastAlert("warning","Add warehouse before view GRN List"),void(this.warehouseDropdown=[]);this.setWarehouse(i)},error:e=>{this.log.error(e,"grn-list","getWarehouseList")},complete:()=>{}}))}setWarehouse(e=[]){const i=e;this.warehouseDropdown=this.utility.getSelectOptions(i||[],"Warehouse_Code","Warehouse_Name"),this.filterWareHouseCode||(this.filterWareHouseCode=i[0]?.Warehouse_Code||""),this.getPutAwayList()}onCreatePutAway(){this.route.navigateByUrl("/putaway/create")}removeUS(e){return e.replace(/_/g," ")}getPutAwayList(e=!1){this.subscription.add(this.putAwayApi.getPutAwayList(this.filterDate.fromDate,this.filterDate.toDate,this.filterWareHouseCode||"").subscribe({next:i=>{this.log.log("put away response => ",i),this.setPutAwayList(i||[],e);const s=setTimeout(()=>{this.isTableDataRetrieved=!0,clearTimeout(s)},u.Q.tableLoaderDuration)},error:i=>{this.log.error(i,"put-away-list","getPutAwayList");const a=setTimeout(()=>{this.isTableDataRetrieved=!0,clearTimeout(a)},u.Q.tableLoaderDuration)},complete:()=>{}}))}setPutAwayList(e,i=!1){if(this.putAwayList=e||[],this.putAwayList.length)if(i)this.reRender();else if(this.dtTrigger.next(),!jQuery("table").parents(".dataTables_scroll").length){const a=setTimeout(()=>{jQuery("table").wrap('<div class="dataTables_scroll" />'),clearTimeout(a)},100)}}onFilterClick(){this.isTableDataRetrieved=!1,this.getPutAwayList(!0),this.setPutAwayFilterDate()}reRender(){if(this.dtElement.dtInstance)this.dtElement.dtInstance.then(e=>{e.destroy(),this.dtTrigger.next();const i=setTimeout(()=>{jQuery("table").wrap('<div class="dataTables_scroll" />'),clearTimeout(i)},100)});else if(this.dtTrigger.next(),!jQuery("table").parents(".dataTables_scroll").length){const e=setTimeout(()=>{jQuery("table").wrap('<div class="dataTables_scroll" />'),clearTimeout(e)},100)}}getBasicUtility(){this.dtOptions=this.dataTable.getDataTableOptions(),this.filterDate=this.getPutAwayFilterDate()}onPutAwaySelect(e){this.log.log("grn : ",e),e.Putaway_Number?(localStorage.setItem("putaway-number",e.Putaway_Number),this.navigateToDetail()):this.log.log("Putaway Number is empty !!!")}setPutAwayFilterDate(){localStorage.setItem("put-away-filter-date",JSON.stringify(this.filterDate))}getPutAwayFilterDate(){const e=localStorage.getItem("put-away-filter-date");if(e){const i=this.utility.parseStringToJson(e);if(i?.text&&"Custom Range"!==i.text)return this.utility.getDateList(i.text)}return this.log.log("get grn date : ",e),this.utility.getDateList(u.Q.dateOption.thisWeek)}navigateToDetail(){this.route.navigateByUrl("putaway/detail")}navigateBack(){this.route.navigateByUrl("/home")}ngOnDestroy(){this.dtTrigger.unsubscribe(),this.subscription.unsubscribe()}static#t=this.\u0275fac=function(i){return new(i||n)(t.Y36(p.F0),t.Y36(w.$),t.Y36(R.n),t.Y36(y.c),t.Y36(v.t),t.Y36(C.l),t.Y36(T.a))};static#e=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-put-away-list"]],viewQuery:function(i,a){if(1&i&&t.Gf(_.G,5),2&i){let s;t.iGM(s=t.CRH())&&(a.dtElement=s.first)}},decls:52,vars:21,consts:[[1,"breadcrumb-container"],[1,"breadcrumb-bar"],["aria-label","breadcrumb ",2,"--bs-breadcrumb-divider","'>'"],[1,"breadcrumb","mb-0"],["aria-current","page",1,"breadcrumb-item","active"],[1,"d-flex","align-items-center","gap-2"],[1,"aside-container"],["type","button",1,"all-back-button",3,"click"],["xmlns","http://www.w3.org/2000/svg","className","icon icon-tabler icon-tabler-arrow-back-up","width","24","height","24","viewBox","0 0 24 24","strokeWidth","2","stroke","currentColor","fill","none","strokeLinecap","round","strokeLinejoin","round"],["stroke","none","d","M0 0h24v24H0z","fill","none"],["d","M9 14l-4 -4l4 -4"],["d","M5 10h11a4 4 0 1 1 0 8h-1"],[1,"hover-text"],[1,"all-button",3,"click"],[1,"ms-2"],[1,"document-main-container"],[1,"form-container"],[1,"row"],[1,"col-md-12","position-relative"],[1,"table-filter-container","static"],[1,"table-filter-content-container"],[1,"input-field-container"],[1,"floating-label"],[1,"all-select-comp-container"],[3,"data","isClear","allMarkModel","disabled","allMarkModelChange"],[1,"input-field-container","input-date-container"],["label","Date","floatingLabel","true",3,"isClear","dateModel","dateModelChange"],[1,"table-filter-button-container"],[1,"input-field-container","filter-button-container"],[1,"all-filter-icon-button",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor","fill","none","stroke-linecap","round","stroke-linejoin","round",1,"icon","icon-tabler","icon-tabler-filter"],["d","M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"],[1,"col-md-12"],[1,"data-table-scroll-container"],[1,"table-spinner-container"],["role","status",1,"spinner-border","text-success"],["datatable","",1,"row-border","hover",3,"dtOptions","dtTrigger"],[4,"ngFor","ngForOf"],["class","no-record-found-container",4,"ngIf"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[1,"no-record-found-container"],[1,"no-record-found-img-div"],["src","../../../assets/images/no-data-found.png","alt","No data found","title","No data found"]],template:function(i,a){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"nav",2)(3,"ol",3)(4,"li",4),t._uU(5,"Putaway"),t.qZA()()()(),t.TgZ(6,"div",5)(7,"div",6)(8,"button",7),t.NdJ("click",function(){return a.navigateBack()}),t.TgZ(9,"span"),t.O4$(),t.TgZ(10,"svg",8),t._UZ(11,"path",9)(12,"path",10)(13,"path",11),t.qZA()(),t.kcU(),t.TgZ(14,"span",12),t._uU(15,"Back"),t.qZA()()(),t.TgZ(16,"div",6)(17,"button",13),t.NdJ("click",function(){return a.onCreatePutAway()}),t.TgZ(18,"span",14),t._uU(19,"Create Putaway"),t.qZA()()()()(),t.TgZ(20,"div",15)(21,"div",16)(22,"div",17)(23,"div",18)(24,"div",19)(25,"div",20)(26,"div",21)(27,"label",22),t._uU(28,"Warehouse"),t.qZA(),t.TgZ(29,"div",23)(30,"app-all-mark-select",24),t.NdJ("allMarkModelChange",function(o){return a.filterWareHouseCode=o}),t.qZA()()(),t.TgZ(31,"div",25)(32,"app-date-filter-field",26),t.NdJ("dateModelChange",function(o){return a.filterDate=o}),t.qZA()()(),t.TgZ(33,"div",27)(34,"div",28)(35,"button",29),t.NdJ("click",function(){return a.onFilterClick()}),t.TgZ(36,"span"),t.O4$(),t.TgZ(37,"svg",30),t._UZ(38,"path",9)(39,"path",31),t.qZA()()()()()()()(),t.kcU(),t.TgZ(40,"div",17)(41,"div",32)(42,"div",33)(43,"div",34),t._UZ(44,"div",35),t.qZA(),t.TgZ(45,"table",36)(46,"thead"),t.YNc(47,X,3,4,"tr",37),t.ALo(48,"slice"),t.qZA(),t.TgZ(49,"tbody"),t.YNc(50,tt,3,4,"tr",37),t.qZA()()(),t.YNc(51,et,3,0,"div",38),t.qZA()()()()),2&i&&(t.xp6(30),t.Q6J("data",a.warehouseDropdown)("isClear",!1)("allMarkModel",a.filterWareHouseCode)("disabled",!a.isAccessWarehouseDropdown),t.xp6(2),t.Q6J("isClear",!1)("dateModel",a.filterDate),t.xp6(3),t.ekj("button-loader",!a.isTableDataRetrieved),t.xp6(7),t.ekj("table-spinner",!a.isTableDataRetrieved)("hide-when-no-data",0==(null==a.putAwayList?null:a.putAwayList.length)),t.xp6(3),t.Q6J("dtOptions",a.dtOptions)("dtTrigger",a.dtTrigger),t.xp6(2),t.Q6J("ngForOf",t.Dn7(48,17,a.putAwayList,0,1)),t.xp6(3),t.Q6J("ngForOf",a.putAwayList),t.xp6(1),t.Q6J("ngIf",0==(null==a.putAwayList?null:a.putAwayList.length)&&a.isTableDataRetrieved))},dependencies:[d.sg,d.O5,_.G,D.j,S.u,d.OU,d.Nd]})}return n})()},{path:"detail",component:x},{path:"create",component:z}]}];let at=(()=>{class n{static#t=this.\u0275fac=function(i){return new(i||n)};static#e=this.\u0275mod=t.oAB({type:n});static#i=this.\u0275inj=t.cJS({imports:[p.Bz.forChild(it),p.Bz]})}return n})();var nt=l(8524);let ot=(()=>{class n{static#t=this.\u0275fac=function(i){return new(i||n)};static#e=this.\u0275mod=t.oAB({type:n});static#i=this.\u0275inj=t.cJS({imports:[d.ez,at,_.T,g.u5,nt.m]})}return n})()}}]);