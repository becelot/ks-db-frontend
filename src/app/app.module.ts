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


import { RegexReplaceExtension } from 'showdown';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {showdownHighlight} from './ext/show-highlight';
import {MarkdownModule} from './components/markdown/markdown.module';
import {StartpageModule} from './routes/startpage/startpage.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export const mdToSdExtension: RegexReplaceExtension = {
  type: 'lang',
  regex: '`Markdown`',
  replace: '<custom-markdown></custom-markdown>'
};

@NgModule({
  declarations: [
    AppComponent,
    FileViewerComponent,
    DocumentComponent,
    LoginComponent,
    AuthorizationComponent,
    LayoutComponent,
    WarningDialogComponent,
    InputDialogComponent,
  ],
  imports: [
    BrowserModule,
    NavigationModule,
    ShowdownModule.forRoot({
      extensions: [ showdownHighlight, mdToSdExtension]
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
    MonacoEditorModule.forRoot(),
    MarkdownModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
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
