import { Injectable } from '@angular/core';
import { AuthClass } from '@aws-amplify/auth';
import Auth from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: AuthClass;

  constructor() {
    this.auth = Auth;
  }

  public get Auth(): AuthClass {
    return this.auth;
  }
}
