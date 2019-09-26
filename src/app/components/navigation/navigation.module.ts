import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {MatIconModule, MatListModule} from '@angular/material';



@NgModule({
  declarations: [NavigationPanelComponent],
  exports: [
    NavigationPanelComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ]
})
export class NavigationModule { }
