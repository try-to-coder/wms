"use strict";(self.webpackChunkwms_wip_web=self.webpackChunkwms_wip_web||[]).push([[742],{742:(U,A,d)=>{d.r(A),d.d(A,{MaterialMasterModule:()=>G});var u=d(6814),v=d(6223),b=d(2253),x=d(627),Z=d(8645),o=d(7394),s=d(2962),e=d(4946),g=d(2387),c=d(2553),m=d(3359),M=d(2096),h=d(9397),_=d(9315),C=d(3251),y=d(6593),T=d(6551);let I=(()=>{class i{constructor(t){this.elementref=t,this.regex=new RegExp("^[0-^(d*.)?d+$]+$"),this.specialkey=["Backspace","ArrowLeft","ArrowRight","ctrl+v"]}onselect(t){if(-1!==this.specialkey.indexOf(t.key))return;const n=this.elementref.nativeElement.value.concat(t.key);console.log("inputvalue : ",n,n?.length),n?.length>30&&t.preventDefault(),n&&!String(n).match(this.regex)&&t.preventDefault()}onpaste(t){const n=(t.originalEvent||t).clipevent.getData("text/plain");n&&(new RegExp("^[0-^(d*.)?d+$]+$").test(n)||n.preventDefault())}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(e.SBq))};static#t=this.\u0275dir=e.lG2({type:i,selectors:[["","appDecimal",""]],hostBindings:function(n,a){1&n&&e.NdJ("keydown",function(r){return a.onselect(r)})("Paste",function(r){return a.onpaste(r)})}})}return i})();function w(i,p){if(1&i&&(e.TgZ(0,"option",60),e._uU(1),e.qZA()),2&i){const t=p.$implicit;e.s9C("value",t.Material_Group_Master_Id),e.xp6(1),e.hij(" ",t.Material_Group,"")}}function D(i,p){if(1&i&&(e.TgZ(0,"option",60),e._uU(1),e.qZA()),2&i){const t=p.$implicit;e.s9C("value",t.Material_Type_Master_Id),e.xp6(1),e.hij(" ",t.Material_Type," ")}}function L(i,p){if(1&i&&(e.TgZ(0,"option",60),e._uU(1),e.qZA()),2&i){const t=p.$implicit;e.s9C("value",t.Material_Model_Master_Id),e.xp6(1),e.hij(" ",t.Material_Model," ")}}function N(i,p){if(1&i&&(e.TgZ(0,"option",60),e._uU(1),e.qZA()),2&i){const t=p.$implicit;e.s9C("value",t.Material_Brand_Master_Id),e.xp6(1),e.hij(" ",t.Material_Brand,"")}}function J(i,p){if(1&i&&(e.TgZ(0,"option",60),e._uU(1),e.qZA()),2&i){const t=p.$implicit;e.s9C("value",t.Material_UOM_Master_Id),e.xp6(1),e.hij("",t.Material_UOM," ")}}function k(i,p){if(1&i&&(e.ynx(0),e._UZ(1,"img",61),e.BQk()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("src",t.imageSrc,e.LSH)}}function Q(i,p){1&i&&(e.ynx(0),e.O4$(),e.TgZ(1,"svg",62),e._UZ(2,"path",63)(3,"path",64)(4,"polyline",65)(5,"line",66),e.qZA(),e.kcU(),e.TgZ(6,"span",67),e._uU(7,"Drag and drop or click to upload"),e.qZA(),e.BQk())}function q(i,p){if(1&i){const t=e.EpF();e.TgZ(0,"div",68)(1,"a",69),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.removeMaterialImage())}),e.O4$(),e.TgZ(2,"svg",70),e._UZ(3,"path",63)(4,"line",71)(5,"line",72)(6,"line",73)(7,"path",74)(8,"path",75),e.qZA()()()}}function B(i,p){1&i&&(e.TgZ(0,"span"),e._uU(1,"Please Enter the valid input "),e.qZA())}const O=function(i){return{"form-invalid-input":i}};let E=(()=>{class i{get materialID(){return this._materialID}set materialID(t){this._materialID=t,this.onMaterialIDChange()}constructor(t,n,a,l,r,f){this.materialApi=t,this.log=n,this.route=a,this.alert=l,this.sanitizer=r,this.credential=f,this.toggleEvent=new e.vpe,this.imageUpload=!1,this.isMaterialImageAvailable=!1,this.imageBase64="",this.materialMaster={},this.materialGroupList=[],this.materialTypeList=[],this.materialBrandList=[],this.materialModelList=[],this.materialUomList=[],this.subscription=new o.w0,this.validation={isInvalid:!1,isLoader:!1},this._materialID="",this.onPreInit()}onPreInit(){}isRightsExisting(){return!0}ngOnInit(){this.isRightsExisting()?this.onPageReady():this.route.navigateByUrl(s.Q.unAuthorizedUrl)}onPageReady(){this.subscription.add(this.onLoad().subscribe({next:t=>{},error:t=>{},complete:()=>{}}))}onLoad(){let t=(0,M.of)(null),n=(0,M.of)(null),a=(0,M.of)(null),l=(0,M.of)(null),r=(0,M.of)(null);return t=this.materialApi.getMaterialGroupList().pipe((0,h.b)({next:f=>{this.log.log("material group response : ",f),this.materialGroupList=f||[]}})),n=this.materialApi.getMaterialTypeList().pipe((0,h.b)({next:f=>{this.log.log("material type response : ",f),this.materialTypeList=f||[]}})),a=this.materialApi.getMaterialBrandList().pipe((0,h.b)({next:f=>{this.log.log("material brand response : ",f),this.materialBrandList=f||[]}})),l=this.materialApi.getMaterialModelList().pipe((0,h.b)({next:f=>{this.log.log("material modal response : ",f),this.materialModelList=f||[]}})),r=this.materialApi.getMaterialUomList().pipe((0,h.b)({next:f=>{this.log.log("material UOM response : ",f),this.materialUomList=f||[]}})),(0,_.D)({group:t,type:n,branch:a,model:l,uom:r})}onMaterialIDChange(){this.log.log("materialID : ",this.materialID),this.materialID?this.getMaterialDetail():(this.materialMaster={},this.removeMaterialImage())}getMaterialDetail(){this.subscription.add(this.materialApi.getMaterial(this.materialID).subscribe({next:t=>{this.log.log("material detail response : ",t),this.materialMaster=t||{},this.setMaterialMaster()},error:t=>{this.log.error(t,"material-master-detail","getMaterialDetail")}}))}setMaterialMaster(){this.materialMaster.Material_Image?(this.isMaterialImageAvailable=!0,this.imageSrc=this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+this.materialMaster.Material_Image)):(this.isMaterialImageAvailable=!1,this.log.log("material image not available, setting default image"),this.imageSrc=null)}saveOrUpdateMaterial(){if(this.validation.isInvalid=!1,this.validation.isLoader=!0,!(this.materialMaster.Material_Code&&this.materialMaster.Material_Name&&this.materialMaster.Part_Number&&this.materialMaster.Barcode))return this.log.log("mandatory fields are missing"),this.validation.isInvalid=!0,void(this.validation.isLoader=!1);this.imageBase64&&(this.materialMaster.Material_Image=this.imageBase64);const t=this.materialID?this.materialApi.updateMaterial(this.materialID,this.materialMaster):this.materialApi.saveMaterial(this.materialMaster);this.subscription.add(t.subscribe({next:n=>{this.log.log("material master save or update response :",n),n&&(this.alert.showMixinAlert(this.materialID?"Material master updated successfully !!!":"Material master saved successfully !!!"),this.close(!0));const a=setTimeout(()=>{this.validation.isLoader=!1,clearTimeout(a)},1e3)},error:n=>{this.log.error(n,"material-master-detail","saveOrUpdateMaterial");const a=setTimeout(()=>{this.validation.isLoader=!1,clearTimeout(a)},1e3)}}))}onLogoChange(t){if(t.target.files&&t.target.files[0])if(t.target.files[0].type&&"image"===t.target.files[0].type.split("/")[0])if(t.target.files[0].size<=1024e3){this.imageBase64="";const l=new FileReader;l.onload=r=>{this.log.log("events : ",r),this.imageSrc=r.target.result;const P=this.imageSrc.split(",");this.imageBase64=P.length>1?P[1]:"",this.isMaterialImageAvailable=!0},l.readAsDataURL(t.target.files[0]),t.target.value=""}else t.target.value="",this.alert.toastAlert("error","Max image upload size is 1MB only");else t.target.value="",this.alert.toastAlert("error","Could not support selected image format. Choose valid image file ")}removeMaterialImage(){this.isMaterialImageAvailable=!1,this.imageBase64="",this.materialMaster.Material_Image=""}close(t=!1){this.toggleEvent.emit(t),this.validation.isInvalid=!1}ngOnDestroy(){this.subscription.unsubscribe()}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(g.U),e.Y36(c.$),e.Y36(b.F0),e.Y36(C.c),e.Y36(y.H7),e.Y36(T.T))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-material-master-detail"]],inputs:{materialID:"materialID"},outputs:{toggleEvent:"toggleEvent"},decls:142,vars:40,consts:[[1,"modal-content"],[1,"modal-header"],[1,"d-flex","align-items-center","justify-content-between","w-100"],["id","staticBackdropLabel",1,"modal-title",3,"innerHtml"],[1,"d-flex","align-items-center","gap-2"],[1,"all-button","ms-3",3,"click"],[3,"innerHtml"],["type","button",1,"all-close-button",3,"click"],[1,"modal-body"],[1,"row"],[1,"col-md-4"],[1,"form-group","form-field-group"],["for","material-code"],[1,"required-field"],["data-validation-info","Enter the field",1,"form-input-field",3,"ngClass"],["type","text","id","material-code","name","material-code",1,"form-control",3,"ngModel","disabled","ngModelChange"],["for","material-name"],["type","text","id","material-name","name","material-name",1,"form-control",3,"ngModel","ngModelChange"],["for","material-partNumber"],["type","text","id","material-partNumber","name","material-partNumber",1,"form-control",3,"ngModel","ngModelChange"],["for","materaial-barcode"],["type","text","id","materail-barcode","name","materail-barcode",1,"form-control",3,"ngModel","ngModelChange"],["for","materail-hsnCode"],["data-validation-info","Enter the field",1,"form-input-field"],["type","text","id","materail-hsnCode","name","materail-hsnCode",1,"form-control",3,"ngModel","ngModelChange"],["for","material-group"],["name","material-group",1,"form-select",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["for","material-type "],["id","material-type","name","material-type",1,"form-select",3,"ngModel","ngModelChange"],["for","material-model"],["id","material-model","name","material-model",1,"form-select",3,"ngModel","ngModelChange"],["for","material-brand"],["id","material-brand","name","material-brand",1,"form-select",3,"ngModel","ngModelChange"],[1,"orm-group","form-field-group"],["for","material-uom"],["id","material-uom","name","material-uom",1,"form-select",3,"ngModel","ngModelChange"],[1,"col-md-12","form-group","form-field-group"],[1,"image-upload"],[1,"form-group","form-field-group","image-choose-container"],["for","warehouse-upload",1,"image-container-card"],[1,"image-container-image-card"],[4,"ngIf"],["type","file","accept","image/*","id","warehouse-upload",1,"d-none",3,"change"],["class","image-remove-icon",4,"ngIf"],[1,"col-md-6","form-group","form-field-group"],["for","material-gross-weight"],["type","text","id","material-gross-weight","name","material-gross-weight","appDecimal","",1,"form-control",3,"ngModel","ngModelChange"],["for","material-volume"],["type","text","id","material-volume","name","material-volume","appDecimal","",1,"form-control",3,"ngModel","ngModelChange"],["for","material-size"],["type","text","id","material-size","name","material-size","maxlength","50",1,"form-control",3,"ngModel","ngModelChange"],["for","materail-reorderLevel"],["type","text","id","material-reorderLevel","name","material-reorderLevel","appDecimal","",1,"form-control",3,"ngModel","ngModelChange"],["name","ngModel"],["for","material-mslQty"],["type","text","id","material-mslQty","name","material-mslQty","appDecimal","",1,"form-control",3,"ngModel","ngModelChange"],[1,"col-md-8"],["for","materail-notes"],["id","material-notes","name","material-notes","rows","4",1,"form-control",3,"ngModel","ngModelChange"],[3,"value"],["alt","Organization Image",3,"src"],["xmlns","http://www.w3.org/2000/svg","width","28","height","28","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor","fill","none","stroke-linecap","round","stroke-linejoin","round",1,"icon","icon-tabler","icon-tabler-cloud-upload"],["stroke","none","d","M0 0h24v24H0z","fill","none"],["d","M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"],["points","9 15 12 12 15 15"],["x1","12","y1","12","x2","12","y2","21"],[1,"d-block","w-100","text-center"],[1,"image-remove-icon"],[1,"d-block","text-danger",2,"cursor","pointer",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","20","height","20","viewBox","0 0 24 24","stroke-width","1.5","stroke","currentColor","fill","none","stroke-linecap","round","stroke-linejoin","round",1,"icon","icon-tabler","icon-tabler-trash"],["x1","4","y1","7","x2","20","y2","7"],["x1","10","y1","11","x2","10","y2","17"],["x1","14","y1","11","x2","14","y2","17"],["d","M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"],["d","M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"]],template:function(n,a){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div"),e._UZ(4,"h5",3),e.qZA(),e.TgZ(5,"div",4)(6,"button",5),e.NdJ("click",function(){return a.saveOrUpdateMaterial()}),e._UZ(7,"span",6),e.qZA(),e.TgZ(8,"button",7),e.NdJ("click",function(){return a.close()}),e._uU(9,"Close"),e.qZA()()()(),e.TgZ(10,"div",8)(11,"div",9)(12,"div",10)(13,"div",11)(14,"label",12)(15,"span"),e._uU(16,"Material Code"),e.qZA(),e.TgZ(17,"span",13),e._uU(18,"*"),e.qZA()(),e.TgZ(19,"div",14)(20,"input",15),e.NdJ("ngModelChange",function(r){return a.materialMaster.Material_Code=r}),e.qZA()()(),e.TgZ(21,"div",11)(22,"label",16)(23,"span"),e._uU(24,"Material Name"),e.qZA(),e.TgZ(25,"span",13),e._uU(26,"*"),e.qZA()(),e.TgZ(27,"div",14)(28,"input",17),e.NdJ("ngModelChange",function(r){return a.materialMaster.Material_Name=r}),e.qZA()()(),e.TgZ(29,"div",11)(30,"label",18)(31,"span"),e._uU(32,"Part Number"),e.qZA(),e.TgZ(33,"span",13),e._uU(34,"*"),e.qZA()(),e.TgZ(35,"div",14)(36,"input",19),e.NdJ("ngModelChange",function(r){return a.materialMaster.Part_Number=r}),e.qZA()()(),e.TgZ(37,"div",11)(38,"label",20)(39,"span"),e._uU(40,"Barcode"),e.qZA(),e.TgZ(41,"span",13),e._uU(42,"*"),e.qZA()(),e.TgZ(43,"div",14)(44,"input",21),e.NdJ("ngModelChange",function(r){return a.materialMaster.Barcode=r}),e.qZA()()(),e.TgZ(45,"div",11)(46,"label",22)(47,"span"),e._uU(48,"HSN Code"),e.qZA()(),e.TgZ(49,"div",23)(50,"input",24),e.NdJ("ngModelChange",function(r){return a.materialMaster.HSN_Code=r}),e.qZA()()()(),e.TgZ(51,"div",10)(52,"div",11)(53,"label",25)(54,"span"),e._uU(55,"Material Group"),e.qZA()(),e.TgZ(56,"div",23)(57,"select",26),e.NdJ("ngModelChange",function(r){return a.materialMaster.Material_Group_Master_Id=r}),e.YNc(58,w,2,2,"option",27),e.qZA()()(),e.TgZ(59,"div",11)(60,"label",28)(61,"span"),e._uU(62,"Material Type"),e.qZA()(),e.TgZ(63,"div",23)(64,"select",29),e.NdJ("ngModelChange",function(r){return a.materialMaster.Material_Type_Master_Id=r}),e.YNc(65,D,2,2,"option",27),e.qZA()()(),e.TgZ(66,"div",11)(67,"label",30)(68,"span"),e._uU(69,"Material Model"),e.qZA()(),e.TgZ(70,"div",23)(71,"select",31),e.NdJ("ngModelChange",function(r){return a.materialMaster.Material_Model_Master_Id=r}),e.YNc(72,L,2,2,"option",27),e.qZA()()(),e.TgZ(73,"div",11)(74,"label",32)(75,"span"),e._uU(76,"Material Brand"),e.qZA()(),e.TgZ(77,"div",23)(78,"select",33),e.NdJ("ngModelChange",function(r){return a.materialMaster.Material_Brand_Master_Id=r}),e.YNc(79,N,2,2,"option",27),e.qZA()()(),e.TgZ(80,"div",34)(81,"label",35)(82,"span"),e._uU(83,"UOM"),e.qZA()(),e.TgZ(84,"div",23)(85,"select",36),e.NdJ("ngModelChange",function(r){return a.materialMaster.Material_UOM_Master_Id=r}),e.YNc(86,J,2,2,"option",27),e.qZA()()(),e._UZ(87,"div",9),e.qZA(),e.TgZ(88,"div",10)(89,"div",37)(90,"div",38)(91,"div",39)(92,"label",40)(93,"div",41),e.YNc(94,k,2,1,"ng-container",42),e.YNc(95,Q,8,0,"ng-container",42),e.qZA(),e.TgZ(96,"div",23)(97,"input",43),e.NdJ("change",function(r){return a.onLogoChange(r)}),e.qZA()()(),e.YNc(98,q,9,0,"div",44),e.qZA()()(),e.TgZ(99,"div",37)(100,"div",9)(101,"div",45)(102,"label",46)(103,"span"),e._uU(104,"Gross Weight"),e.qZA()(),e.TgZ(105,"div",23)(106,"input",47),e.NdJ("ngModelChange",function(r){return a.materialMaster.Gross_Weight=r}),e.qZA()()(),e.TgZ(107,"div",45)(108,"label",48)(109,"span"),e._uU(110,"Volume"),e.qZA()(),e.TgZ(111,"div",23)(112,"input",49),e.NdJ("ngModelChange",function(r){return a.materialMaster.Volume=r}),e.qZA()()()()(),e.TgZ(113,"div",11)(114,"label",50)(115,"span"),e._uU(116,"Size/Dimensions"),e.qZA()(),e.TgZ(117,"div",23)(118,"input",51),e.NdJ("ngModelChange",function(r){return a.materialMaster.Size_Dimensions=r}),e.qZA()()()()(),e.TgZ(119,"div",9)(120,"div",10)(121,"div",11)(122,"label",52)(123,"span"),e._uU(124,"Reorder Level"),e.qZA()(),e.TgZ(125,"div",23)(126,"input",53,54),e.NdJ("ngModelChange",function(r){return a.materialMaster.Reorder_Quantity=r}),e.qZA(),e.YNc(128,B,2,0,"span",42),e.qZA()(),e.TgZ(129,"div",11)(130,"label",55)(131,"span"),e._uU(132,"MSL Qty"),e.qZA()(),e.TgZ(133,"div",23)(134,"input",56),e.NdJ("ngModelChange",function(r){return a.materialMaster.MSL_Quantity=r}),e.qZA()()()(),e.TgZ(135,"div",57)(136,"div",11)(137,"label",58)(138,"span"),e._uU(139,"Notes"),e.qZA()(),e.TgZ(140,"div",23)(141,"textarea",59),e.NdJ("ngModelChange",function(r){return a.materialMaster.Notes=r}),e.qZA()()()()()()()),2&n){const l=e.MAs(127);e.xp6(4),e.Q6J("innerHtml",a.materialID?"Update material":"Add Material",e.oJD),e.xp6(3),e.Q6J("innerHtml",a.materialID?"Update":"Save",e.oJD),e.xp6(12),e.Q6J("ngClass",e.VKq(32,O,a.validation.isInvalid&&!a.materialMaster.Material_Code)),e.xp6(1),e.Q6J("ngModel",a.materialMaster.Material_Code)("disabled",!!a.materialID),e.xp6(7),e.Q6J("ngClass",e.VKq(34,O,a.validation.isInvalid&&!a.materialMaster.Material_Name)),e.xp6(1),e.Q6J("ngModel",a.materialMaster.Material_Name),e.xp6(7),e.Q6J("ngClass",e.VKq(36,O,a.validation.isInvalid&&!a.materialMaster.Part_Number)),e.xp6(1),e.Q6J("ngModel",a.materialMaster.Part_Number),e.xp6(7),e.Q6J("ngClass",e.VKq(38,O,a.validation.isInvalid&&!a.materialMaster.Barcode)),e.xp6(1),e.Q6J("ngModel",a.materialMaster.Barcode),e.xp6(6),e.Q6J("ngModel",a.materialMaster.HSN_Code),e.xp6(7),e.Q6J("ngModel",a.materialMaster.Material_Group_Master_Id),e.xp6(1),e.Q6J("ngForOf",a.materialGroupList),e.xp6(6),e.Q6J("ngModel",a.materialMaster.Material_Type_Master_Id),e.xp6(1),e.Q6J("ngForOf",a.materialTypeList),e.xp6(6),e.Q6J("ngModel",a.materialMaster.Material_Model_Master_Id),e.xp6(1),e.Q6J("ngForOf",a.materialModelList),e.xp6(6),e.Q6J("ngModel",a.materialMaster.Material_Brand_Master_Id),e.xp6(1),e.Q6J("ngForOf",a.materialBrandList),e.xp6(6),e.Q6J("ngModel",a.materialMaster.Material_UOM_Master_Id),e.xp6(1),e.Q6J("ngForOf",a.materialUomList),e.xp6(8),e.Q6J("ngIf",a.isMaterialImageAvailable),e.xp6(1),e.Q6J("ngIf",!a.isMaterialImageAvailable),e.xp6(3),e.Q6J("ngIf",a.isMaterialImageAvailable),e.xp6(8),e.Q6J("ngModel",a.materialMaster.Gross_Weight),e.xp6(6),e.Q6J("ngModel",a.materialMaster.Volume),e.xp6(6),e.Q6J("ngModel",a.materialMaster.Size_Dimensions),e.xp6(8),e.Q6J("ngModel",a.materialMaster.Reorder_Quantity),e.xp6(2),e.Q6J("ngIf",!l.valid),e.xp6(6),e.Q6J("ngModel",a.materialMaster.MSL_Quantity),e.xp6(7),e.Q6J("ngModel",a.materialMaster.Notes)}},dependencies:[u.mk,u.sg,u.O5,v.YN,v.Kr,v.Fj,v.EJ,v.JJ,v.nD,v.On,I],styles:[".image-upload[_ngcontent-%COMP%]{position:relative}.image[_ngcontent-%COMP%]{position:absolute;width:370px;height:180px;top:23px;left:0}input[type=file][_ngcontent-%COMP%]::-webkit-file-upload-button{appearance:none;display:none}input[type=file][_ngcontent-%COMP%]{color:transparent}.image-choose-container[_ngcontent-%COMP%]{position:relative}.image-choose-container[_ngcontent-%COMP%]   .image-container-card[_ngcontent-%COMP%]{margin-top:1.5rem;margin-bottom:1rem;display:block;overflow:hidden;transition:all 2s ease-in;border:2px dashed #ccc;border-radius:4px;width:100%;height:167px;cursor:pointer}.image-choose-container[_ngcontent-%COMP%]   .image-container-card[_ngcontent-%COMP%]   .image-container-image-card[_ngcontent-%COMP%]{height:100%;display:flex;flex-wrap:wrap;align-content:center;justify-content:center}.image-choose-container[_ngcontent-%COMP%]   .image-container-card[_ngcontent-%COMP%]   .image-container-image-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:148px;max-width:100%}.image-choose-container[_ngcontent-%COMP%]   .image-remove-icon[_ngcontent-%COMP%]{display:none;bottom:10px;position:absolute;left:0;width:100%;text-align:center}.image-choose-container[_ngcontent-%COMP%]:hover   .image-remove-icon[_ngcontent-%COMP%]{display:block}.image-upload-container[_ngcontent-%COMP%]{position:relative;padding:1rem 0}.image-upload-container[_ngcontent-%COMP%]   .image-upload-box[_ngcontent-%COMP%]{border:2px dashed #ccc;border-radius:4px;width:100%;height:180px;display:flex;flex-wrap:wrap;align-content:center;justify-content:center}.upload[_ngcontent-%COMP%]{appearance:none;-webkit-appearance:none;height:180px}"]})}return i})();function R(i,p){if(1&i&&(e.TgZ(0,"th"),e.ynx(1),e._uU(2),e.BQk(),e.qZA()),2&i){const t=p.$implicit,n=e.oxw(2);e.xp6(2),e.Oqu(n.removeUS(t.key))}}function S(i,p){if(1&i&&(e.TgZ(0,"tr"),e.YNc(1,R,3,1,"th",23),e.ALo(2,"keyvalue"),e.qZA()),2&i){const t=p.$implicit,n=e.oxw();e.xp6(1),e.Q6J("ngForOf",e.xi3(2,1,t,n.originalOrder))}}function F(i,p){if(1&i&&(e.TgZ(0,"td"),e.ynx(1),e._uU(2),e.BQk(),e.qZA()),2&i){const t=p.$implicit;e.xp6(2),e.Oqu(t.value)}}function j(i,p){if(1&i){const t=e.EpF();e.TgZ(0,"tr",32),e.NdJ("click",function(){const l=e.CHM(t).$implicit,r=e.oxw();return e.KtG(r.onEditMaterial(l))}),e.YNc(1,F,3,1,"td",23),e.ALo(2,"keyvalue"),e.qZA()}if(2&i){const t=p.$implicit,n=e.oxw();e.xp6(1),e.Q6J("ngForOf",e.xi3(2,1,t,n.originalOrder))}}function Y(i,p){1&i&&(e.TgZ(0,"div",33)(1,"div",34),e._UZ(2,"img",35),e.qZA()())}const H=[{path:"",component:(()=>{class i{constructor(t,n,a,l){this.route=t,this.material=n,this.log=a,this.dataTable=l,this.dtOptions={},this.dtTrigger=new Z.x,this.materialMaster={},this.materialList=[],this.isTableDataRetrieved=!1,this.subscription=new o.w0,this.selectedMaterialID="",this.originalOrder=(r,f)=>0,this.onPreInit()}onPreInit(){}isRightsExisting(){return!0}ngOnInit(){this.isRightsExisting()?(this.getBasicUtility(),this.onPageReady()):this.route.navigateByUrl(s.Q.unAuthorizedUrl)}onPageReady(){this.getMaterialList()}getMaterialList(t=!1){this.subscription.add(this.material.getMaterialList().subscribe({next:n=>{this.log.log("material list response :",n),this.setMaterialList(n||[],t);const l=setTimeout(()=>{this.isTableDataRetrieved=!0,clearTimeout(l)},s.Q.tableLoaderDuration)},error:n=>{this.log.error(n,"material-master","getMaterialList");const a=setTimeout(()=>{this.isTableDataRetrieved=!0,clearTimeout(a)},s.Q.tableLoaderDuration)}}))}setMaterialList(t,n=!1){this.materialList=t||[],this.materialList.length&&(n?this.reRender():(this.dtTrigger.next(),jQuery("table").parents(".dataTables_scroll").length||setTimeout(()=>jQuery("table").wrap('<div class="dataTables_scroll" />'),100)))}reRender(){this.dtElement.dtInstance?this.dtElement.dtInstance.then(t=>{t.destroy(),this.dtTrigger.next(),setTimeout(()=>jQuery("table").wrap('<div class="dataTables_scroll" />'),100)}):(this.dtTrigger.next(),jQuery("table").parents(".dataTables_scroll").length||setTimeout(()=>jQuery("table").wrap('<div class="dataTables_scroll" />'),100))}removeUS(t){return t.replace(/_/g," ")}onEditMaterial(t){this.log.log("selected material : ",t);const n=t||{};n.Material_Master_Id?(this.selectedMaterialID=n.Material_Master_Id,this.openMaterialModal()):this.log.log("material ID is empty!")}onAddMaterial(){this.selectedMaterialID="",this.openMaterialModal()}openMaterialModal(){document.getElementById("material-master-open-modal")?.click()}closeMaterialModal(t=!1){document.getElementById("material-master-close-modal")?.click(),this.selectedMaterialID="",t&&(this.isTableDataRetrieved=!1,this.getMaterialList(!0))}getBasicUtility(){this.dtOptions=this.dataTable.getDataTableOptions()}navigateBack(){this.route.navigateByUrl("/home")}ngOnDestroy(){this.dtTrigger.unsubscribe(),this.subscription.unsubscribe()}static#e=this.\u0275fac=function(n){return new(n||i)(e.Y36(b.F0),e.Y36(g.U),e.Y36(c.$),e.Y36(m.n))};static#t=this.\u0275cmp=e.Xpm({type:i,selectors:[["app-material-master"]],viewQuery:function(n,a){if(1&n&&e.Gf(x.G,5),2&n){let l;e.iGM(l=e.CRH())&&(a.dtElement=l.first)}},decls:42,vars:15,consts:[[1,"breadcrumb-container"],[1,"breadcrumb-bar"],["aria-label","breadcrumb ",2,"--bs-breadcrumb-divider","'>'"],[1,"breadcrumb","mb-0"],["aria-current","page",1,"breadcrumb-item"],[1,"aside-container"],[1,"d-flex"],["type","button",1,"all-back-button","me-2",3,"click"],["xmlns","http://www.w3.org/2000/svg","className","icon icon-tabler icon-tabler-arrow-back-up","width","24","height","24","viewBox","0 0 24 24","strokeWidth","2","stroke","currentColor","fill","none","strokeLinecap","round","strokeLinejoin","round"],["stroke","none","d","M0 0h24v24H0z","fill","none"],["d","M9 14l-4 -4l4 -4"],["d","M5 10h11a4 4 0 1 1 0 8h-1"],[1,"hover-text"],[1,"all-button","outline","me-2",3,"routerLink"],[1,"all-button",3,"click"],[1,"document-main-container"],[1,"form-container"],[1,"row"],[1,"col-md-12"],[1,"data-table-scroll-container"],[1,"table-spinner-container"],["role","status",1,"spinner-border","text-success"],["datatable","",1,"row-border","hover",3,"dtOptions","dtTrigger"],[4,"ngFor","ngForOf"],[3,"click",4,"ngFor","ngForOf"],["class","no-record-found-container",4,"ngIf"],["id","material-master-modal","data-bs-backdrop","static","data-bs-keyboard","false","tabindex","-1","aria-labelledby","staticBackdropLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered","modal-xl"],[3,"materialID","toggleEvent"],[1,"d-none"],["id","material-master-open-modal","data-bs-toggle","modal","data-bs-target","#material-master-modal"],["id","material-master-close-modal","data-bs-dismiss","modal","data-bs-target","#material-master-modal","aria-label","Close"],[3,"click"],[1,"no-record-found-container"],[1,"no-record-found-img-div"],["src","../../../assets/images/no-data-found.png","alt","No data found","title","No data found"]],template:function(n,a){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"nav",2)(3,"ol",3)(4,"li",4),e._uU(5,"Material"),e.qZA()()()(),e.TgZ(6,"div",5)(7,"div",6)(8,"button",7),e.NdJ("click",function(){return a.navigateBack()}),e.TgZ(9,"span"),e.O4$(),e.TgZ(10,"svg",8),e._UZ(11,"path",9)(12,"path",10)(13,"path",11),e.qZA()(),e.kcU(),e.TgZ(14,"span",12),e._uU(15,"Back"),e.qZA()(),e.TgZ(16,"button",13)(17,"span"),e._uU(18,"Attributes"),e.qZA()(),e.TgZ(19,"button",14),e.NdJ("click",function(){return a.onAddMaterial()}),e.TgZ(20,"span"),e._uU(21,"Add Material"),e.qZA()()()()(),e.TgZ(22,"div",15)(23,"div",16)(24,"div",17)(25,"div",18)(26,"div",19)(27,"div",20),e._UZ(28,"div",21),e.qZA(),e.TgZ(29,"table",22)(30,"thead"),e.YNc(31,S,3,4,"tr",23),e.ALo(32,"slice"),e.qZA(),e.TgZ(33,"tbody"),e.YNc(34,j,3,4,"tr",24),e.qZA()()(),e.YNc(35,Y,3,0,"div",25),e.qZA()()()(),e.TgZ(36,"div",26)(37,"div",27)(38,"app-material-master-detail",28),e.NdJ("toggleEvent",function(r){return a.closeMaterialModal(r)}),e.qZA()()(),e.TgZ(39,"div",29),e._UZ(40,"button",30)(41,"button",31),e.qZA()),2&n&&(e.xp6(16),e.Q6J("routerLink","/material-attributes"),e.xp6(10),e.ekj("table-spinner",!a.isTableDataRetrieved)("hide-when-no-data",0==(null==a.materialList?null:a.materialList.length)),e.xp6(3),e.Q6J("dtOptions",a.dtOptions)("dtTrigger",a.dtTrigger),e.xp6(2),e.Q6J("ngForOf",e.Dn7(32,11,a.materialList,0,1)),e.xp6(3),e.Q6J("ngForOf",a.materialList),e.xp6(1),e.Q6J("ngIf",0==(null==a.materialList?null:a.materialList.length)&&a.isTableDataRetrieved),e.xp6(3),e.Q6J("materialID",a.selectedMaterialID))},dependencies:[u.sg,u.O5,b.rH,x.G,E,u.OU,u.Nd],styles:[".search-icon[_ngcontent-%COMP%]{top:10px;right:10px}.image-upload[_ngcontent-%COMP%]{position:relative}.image[_ngcontent-%COMP%]{position:absolute;width:370px;height:180px;top:23px;left:0}input[type=file][_ngcontent-%COMP%]::-webkit-file-upload-button{appearance:none;display:none}input[type=file][_ngcontent-%COMP%]{color:transparent}.upload[_ngcontent-%COMP%]{height:180px}.modal[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], .modal[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .modal[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:#001c8e}.modal[_ngcontent-%COMP%]   .modal-header[_ngcontent-%COMP%]{border-bottom:none}.modal[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .modal[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .modal[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{border:1px solid #001C8E}.modal[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{border-radius:15px}"]})}return i})()}];let z=(()=>{class i{static#e=this.\u0275fac=function(n){return new(n||i)};static#t=this.\u0275mod=e.oAB({type:i});static#a=this.\u0275inj=e.cJS({imports:[b.Bz.forChild(H),b.Bz]})}return i})(),G=(()=>{class i{static#e=this.\u0275fac=function(n){return new(n||i)};static#t=this.\u0275mod=e.oAB({type:i});static#a=this.\u0275inj=e.cJS({imports:[u.ez,z,v.UX,x.T,v.u5]})}return i})()},3359:(U,A,d)=>{d.d(A,{n:()=>v});var u=d(4946);let v=(()=>{class b{constructor(){}getDataTableOptions(Z,o,s){const g=s||"Data Export",c=Z??!0;let M={};return M=o?{pagingType:"full_numbers",pageLength:10,retrieve:!0,destroy:!0,processing:!0,bAutoWidth:!1,autoFill:!0,order:[[c?1:0,"asc"]],columnDefs:[c?{targets:[0],visible:!1,orderable:!1}:{targets:[0],visible:!0,orderable:!0}],info:!0,lengthMenu:[[10,25,50,-1],["10 Records","25 Records","50 Records","Show all"]],language:{paginate:{previous:'<i class="fas fa-caret-left datatable-nav-icon"></i>',next:'<i class="fas fa-caret-right datatable-nav-icon"></i>',first:'<i class="fas fa-step-backward"></i>',last:'<i class="fas fa-step-forward"></i>'},buttons:{copyTitle:"",copyKeys:"",copySuccess:""}},oLanguage:{sLengthMenu:" _MENU_ ",sInfo:"Showing _START_ to _END_ of _TOTAL_ Records",sSearch:"",searchPlaceholder:"Search"},dom:"lBfrtip",buttons:[{extend:"collection",className:"collection-tool-button",text:"Export",autoClose:!0,collectionLayout:"filter-column-layout",buttons:[{extend:"excelHtml5",filename:g,title:"",exportOptions:{columns:":visible"}},{extend:"print",header:!0,exportOptions:{columns:":visible"}},{extend:"csvHtml5",filename:g,title:"",exportOptions:{columns:":visible"}},{extend:"copy",header:!0,exportOptions:{columns:":visible"}},{extend:"pdfHtml5",filename:g,title:"",exportOptions:{columns:":visible"},orientation:"landscape"},{extend:"colvis",text:"Filter Columns",columns:":not(.noVis)"}]}]}:{pagingType:"full_numbers",pageLength:10,processing:!0,bAutoWidth:!1,autoFill:!0,order:[[c?1:0,"asc"]],columnDefs:[c?{targets:[0],visible:!1,orderable:!1}:{targets:[0],visible:!0,orderable:!0}],lengthMenu:[[10,25,50,-1],["10 Records","25 Records","50 Records","Show all"]],language:{paginate:{previous:'<i class="fas fa-caret-left datatable-nav-icon"></i>',next:'<i class="fas fa-caret-right datatable-nav-icon"></i>',first:'<i class="fas fa-step-backward"></i>',last:'<i class="fas fa-step-forward"></i>'}},oLanguage:{sLengthMenu:" _MENU_ ",sInfo:"Showing _START_ to _END_ of _TOTAL_ Records",sSearch:"",searchPlaceholder:"Search"}},M}static#e=this.\u0275fac=function(o){return new(o||b)};static#t=this.\u0275prov=u.Yz7({token:b,factory:b.\u0275fac,providedIn:"root"})}return b})()},627:(U,A,d)=>{d.d(A,{G:()=>b,T:()=>Z});var u=d(4946),b=function(){function o(s,e,g){this.el=s,this.vcr=e,this.renderer=g,this.dtOptions={}}return o.prototype.ngOnInit=function(){var s=this;this.dtTrigger?this.dtTrigger.subscribe(function(e){s.displayTable(e)}):this.displayTable(null)},o.prototype.ngOnDestroy=function(){this.dtTrigger&&this.dtTrigger.unsubscribe(),this.dt&&this.dt.destroy(!0)},o.prototype.displayTable=function(s){var e=this;s&&(this.dtOptions=s),this.dtInstance=new Promise(function(g,c){Promise.resolve(e.dtOptions).then(function(m){0===Object.keys(m).length&&0===$("tbody tr",e.el.nativeElement).length?c("Both the table and dtOptions cannot be empty"):(m.columns&&m.columns.forEach(function(h){var _;""===(null!==(_=h.id)&&void 0!==_?_:"").trim()&&(h.id=e.getColumnUniqueId())}),setTimeout(function(){var h={rowCallback:function(_,C,y){if(m.columns){var T=m.columns;e.applyNgPipeTransform(_,T),e.applyNgRefTemplate(_,T,C)}m.rowCallback&&m.rowCallback(_,C,y)}};h=Object.assign({},m,h),e.dt=$(e.el.nativeElement).DataTable(h),g(e.dt)}))})})},o.prototype.applyNgPipeTransform=function(s,e){e.filter(function(c){return c.ngPipeInstance&&!c.ngTemplateRef}).forEach(function(c){var m=c.ngPipeInstance,M=c.ngPipeArgs||[],h=e.filter(function(T){return!1!==T.visible}).findIndex(function(T){return T.id===c.id}),_=s.childNodes.item(h),C=$(_).text(),y=m.transform.apply(m,function(o,s,e){if(e||2===arguments.length)for(var m,g=0,c=s.length;g<c;g++)(m||!(g in s))&&(m||(m=Array.prototype.slice.call(s,0,g)),m[g]=s[g]);return o.concat(m||Array.prototype.slice.call(s))}([C],M,!1));$(_).text(y)})},o.prototype.applyNgRefTemplate=function(s,e,g){var c=this;e.filter(function(M){return M.ngTemplateRef&&!M.ngPipeInstance}).forEach(function(M){var h,_=(h=M.ngTemplateRef).ref,C=h.context,y=e.filter(function(D){return!1!==D.visible}).findIndex(function(D){return D.id===M.id}),T=s.childNodes.item(y);$(T).html("");var I=Object.assign({},C,C?.userData,{adtData:g}),w=c.vcr.createEmbeddedView(_,I);c.renderer.appendChild(T,w.rootNodes[0])})},o.prototype.getColumnUniqueId=function(){for(var s="",g=0;g<6;g++){var c=Math.floor(62*Math.random());s+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(c)}return s.trim()},o.\u0275fac=function(e){return new(e||o)(u.Y36(u.SBq),u.Y36(u.s_b),u.Y36(u.Qsj))},o.\u0275dir=u.lG2({type:o,selectors:[["","datatable",""]],inputs:{dtOptions:"dtOptions",dtTrigger:"dtTrigger"}}),o}(),x=d(6814),Z=function(){function o(){}return o.forRoot=function(){return{ngModule:o}},o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=u.oAB({type:o}),o.\u0275inj=u.cJS({imports:[x.ez]}),o}()}}]);