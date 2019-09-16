import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [NavigationPanelComponent],
  exports: [
    NavigationPanelComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class NavigationModule { }
