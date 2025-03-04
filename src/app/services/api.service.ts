import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, mergeMap, Observable, of, retry, throwError, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { AuthenticationService } from './authentication.service';
import { CredentialService } from './credential.service';
import { DataSanitizerService } from './data-sanitizer.service';
import { EventService } from './event.service';
import { LogService } from './log.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  private requestTimeout = 50000;
  private noNetworkErrorMessage = { code: '0', message: 'Internet connection not available' };
  private headers: any;

  private token = ''; // oauth token
  private orgToken = ''; // for send organization code in key 'OID'
  private empToken = ''; // for send employee code in key 'EID'

  // for unsubscribe observable
  // subscription: Subscription = new Subscription();

  constructor(public http: HttpClient,
    private authService: AuthenticationService,
    private events: EventService,
    private router: Router,
    private log: LogService,
    private alert: AlertService,
    private credential: CredentialService,
    private dataSanitizer: DataSanitizerService,
    private utility: UtilityService) {
  }

  /**
   * Http get method that returns http response as JSON object
   * @param url Api controller and method url
   * @param params Params to send
   * @param headers headers to send
   */
  get(url: string, params?: any, headers?: HttpHeaders, isLogin?: boolean, isNoCache?: boolean):Observable<any> {
    // if connection not available do not allow further
    if (!navigator.onLine) {
      //this.log.log('error', this.noNetworkErrorMessage);
      this.log.log(this.noNetworkErrorMessage);
      return of(null);
    }

    const isLoginRequest = isLogin || false;
    return this.authService.generateToken(isLoginRequest).pipe(mergeMap((isValidToken: boolean) => {
      // this.log.log('isValidToken : ', isValidToken);
      if (isValidToken) {

        this.token = this.credential.getLoginCredentials('AuthToken');
        this.orgToken = this.credential.getLoginCredentials('Organization_Code');
        this.empToken = this.credential.getLoginCredentials('Employee_Code');

        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).
          set('OID', this.orgToken).
          set('EID', this.empToken);
        if (isNoCache) {
          this.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
          this.headers.set('Pragma', 'no-cache');
          this.headers.set('Expires', '0');
        }

        this.headers = headers || this.headers;

        const encodedUrl = encodeURI(this.baseUrl + url);

        if (params) {
          return this.http.get(encodedUrl, { headers: this.headers, params })
            .pipe(timeout(this.requestTimeout), catchError(error => this.handleError(error, url)));
        } else {
          return this.http.get(encodedUrl, { headers: this.headers })
            .pipe(timeout(this.requestTimeout), catchError(error => this.handleError(error, url)));
        }
      }
      else {
        return of(null);
      }
    }));

    // For slow network increase timeout
    // if (this.network.getType() === '2g') {
    //   this.requestTimeout = 15000;
    // }
  }

  /**
   * Http post method that returns http response as JSON object
   * @param url Api controller and method url
   * @param sendObject Data to be sent with http request
   */
  post(url: string, sendObject: any, headers?: HttpHeaders, isLogin?: boolean, timeOut?: number) {
    this.requestTimeout = timeOut || this.requestTimeout;
    // if connection not available do not allow further
    if (!navigator.onLine) {
      this.log.log('error', this.noNetworkErrorMessage);
      return throwError(this.noNetworkErrorMessage);
    }

    // For slow network increase timeout
    // if (this.network.getType() === '2g') {
    //   this.requestTimeout = 15000;
    // }

    const isLoginRequest = isLogin || false;

    return this.authService.generateToken(isLoginRequest).pipe(mergeMap((isValidToken: boolean) => {
      if (isValidToken) {
        this.token = this.credential.getLoginCredentials('AuthToken');
        this.orgToken = this.credential.getLoginCredentials('Organization_Code');
        this.empToken = this.credential.getLoginCredentials('Employee_Code');

        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).
          set('OID', this.orgToken).
          set('EID', this.empToken);
        this.headers = headers || this.headers;

        if (sendObject) {
          sendObject = this.dataSanitizer.removeInvalidData(sendObject);
        }

        const encodedUrl = encodeURI(this.baseUrl + url);

        return this.http.post(encodedUrl, sendObject, { headers: this.headers })
          .pipe(timeout(this.requestTimeout), catchError(error => this.handleError(error, url)));
      }
      else {
        return of(null);
      }
    }));
  }

  /**
   * 
   * @param url 
   * @param sendObject 
   * @param headers 
   * @param isLogin 
   * @returns 
   */
  put(url: string, sendObject?: any, headers?: HttpHeaders, isLogin?: boolean) {
    // this.requestTimeout = 20000;
    // if connection not available do not allow further
    if (!navigator.onLine) {
      this.log.log('error', this.noNetworkErrorMessage);
      return throwError(this.noNetworkErrorMessage);
    }

    // For slow network increase timeout
    // if (this.network.getType() === '2g') {
    //   this.requestTimeout = 15000;
    // }

    const isLoginRequest = isLogin || false;

    return this.authService.generateToken(isLoginRequest).pipe(mergeMap((isValidToken: boolean) => {
      if (isValidToken) {
        this.token = this.credential.getLoginCredentials('AuthToken');
        this.orgToken = this.credential.getLoginCredentials('Organization_Code');
        this.empToken = this.credential.getLoginCredentials('Employee_Code');

        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).
          set('OID', this.orgToken).
          set('EID', this.empToken);
        this.headers = headers || this.headers;

        if (sendObject) {
          sendObject = this.dataSanitizer.removeInvalidData(sendObject);
        }
        const encodedUrl = encodeURI(this.baseUrl + url);
        return this.http.put(encodedUrl, sendObject, { headers: this.headers })
          .pipe(timeout(this.requestTimeout), catchError(error => this.handleError(error, url)));
      }
      else {
        return of(null);
      }
    }));
  }

  /**
   * 
   * @param url 
   * @param params 
   * @param headers 
   * @param isLogin 
   * @returns 
   */
  delete(url: string, sendObject?: any, headers?: HttpHeaders, isLogin?: boolean) {
    // this.requestTimeout = 20000;
    // if connection not available do not allow further
    if (!navigator.onLine) {
      this.log.log('error', this.noNetworkErrorMessage);
      return throwError(this.noNetworkErrorMessage);
    }

    // For slow network increase timeout
    // if (this.network.getType() === '2g') {
    //   this.requestTimeout = 15000;
    // }

    const isLoginRequest = isLogin || false;

    return this.authService.generateToken(isLoginRequest).pipe(mergeMap((isValidToken: boolean) => {
      if (isValidToken) {
        this.token = this.credential.getLoginCredentials('AuthToken');
        this.orgToken = this.credential.getLoginCredentials('Organization_Code');
        this.empToken = this.credential.getLoginCredentials('Employee_Code');

        this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).
          set('OID', this.orgToken).
          set('EID', this.empToken);
        this.headers = headers || this.headers;

        const encodedUrl = encodeURI(this.baseUrl + url);

        if (sendObject) {
          sendObject = this.dataSanitizer.removeInvalidData(sendObject);
          return this.http.delete(encodedUrl, { headers: this.headers })
            .pipe(timeout(this.requestTimeout), catchError(error => this.handleError(error, url)));
        }

        return this.http.delete(encodedUrl, { headers: this.headers })
          .pipe(timeout(this.requestTimeout), catchError(error => this.handleError(error, url)));
      }
      else {
        return of(null);
      }
    }));
  }

  handleError(error: HttpErrorResponse, url?: string) {
    // this.utility.hideLoading(); // hiding loading in case if didn't handle in component class
    let errorCode;
    let errorMessage = '';
    // console.error(JSON.stringify(error), 'API');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorCode = error.status ? error.status : '';
      errorMessage = error.error.message ? error.error.message : '';
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorCode = error.status ? error.status : 0;
      if (errorCode === 0) {
        if (error.message?.includes('Timeout')) {
          errorMessage = 'Timeout has occurred. Check your connection and retry';
        } else {
          errorMessage = 'Unknown error';
        }
      } else if (errorCode === 404) {
        errorMessage = 'Page not found';
      } else if (errorCode === 401) {
        // errorMessage = 'Authorization denied';
        errorMessage = 'Your session has expired. Please login again';
      } else if (errorCode === 403) {
        errorMessage = 'Forbidden';
      } else if (errorCode === 503) {
        errorMessage = 'Service unavailable';
      } else if (errorCode === 501) {
        errorMessage = 'Function not implemented';
      } else if (errorCode === 500) {
        errorMessage = 'Internal server error';
      } else if (errorCode === 400) {
        errorMessage = 'Bad request';
      } else {
        errorMessage = error.error?.message || '';
      }
    }
    // return an observable with a user-facing error message
    this.errorAlert(errorMessage, errorCode, url);
    return throwError({
      code: errorCode,
      message: errorMessage
    });
  }

  errorAlert(errorMessage: string, errorCode?: any, url?: string) {
    if (errorCode === 401) {
      // this.log.log('warning', errorMessage, url);
      if (url != '/general/api-version') {
        // this.alert.errorAlert('', errorMessage, '/login');
        this.events.publish('session-logout', '');
        // this.router.navigate(['/login']);
      }
      // this.router.navigate(['/login']);
    } else if (errorCode !== 0) {
      this.log.log('Error ' + errorCode, errorMessage);
    } else {
      this.log.log('error', errorMessage);
    }
  }
}
