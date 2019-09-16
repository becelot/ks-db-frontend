import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FileViewerComponent} from './components/file-viewer/file-viewer.component';
import {StartpageComponent} from './components/startpage/startpage.component';
import {AuthorizationComponent} from './components/auth/authorization/authorization.component';
import {LoginComponent} from './components/auth/login/login.component';
import {LayoutComponent} from './components/layout/layout.component';
import {AuthGuard} from './components/auth/auth.guard';


const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'start'
      },
      {
        path: 'start',
        component: StartpageComponent
      },
      { path: 'files',
        canActivate: [AuthGuard],
        children: [ { path: '**', component: FileViewerComponent } ]
      }
    ]
  },
  { path: 'auth', component: AuthorizationComponent, children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
