import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthClass, Auth, Hub} from 'aws-amplify';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    const auth: AuthClass = Auth;

    auth.currentUserPoolUser()
      .then(user => {
        this.loggedIn.next(true);
        this.userName.next(user.getUsername());
      })
      .catch(_ => {
        this.loggedIn.next(false);
        this.userName.next('');
      });

    Hub.listen('auth', data => {
      this.loggedIn.next(data.payload.event === 'signIn');
      if (data.payload.data && data.payload.data.username) {
        this.userName.next(data.payload.data.username);
      } else {
        this.userName.next('');
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const auth: AuthClass = Auth;
    return auth.currentUserPoolUser().then(_ => true).catch(_ => this.router.parseUrl('/auth/login'));
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const auth: AuthClass = Auth;
    return auth.currentUserPoolUser().then(_ => true).catch(_ => this.router.parseUrl('/auth/login'));
  }

  public get LoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public get LoggedInSync(): boolean {
    return this.loggedIn.getValue();
  }

  public get UserName(): Observable<string> {
    return this.userName.asObservable();
  }
}
