import { Component, OnInit } from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthState} from 'aws-amplify-angular/dist/src/providers';
import {AuthGuard} from '../../auth/auth.guard';
import {Observable} from 'rxjs';
import {auth} from 'aws-amplify-angular/dist/src/assets/data-test-attributes';

@Component({
  selector: 'ks-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {

  public loggedIn = false;
  public userName: Observable<string>;

  constructor(private authGuard: AuthGuard) {
    authGuard.LoggedIn.subscribe((state: boolean) => this.loggedIn = state);
    this.userName = authGuard.UserName;
  }

  ngOnInit() {
  }

}
