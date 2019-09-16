import { Component, OnInit } from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthState} from 'aws-amplify-angular/dist/src/providers';
import {AuthClass} from 'aws-amplify';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../auth/login/login.component';

@Component({
  selector: 'ks-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'ks-db-frontend';

  public signedIn = false;

  public userName: string;

  constructor(private amplifyService: AmplifyService, private dialog: MatDialog ) {
    amplifyService.authStateChange$.subscribe((state: AuthState) => {
      if (state.state === 'signedIn') {
        this.userName = state.user.username;
        this.signedIn = true;
      } else {
        console.log(state.state);
        this.userName = '';
        this.signedIn = false;
      }
    });
  }

  public async  logout() {
    const auth: AuthClass = this.amplifyService.auth();
    await auth.signOut();
  }

  public login() {
    this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }

}
