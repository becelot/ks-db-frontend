import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FileViewerComponent} from './components/file-viewer/file-viewer.component';


const routes: Routes = [
  { path: 'files', children: [ { path: '**', component: FileViewerComponent } ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
