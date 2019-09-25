import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpageComponent } from './startpage/startpage.component';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StartpageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StartpageRoutingModule { }

@NgModule({
  declarations: [StartpageComponent],
  imports: [
    CommonModule,
    StartpageRoutingModule
  ],
  exports: [StartpageComponent]
})
export class StartpageModule { }
