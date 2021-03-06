import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

const rememberMe = localStorage.getItem('rememberMe');
// window['LOG_LEVEL'] = 'DEBUG';

Amplify.configure({
  Auth: {
    // identityPoolId: 'us-east-1:cb8ae39d-b731-4148-a952-11108091852c',

    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_lgelfQeHN',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: 'u5ohi1et4psim4ps67ge723a3',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_SRP_AUTH',

    storage: rememberMe === 'true' ? localStorage : sessionStorage
  },
  API: {
    endpoints: [
      {
        name: 'CloudEndpoint',
        endpoint: 'https://sw1cn1pzzh.execute-api.us-east-1.amazonaws.com/dev/',
        custom_header: async () => {
          try {
            return { Authorization: (await Auth.currentAuthenticatedUser()).signInUserSession.idToken.jwtToken };
          } catch (e) {

          }
          return {};
        }
      },
      {
        name: 'LocalEndpoint',
        // endpoint: 'http://localhost:3000/',
        endpoint: 'https://sw1cn1pzzh.execute-api.us-east-1.amazonaws.com/dev/',
        custom_header: async () => {
          try {
            return { Authorization: (await Auth.currentAuthenticatedUser()).signInUserSession.idToken.jwtToken };
          } catch (e) {

          }
          return {};
        }
      }
    ]
  }
});



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
