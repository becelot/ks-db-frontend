import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSignOnComponent } from './single-sign-on/single-sign-on.component';
import {RouterModule, Routes} from '@angular/router';
import { SingleSignOnRoadmapComponent } from './single-sign-on-roadmap/single-sign-on-roadmap.component';
import {MatCheckboxModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SingleSignOnRoadmapComponent
      },
      {
        path: 'preview',
        component: SingleSignOnComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class SingleSignOnRoutingModule { }

@NgModule({
  declarations: [SingleSignOnComponent, SingleSignOnRoadmapComponent],
  imports: [
    SingleSignOnRoutingModule,
    MatCheckboxModule,
    CommonModule
  ]
})
export class SingleSignOnModule { }
