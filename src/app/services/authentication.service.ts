import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  generateToken(isLogin?: boolean): Observable<boolean> {
    const isLoginRequest = isLogin || false;
    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
      return;
    });
  }
  
} 
