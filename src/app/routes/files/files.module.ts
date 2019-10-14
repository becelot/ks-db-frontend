import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilesystemService} from './services/filesystem/filesystem.service';
import {FileViewerComponent} from './components/file-viewer/file-viewer.component';
import {FileRoutingModule} from './files.routing';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {MarkdownModule} from './components/markdown/markdown.module';
import {ShowdownModule} from 'ngx-showdown';
import {showdownHighlight} from '../../ext/show-highlight';
import {mdToSdExtension} from '../../app.module';
import {DocumentComponent} from './components/document/document.component';
import {MarkdownService} from './components/markdown/services/markdown.service';



@NgModule({
  declarations: [FileViewerComponent, DocumentComponent],
  imports: [
    CommonModule,
    FileRoutingModule,
    AngularSvgIconModule,
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
    MarkdownModule.forRoot(),
    ShowdownModule.forRoot({
      extensions: [ showdownHighlight, mdToSdExtension],
      tables: true,
      tasklists: true
    }),
  ],
  providers: [
    FilesystemService,
  ],
  exports: [
    FileViewerComponent,
    DocumentComponent
  ]
})
export class FilesModule {
}
