import {Component, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthClass} from 'aws-amplify';
import {MatDialog, MatDialogRef} from '@angular/material';
import {WarningDialogComponent} from '../../dialogs/warning-dialog/warning-dialog.component';
import {CognitoUser} from 'amazon-cognito-identity-js';

@Component({
  selector: 'ks-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public logginIn = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(4)]),
    password: new FormControl('', [Validators.minLength(4)]),
    remember: new FormControl('')
  });

  constructor(private amplifyService: AmplifyService, private dialog: MatDialog, @Optional() private dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit() {
  }

  public login() {
    const auth: AuthClass = this.amplifyService.auth();

    if (this.loginForm.valid) {
      this.logginIn = true;
      if (!!this.loginForm.controls['remember'].value) {
        localStorage.setItem('rememberMe', 'true');
        auth.configure({
          storage: localStorage
        });
      } else {
        localStorage.setItem('rememberMe', 'false');
        auth.configure({
          storage: sessionStorage
        });
      }


      auth.signIn(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
        .then((session: CognitoUser) => {
          this.logginIn = false;

          if (!!this.dialogRef) {
            this.dialogRef.close();
          }
        })
        .catch(err => {
          this.dialog.open(WarningDialogComponent, {
            width: '400px',
            data: {
              description: err.message
            }
          });
          this.logginIn = false;
        });
    }
  }

}
