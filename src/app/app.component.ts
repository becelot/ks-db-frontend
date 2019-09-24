import { Component } from '@angular/core';
import {Auth, AuthClass} from 'aws-amplify';
import {CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (icons: MatIconRegistry, domSanitizer: DomSanitizer) {
    icons.addSvgIcon('add_doc', domSanitizer.bypassSecurityTrustResourceUrl('assets/newdoc.svg'));
    icons.addSvgIcon('add_folder', domSanitizer.bypassSecurityTrustResourceUrl('assets/newfolder.svg'));
    icons.addSvgIcon('edit_doc', domSanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
    icons.addSvgIcon('delete_doc', domSanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));

  }
}
