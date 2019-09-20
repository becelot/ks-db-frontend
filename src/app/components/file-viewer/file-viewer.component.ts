import {Component, Input, OnInit} from '@angular/core';
import {FilesystemService} from '../../services/filesystem/filesystem.service';
import {NavigationEnd, Router} from '@angular/router';
import {AmplifyService} from 'aws-amplify-angular';
import {APIClass} from 'aws-amplify';
import {Doctype} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {Document} from '../../filesystem/document';
import {Folder} from '../../filesystem/folder';
import {MatDialog} from '@angular/material';
import {InputDialogComponent} from '../dialogs/input-dialog/input-dialog.component';


export enum DocType {
  DOC_FOLDER,
  DOC_FILE
}


export interface IDocs {
  name: string;
  type: DocType;
}

interface DocumentViewModel {
  doc: Document;
  selected: boolean;
}

@Component({
  selector: 'ks-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  private _folder: Folder = undefined;
  public documents: DocumentViewModel[] = [];

  constructor(private filesystem: FilesystemService,
              private dialog: MatDialog,
              private router: Router,
              private amplifyService: AmplifyService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePath();
      }
    });

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

    try {
      const doc: Document = await this.filesystem.resolveDocument(path);

      if (doc instanceof Folder) {
        this.folder = doc;
      }
    } catch (e) {

    }


  }

  ngOnInit() {
  }

  public openDocument(doc: Document) {
    if (doc instanceof Folder) {
      this.router.navigate([this.router.url + '/' + doc.name]);
    }
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

  public async createFolder() {
    const ref = this.dialog.open(InputDialogComponent, {
      width: '300px',
      data: {
        title: 'Create new directory',
        description: 'Directory name'
      }
    });

    const result = await ref.afterClosed().toPromise();

    // if a name was returned
    if (!!result) {
      await this.filesystem.createFolder(this._folder, result);
      this.folder = this._folder;
    }
  }

  public async createDocument() {
    const ref = this.dialog.open(InputDialogComponent, {
      width: '300px',
      data: {
        title: 'Create a new document',
        description: 'Document name'
      }
    });

    const result = await ref.afterClosed().toPromise();

    // if a name was returned
    if (!!result) {

    }
  }

  set folder(folder: Folder) {
    this._folder = folder;
    this.documents = folder.content.map(doc => ({doc, selected: false}));
  }

}
