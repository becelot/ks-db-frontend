import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSignOnComponent } from './single-sign-on/single-sign-on.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SingleSignOnComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SingleSignOnRoutingModule { }

@NgModule({
  declarations: [SingleSignOnComponent],
  imports: [
    SingleSignOnRoutingModule,
    CommonModule
  ]
})
export class SingleSignOnModule { }
