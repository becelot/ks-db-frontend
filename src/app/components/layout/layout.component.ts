import { Component, OnInit } from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthState} from 'aws-amplify-angular/dist/src/providers';

@Component({
  selector: 'ks-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'ks-db-frontend';

  public signedIn = false;

  public userName: string;

  constructor(private amplifyService: AmplifyService ) {
    amplifyService.authStateChange$.subscribe((state: AuthState) => {
      if (state.state === 'signedIn') {
        this.userName = state.user.username;
        this.signedIn = true;
      }
    });
  }

}
