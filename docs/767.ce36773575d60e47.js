"use strict";(self.webpackChunkwms_web_alstom=self.webpackChunkwms_web_alstom||[]).push([[767],{767:(T,d,a)=>{a.r(d),a.d(d,{LoginModule:()=>P});var p=a(6814),c=a(2253),s=a(6223),m=a(7394),e=a(4946),u=a(3414),h=a(2553),f=a(1457),v=a(6551),_=a(6815);function y(n,g){if(1&n){const i=e.EpF();e.TgZ(0,"img",29),e.NdJ("click",function(){e.CHM(i);const o=e.oxw();return e.KtG(o.onpass())}),e.qZA()}}function w(n,g){if(1&n){const i=e.EpF();e.TgZ(0,"img",30),e.NdJ("click",function(){e.CHM(i);const o=e.oxw();return e.KtG(o.onclose())}),e.qZA()}}function b(n,g){if(1&n&&(e.TgZ(0,"div",31),e._UZ(1,"label",32),e.qZA()),2&n){const i=e.oxw();e.xp6(1),e.Q6J("innerHtml",i.invalidLoginMessage,e.oJD)}}function C(n,g){1&n&&(e.TgZ(0,"div",33)(1,"span",34),e._uU(2,"Loading..."),e.qZA()())}const x=[{path:"",component:(()=>{class n{constructor(i,t,o,r,l,O,Z){this.router=i,this.employee=t,this.log=o,this.event=r,this.credential=l,this.utility=O,this.formBuilder=Z,this.changeType=!0,this.passwordopen=!1,this.passwordclose=!0,this.currentYear=(new Date).getFullYear(),this.subscription=new m.w0,this.loginValidate=!1,this.loginValLoader=!1,this.invalidLoginMessage="",this.onPreInit()}onPreInit(){this.loginForm=this.formBuilder.group({User_Name:["",s.kI.compose([s.kI.required])],Password:["",s.kI.compose([s.kI.required])]})}ngOnInit(){}onLogin(){if(this.loginValidate=!0,this.loginValLoader=!0,this.invalidLoginMessage="",!this.loginForm.valid)return void(this.loginValLoader=!1);const i=this.utility.clone(this.loginForm.value);this.loginRequest({User_Name:i.User_Name,Password:i.Password})}loginRequest(i){const t=i||{};this.subscription.add(this.employee.login(t).subscribe({next:o=>{this.log.log("send object : ",t,"Login response ",o);const r=o||{};if("success"==r.status){const l=r.data||{};l.Employee_Master_Id?this.setLoginResponse(l):this.invalidLoginMessage="EXPIRED"===l.Subscription_Status?"Subscription Expired":"Something went wrong. Please try again later"}else this.invalidLoginMessage=r.error?.message||"Username or Password Incorrect.";setTimeout(()=>this.loginValLoader=!1,1e3)},error:o=>{this.log.error(o,"login","login")},complete:()=>{this.log.log("login completed")}}))}setLoginResponse(i){const t=i||{};if(t.Employee_Master_Id){this.credential.restoreInfo(!1);const o=this.utility.clone(t);this.credential.saveLoginCredentials(o,this.loginForm.value?.User_Name);const r=setTimeout(()=>{this.redirectToHome(t.Employee_Software_Rights||""),clearTimeout(r)},1e3)}}redirectToHome(i,t){this.event.publish("set-user-name-image",!0),this.router.navigateByUrl("/home")}onpass(){this.changeType=!this.changeType,this.passwordopen=!this.passwordopen,this.passwordclose=!this.passwordclose}onclose(){this.changeType=!this.changeType,this.passwordopen=!this.passwordopen,this.passwordclose=!this.passwordclose}ngOnDestroy(){this.subscription.unsubscribe()}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(c.F0),e.Y36(u.G),e.Y36(h.$),e.Y36(f.P),e.Y36(v.T),e.Y36(_.t),e.Y36(s.qu))};static#n=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-login"]],decls:49,vars:6,consts:[[1,"logo-page","container-fluid","full"],[1,"row"],[1,"col-sm-12","col-md-5","col-lg-7"],[1,"content-display"],[1,"aside"],[1,"last"],[1,"col-sm-12","col-md-5","col-lg-5","login-alignment"],[1,""],[1,"bg-white","p-5","login-container"],[1,"d-flex","justify-content-center","align-items-center"],["src","../../../assets/images/warehouse_logo.png","alt",""],[1,"text-center"],[1,"login-title"],["autocomplete","off",1,"login-content-form","validate-form",3,"formGroup","ngSubmit"],[1,"mb-3"],["for","exampleInputEmail1",1,"form-label"],["type","email","id","exampleInputEmail1","aria-describedby","emailHelp","formControlName","User_Name","maxlength","100",1,"form-control"],["id","emailHelp",1,"form-text"],["for","exampleInputPassword1",1,"form-label"],[1,"position-relative"],["id","exampleInputPassword1","formControlName","Password","maxlength","100",1,"form-control",3,"type"],["src","../../../assets/icons/password.svg ","class","position-absolute password","alt","",3,"click",4,"ngIf"],["src","../../../assets/icons/password-open.svg","class","position-absolute password1","alt","",3,"click",4,"ngIf"],[1,"d-flex","justify-content-end","align-items-center"],["href","#"],["class","login-invalid-container",4,"ngIf"],[1,"mt-3"],["type","submit",1,"login-button"],["class","spinner-border","role","status",4,"ngIf"],["src","../../../assets/icons/password.svg ","alt","",1,"position-absolute","password",3,"click"],["src","../../../assets/icons/password-open.svg","alt","",1,"position-absolute","password1",3,"click"],[1,"login-invalid-container"],[3,"innerHtml"],["role","status",1,"spinner-border"],[1,"visually-hidden"]],template:function(t,o){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div")(6,"h1"),e._uU(7,"Warehouse"),e.qZA(),e.TgZ(8,"h1"),e._uU(9,"Management"),e.qZA(),e.TgZ(10,"h1"),e._uU(11,"System"),e.qZA()()(),e.TgZ(12,"div",5),e._uU(13," It incorporates features such as mobile RF barcode scanning, defined strategies for putaway and picking, task management, return authorization receipts, and cycle count plans "),e.qZA()()(),e.TgZ(14,"div",6)(15,"div",7)(16,"div",8)(17,"div")(18,"div",9),e._UZ(19,"img",10),e.qZA(),e.TgZ(20,"div",11)(21,"small"),e._uU(22,"Warehouse Management Software"),e.qZA()(),e.TgZ(23,"div",12)(24,"h1"),e._uU(25,"LOG IN"),e.qZA()(),e.TgZ(26,"form",13),e.NdJ("ngSubmit",function(){return o.onLogin()}),e.TgZ(27,"div",14)(28,"label",15),e._uU(29,"Email address"),e.qZA(),e._UZ(30,"input",16),e.TgZ(31,"div",17),e._uU(32,"We'll never share your email with anyone else."),e.qZA()(),e.TgZ(33,"div",14)(34,"label",18),e._uU(35,"Password"),e.qZA(),e.TgZ(36,"div",19),e._UZ(37,"input",20),e.YNc(38,y,1,0,"img",21),e.YNc(39,w,1,0,"img",22),e.qZA()(),e.TgZ(40,"div",23)(41,"a",24),e._uU(42,"Forget password"),e.qZA()(),e.YNc(43,b,2,1,"div",25),e.TgZ(44,"div",26)(45,"button",27)(46,"span"),e._uU(47,"LOG IN"),e.qZA(),e.YNc(48,C,3,0,"div",28),e.qZA()()()()()()()()()),2&t&&(e.xp6(26),e.Q6J("formGroup",o.loginForm),e.xp6(11),e.Q6J("type",o.changeType?"password":"text"),e.xp6(1),e.Q6J("ngIf",o.passwordclose),e.xp6(1),e.Q6J("ngIf",o.passwordopen),e.xp6(4),e.Q6J("ngIf",o.invalidLoginMessage),e.xp6(5),e.Q6J("ngIf",o.loginValLoader))},dependencies:[p.O5,s._Y,s.Fj,s.JJ,s.JL,s.nD,s.sg,s.u],styles:[".content-display[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100vh}.content-display[_ngcontent-%COMP%]   .aside[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;background-color:#000;color:#fff;padding:5% 10%;opacity:.8;margin-left:10%}.content-display[_ngcontent-%COMP%]   .aside[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2.75rem;line-height:1.75ch}.content-display[_ngcontent-%COMP%]   .last[_ngcontent-%COMP%]{color:#fff;width:70%;padding:5rem 0}.login-alignment[_ngcontent-%COMP%]{display:flex;justify-content:center}.logo-page[_ngcontent-%COMP%]{height:100vh;width:100%;position:fixed;top:0;left:0;z-index:5;background-image:url(background_logo.bb3150ccb79671a9.png);background-size:cover;background-repeat:no-repeat;background-position:center}.forms[_ngcontent-%COMP%]{height:768px;top:0;left:892px;width:420px}.forms[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], .forms[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], .forms[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{color:#001c8e}.password[_ngcontent-%COMP%]{top:10px;right:10px}.password1[_ngcontent-%COMP%]{top:12px;right:10px}.footer[_ngcontent-%COMP%]{margin-top:10%}.login-button[_ngcontent-%COMP%]{position:relative;background-color:#001c8e;font-weight:700;width:100%;color:#fff;padding:.5rem;border-radius:.25rem}.login-button[_ngcontent-%COMP%]   .spinner-border[_ngcontent-%COMP%]{height:1.25rem;width:1.25rem;border-width:3px;position:absolute;top:8px;right:8px}.login-invalid-container[_ngcontent-%COMP%]{text-align:center;color:var(--bs-danger);margin-top:.5rem}.login-container[_ngcontent-%COMP%]{width:400px;margin-right:20%}.login-title[_ngcontent-%COMP%]{padding:2%;text-align:center}.login-container[_ngcontent-%COMP%]{height:100vh;display:flex;align-items:center}@media only screen and (max-width: 992px){.logo-page[_ngcontent-%COMP%]{background-size:cover}.content-display[_ngcontent-%COMP%]{display:none}.login-container[_ngcontent-%COMP%]{width:400px;margin:0% 20%}}@media only screen and (max-width: 576px){.login-alignment[_ngcontent-%COMP%]{display:flex;justify-content:center}.logo-page[_ngcontent-%COMP%]{background-image:none;background-color:#fff}.login-container[_ngcontent-%COMP%]{width:400px;margin:10% 0%}}"]})}return n})()}];let M=(()=>{class n{static#e=this.\u0275fac=function(t){return new(t||n)};static#n=this.\u0275mod=e.oAB({type:n});static#t=this.\u0275inj=e.cJS({imports:[c.Bz.forChild(x),c.Bz]})}return n})(),P=(()=>{class n{static#e=this.\u0275fac=function(t){return new(t||n)};static#n=this.\u0275mod=e.oAB({type:n});static#t=this.\u0275inj=e.cJS({imports:[p.ez,s.u5,s.UX,M]})}return n})()}}]);