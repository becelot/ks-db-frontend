import { Component, OnInit } from '@angular/core';
import {Auth, AuthClass} from 'aws-amplify';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../auth/login/login.component';
import {AuthGuard} from '../auth/auth.guard';
import {Observable} from 'rxjs';

@Component({
  selector: 'ks-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'ks-db-frontend';

  public signedIn: Observable<boolean>;

  public userName: Observable<string>;

  constructor(private authGuard: AuthGuard, private dialog: MatDialog ) {
    this.signedIn = authGuard.LoggedIn;
    this.userName = authGuard.UserName;
  }

  public async  logout() {
    const auth: AuthClass = Auth;
    await auth.signOut();
  }

  public login() {
    this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }

}
