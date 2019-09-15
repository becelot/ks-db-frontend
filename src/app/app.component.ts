import { Component } from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {Auth, AuthClass} from 'aws-amplify';
import {AuthState} from 'aws-amplify-angular/dist/src/providers';
import {CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
