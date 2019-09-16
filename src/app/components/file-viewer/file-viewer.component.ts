import {Component, Input, OnInit} from '@angular/core';
import {FilesystemService} from '../../services/filesystem/filesystem.service';
import {Router} from '@angular/router';
import {AmplifyService} from 'aws-amplify-angular';
import {APIClass} from 'aws-amplify';
import {Doctype} from '@angular/compiler/src/i18n/serializers/xml_helper';

@Component({
  selector: 'ks-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  constructor(private filesystem: FilesystemService,
              private router: Router,
              private amplifyService: AmplifyService) {
  }

  ngOnInit() {
  }

  public async createSomeDocument() {
    console.log('test');
    const api: APIClass = this.amplifyService.api();

    const user = await this.amplifyService.auth().currentAuthenticatedUser();
    console.log(user.signInUserSession.idToken.jwtToken);
    const result = await api.post('CloudEndpoint', 'files/create', {
      headers: {
        Authorization: user.signInUserSession.idToken.jwtToken
      },
      response: true,
      body: {
        documentName: 'Test',
        type: 0,
        date: 0
      }
    });

    console.log(result);
  }

}
