import {Injectable, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {CustomMarkdownComponent} from '../custom-markdown/custom-markdown.component';

@Injectable()
export class MarkdownService {

  constructor(private injector: Injector) {
    const customMarkdownComponent = createCustomElement(CustomMarkdownComponent, {injector});
    customElements.define('custom-markdown', customMarkdownComponent);
  }
}
