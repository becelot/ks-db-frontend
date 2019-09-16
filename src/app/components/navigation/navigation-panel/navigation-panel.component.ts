import { Component, OnInit } from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthState} from 'aws-amplify-angular/dist/src/providers';

@Component({
  selector: 'ks-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {

  public loggedIn = false;

  constructor(private amplifyService: AmplifyService) {
    amplifyService.authStateChange$.subscribe((state: AuthState) => {
      this.loggedIn = state.state === 'signedIn';
    });
  }

  ngOnInit() {
  }

}
