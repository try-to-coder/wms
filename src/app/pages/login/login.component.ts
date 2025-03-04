import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CredentialService } from 'src/app/services/credential.service';
import { EventService } from 'src/app/services/event.service';
import { LogService } from 'src/app/services/log.service';
import { EmployeeService } from 'src/app/services/master/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  changeType=true;
  passwordopen=false;
  passwordclose=true;

  currentYear: number = new Date().getFullYear();

  // for unsubscribe observable
  subscription: Subscription = new Subscription();

  public loginForm!: FormGroup;

  loginValidate = false;
  loginValLoader = false;
  invalidLoginMessage = '';

  constructor(private router: Router,
    private employee: EmployeeService,
    private log: LogService,
    private event: EventService,
    private credential: CredentialService,
    private utility: UtilityService,
    public formBuilder: FormBuilder) {
    this.onPreInit();
  }

  onPreInit() {
    this.loginForm = this.formBuilder.group({
      User_Name: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.loginValidate = true;
    this.loginValLoader = true;
    this.invalidLoginMessage = '';

    if (!this.loginForm.valid) {
      this.loginValLoader = false;
      return;
    }

    const loginDetail = this.utility.clone(this.loginForm.value);

    const loginObject = {
      User_Name: loginDetail.User_Name,
      Password: loginDetail.Password
    }

    this.loginRequest(loginObject);

    // this.router.navigateByUrl('/home');
  }

  loginRequest(login: any) {
    const loginObject = login || {};
    this.subscription.add(this.employee.login(loginObject).subscribe({
      next: (response) => {
        this.log.log('send object : ', loginObject, 'Login response ', response);
        const responseData = response || {};
        if (responseData.status == 'success') {
          const responseObject = responseData.data || {};
          if (responseObject.Employee_Master_Id) {
            this.setLoginResponse(responseObject);
          }
          else if (responseObject.Subscription_Status === 'EXPIRED') { // subscription expired
            this.invalidLoginMessage = 'Subscription Expired';
          } else { // invalid organization (Subscription_Status === 'UNKNOWN') // username or password incorrect
            this.invalidLoginMessage = 'Something went wrong. Please try again later';
          }
        }
        else {
          this.invalidLoginMessage = responseData.error?.message || "Username or Password Incorrect.";
        }
        setTimeout(() => this.loginValLoader = false, 1000);
      },
      error: (error) => {
        this.log.error(error, 'login', 'login');
      },
      complete: () => {
        this.log.log('login completed');
      }
    }));
  }

  setLoginResponse(responseObject: any) {
    const loginResponse = responseObject || {};

    if (loginResponse.Employee_Master_Id) {
      // reset local storage
      this.credential.restoreInfo(false);

      // Save response details in a object
      const clonedResponse = this.utility.clone(loginResponse);
      this.credential.saveLoginCredentials(clonedResponse, this.loginForm.value?.User_Name);

      // 
      const timeOutID = setTimeout(() => {
        this.redirectToHome(loginResponse.Employee_Software_Rights || '');
        clearTimeout(timeOutID);
      }, 1000);
    }
  }

  redirectToHome(rights: string, isCheck?: boolean) {

    this.event.publish('set-user-name-image', true); // 

    this.router.navigateByUrl('/home');

    // const rightsList = (rights || '').split(',');
    // this.log.log('rightsList : ', rightsList);
    // if (rightsList.length && rightsList[0]) {

    //   localStorage.setItem('is-login-request', '1');
    //   if (!rightsList.includes(RightsList.Dashboard)) {
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.router.navigateByUrl('/dashboard');
    // }
    // else {
    //   if (isCheck) {
    //     return;
    //   }
    //   this.invalidLoginMessage = "User don't have any rights. Contact your admin";
    //   // this.alert.toastAlert('warning', "User don't have any rights. Contact your admin");
    // }
  }

  
  onpass(){
    this.changeType=!this.changeType;
    this.passwordopen=!this.passwordopen;
    this.passwordclose =!this.passwordclose
  }
  onclose(){
    this.changeType=!this.changeType;
    this.passwordopen=!this.passwordopen;
    this.passwordclose =!this.passwordclose
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
