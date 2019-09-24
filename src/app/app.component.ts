import {Component, Injector} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {CustomMarkdownComponent} from './components/markdown/custom-markdown/custom-markdown.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (icons: MatIconRegistry, domSanitizer: DomSanitizer, injector: Injector) {
    icons.addSvgIcon('add_doc', domSanitizer.bypassSecurityTrustResourceUrl('assets/newdoc.svg'));
    icons.addSvgIcon('add_folder', domSanitizer.bypassSecurityTrustResourceUrl('assets/newfolder.svg'));
    icons.addSvgIcon('edit_doc', domSanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
    icons.addSvgIcon('delete_doc', domSanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));

    const customMarkdownComponent = createCustomElement(CustomMarkdownComponent, {injector});
    customElements.define('custom-markdown', customMarkdownComponent);
  }
}
