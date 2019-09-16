import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';
import { DocumentComponent } from './components/document/document.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import { StartpageComponent } from './components/startpage/startpage.component';
import { LoginComponent } from './components/auth/login/login.component';
import {AuthorizationComponent} from './components/auth/authorization/authorization.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialog, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatProgressSpinnerModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { WarningDialogComponent } from './components/dialogs/warning-dialog/warning-dialog.component';
import {NavigationModule} from './components/navigation/navigation.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    FileViewerComponent,
    DocumentComponent,
    StartpageComponent,
    LoginComponent,
    AuthorizationComponent,
    LayoutComponent,
    WarningDialogComponent,
  ],
  imports: [
    BrowserModule,
    NavigationModule,
    AmplifyAngularModule,
    AppRoutingModule,
    AngularSvgIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    AmplifyService
  ],
  entryComponents: [
    WarningDialogComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
