import {Component, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthClass} from '@aws-amplify/auth';
import {MatDialog, MatDialogRef} from '@angular/material';
import {WarningDialogComponent} from '../../dialogs/warning-dialog/warning-dialog.component';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/authservice/auth.service';

@Component({
  selector: 'ks-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public logginIn = false;
  public isDialog: boolean;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(4)]),
    password: new FormControl('', [Validators.minLength(4)]),
    remember: new FormControl('')
  });

  constructor(private dialog: MatDialog,
              private router: Router,
              private authService: AuthService,
              @Optional() private dialogRef: MatDialogRef<LoginComponent>) {
    this.isDialog = !!dialogRef;
  }

  ngOnInit() {
  }

  public login() {
    const auth: AuthClass = this.authService.Auth;

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
          } else {
            this.router.navigate(['/files']);
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
