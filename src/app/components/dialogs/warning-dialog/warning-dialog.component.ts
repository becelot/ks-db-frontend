import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'ks-warning-dialog',
  template: `<h1 mat-dialog-title> <mat-icon style="color: red; margin-right: 5px">warning</mat-icon>  <span style="line-height: 33px; vertical-align: center">Warning</span></h1>
              <div mat-dialog-content>
                <p>{{ data.description }}</p>
              </div>
              <div mat-dialog-actions fxLayoutAlign="flex-end">
                <button mat-raised-button mat-dialog-close color="primary" position="right">OK</button>
              </div> `
})
export class WarningDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }
}
