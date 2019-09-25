import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMarkdownComponent } from './custom-markdown/custom-markdown.component';



@NgModule({
  declarations: [CustomMarkdownComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [
    CustomMarkdownComponent
  ],
  exports: [CustomMarkdownComponent]
})
export class MarkdownModule { }
