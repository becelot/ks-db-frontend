import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Auth, {AuthClass} from '@aws-amplify/auth';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../auth/login/login.component';
import {AuthGuard} from '../auth/auth.guard';
import {Observable} from 'rxjs';
import * as Hammer from 'hammerjs';

@Component({
  selector: 'ks-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {
  title = 'ks-db-frontend';

  public signedIn: Observable<boolean>;

  public userName: Observable<string>;

  public sidenavOpen = true;

  @ViewChild('content', { read: ElementRef, static: true}) ref: ElementRef;


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

  public toggleNav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  ngAfterViewInit(): void {
    const hammertime = new Hammer(this.ref.nativeElement, {});
    hammertime.get('pan').set({ threshold: 100});
    hammertime.on('panright', (ev) => {
      if (ev.pointerType !== 'mouse') {
        this.sidenavOpen = true;
      }
    });
    hammertime.on('panleft', (ev) => {
      if (ev.pointerType !== 'mouse') {
        this.sidenavOpen = false;
      }
    });
  }
}
