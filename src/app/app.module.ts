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
import {AuthGuard} from './components/auth/auth.guard';
import { InputDialogComponent } from './components/dialogs/input-dialog/input-dialog.component';
import {ShowdownModule} from 'ngx-showdown';

import * as highlightExtension from 'showdown-highlight';
import * as Showdown from 'showdown';
import {MonacoEditorModule} from 'ngx-monaco-editor';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const mdToSdExtension: Showdown.RegexReplaceExtension = {
  type: 'lang',
  regex: new RegExp('`Markdown`', 'g'),
  replace: '<button mat-icon-button><mat-icon>folder</mat-icon></button>'
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
    InputDialogComponent,
  ],
  imports: [
    BrowserModule,
    NavigationModule,
    AmplifyAngularModule,
    ShowdownModule.forRoot({
      extensions: [highlightExtension, mdToSdExtension]
    }),
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
    ReactiveFormsModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    AmplifyService,
    AuthGuard
  ],
  entryComponents: [
    InputDialogComponent,
    WarningDialogComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
