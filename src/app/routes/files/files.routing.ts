import {RouterModule, Routes} from '@angular/router';
import {FileViewerComponent} from './components/file-viewer/file-viewer.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


const routes: Routes = [
  { path: '**', component: FileViewerComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FileRoutingModule { }
