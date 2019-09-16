import { Component, OnInit } from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthState} from 'aws-amplify-angular/dist/src/providers';
import {AuthGuard} from '../../auth/auth.guard';

@Component({
  selector: 'ks-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {

  public loggedIn = false;

  constructor(private authGuard: AuthGuard) {
    authGuard.LoggedIn.subscribe((state: boolean) => this.loggedIn = state);
  }

  ngOnInit() {
  }

}
