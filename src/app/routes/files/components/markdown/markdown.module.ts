import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMarkdownComponent } from './custom-markdown/custom-markdown.component';
import {MarkdownService} from './services/markdown.service';



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
export class MarkdownModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [MarkdownService]
    };
  }
}
