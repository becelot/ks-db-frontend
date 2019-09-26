import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../auth/auth.guard';
import {Observable} from 'rxjs';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'ks-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {

  public loggedIn = false;
  public userName: Observable<string>;

  constructor(private authGuard: AuthGuard, private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    authGuard.LoggedIn.subscribe((state: boolean) => this.loggedIn = state);
    this.userName = authGuard.UserName;

    iconRegistry.addSvgIcon('database', domSanitizer.bypassSecurityTrustResourceUrl('assets/database.svg'));
    iconRegistry.addSvgIcon('dashboard', domSanitizer.bypassSecurityTrustResourceUrl('assets/home.svg'));
    iconRegistry.addSvgIcon('projects', domSanitizer.bypassSecurityTrustResourceUrl('assets/project-management.svg'));
  }

  ngOnInit() {
  }

}
