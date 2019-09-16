import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthClass} from 'aws-amplify';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private amplifySerice: AmplifyService, private router: Router) {
    const auth: AuthClass = this.amplifySerice.auth();
    auth.currentUserPoolUser()
      .then(user => {
        this.loggedIn.next(true);
        this.userName.next(user.getUsername());
      })
      .catch(_ => {
        this.loggedIn.next(true);
        this.userName.next('');
      });

    this.amplifySerice.authStateChange$.subscribe(state => {
      this.loggedIn.next(state.state === 'signedIn');
      if (state.user && state.user.username) {
        this.userName.next(state.user.username);
      } else {
        this.userName.next('');
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const auth: AuthClass = this.amplifySerice.auth();
    return auth.currentUserPoolUser().then(_ => true).catch(_ => this.router.parseUrl('/auth/login'));
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const auth: AuthClass = this.amplifySerice.auth();
    return auth.currentUserPoolUser().then(_ => true).catch(_ => this.router.parseUrl('/auth/login'));
  }

  public get LoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public get UserName(): Observable<string> {
    return this.userName.asObservable();
  }
}
