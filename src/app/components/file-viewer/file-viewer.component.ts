import {Component, Input, OnInit} from '@angular/core';
import {FilesystemService} from '../../services/filesystem/filesystem.service';
import {NavigationEnd, Router} from '@angular/router';
import {AmplifyService} from 'aws-amplify-angular';
import {APIClass} from 'aws-amplify';
import {Doctype} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {Document} from '../../filesystem/document';
import {Folder} from '../../filesystem/folder';


export enum DocType {
  DOC_FOLDER,
  DOC_FILE
}


export interface IDocs {
  name: string;
  type: DocType;
}

@Component({
  selector: 'ks-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  public docs: Document[] = [];

  constructor(private filesystem: FilesystemService,
              private router: Router,
              private amplifyService: AmplifyService) {
    /*this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePath();
      }
    });*/

    this.updatePath();
  }

  private async updatePath() {
    let path: string = this.router.url.replace('/files', '');

    // Slice pre and post slashes of path
    if (path[0] === '/') {
      path = path.slice(1, path.length);
    }

    if (path[path.length - 1] === '/') {
      path = path.slice(0, path.length - 1);
    }

    const doc: Document = await this.filesystem.resolveDocument(path);
    console.log(doc);
    if (doc instanceof Folder) {
      this.docs = [...doc.content];
    }

  }

  ngOnInit() {
  }

  public async createSomeDocument() {
    const api: APIClass = this.amplifyService.api();

    try {
      const result = await api.post('LocalEndpoint', 'files/create', {
        headers: {
          // Authorization: user.signInUserSession.idToken.jwtToken
        },
        response: true,
        body: {
          documentName: 'Test',
          type: 0,
          date: 0
        }
      });
    } catch (e) {

    }

  }

}
