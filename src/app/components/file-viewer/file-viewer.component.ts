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
import {TextDocument} from '../../filesystem/TextDocument';


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

export enum ViewMode {
  FOLDER_VIEW,
  TEXT_VIEW,
  TEXT_EDIT_VIEW,
  ERROR_VIEW
}

@Component({
  selector: 'ks-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  public viewMode: ViewMode = ViewMode.FOLDER_VIEW;

  // Folder view
  private _folder: Folder = undefined;
  public documents: DocumentViewModel[] = [];

  // Content view
  private textDoc: TextDocument;
  private content: string;

  // Edit view content
  private editContent: string;
  public editorOptions = {theme: 'vs', language: 'markdown'};

  // Error view
  public error: string;
  public parentFolder: string;

  constructor(private filesystem: FilesystemService,
              private dialog: MatDialog,
              private router: Router,
              private amplifyService: AmplifyService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePath(event.url);
      }
    });

    this.updatePath(this.router.url);
  }

  private async updatePath(url: string) {
    if (!url.startsWith('/files')) {
      return;
    }

    let path: string = url.replace('/files', '');

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
        this.viewMode = ViewMode.FOLDER_VIEW;
      } else if (doc instanceof TextDocument) {
        this.content = doc.content;
        this.textDoc = doc;
        this.viewMode = ViewMode.TEXT_VIEW;
      }
    } catch (e) {
      this.error = 'The document does not exist';
      this.parentFolder = this.getPathInfo(url)[0];
      this.viewMode = ViewMode.ERROR_VIEW;
    }


  }

  ngOnInit() {
  }

  public selectDocument(doc: DocumentViewModel, event: MouseEvent) {
    if (event.ctrlKey) {
      doc.selected = true;
    }  else {
      this.documents.forEach(d => d.selected = false);
      doc.selected = true;
    }
  }

  public openDocument(doc: Document) {
    // navigate to new route
    this.router.navigate([this.router.url + '/' + doc.name]);
  }

  public editDocument() {
    this.viewMode = ViewMode.TEXT_EDIT_VIEW;
    this.editContent = this.content;
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
      await this.filesystem.createDocument(this._folder, result);
      this.folder = this._folder;
    }
  }

  set folder(folder: Folder) {
    this._folder = folder;
    this.documents = folder.content.map(doc => ({doc, selected: false}));
  }

  public async saveDocument() {
    this.content = this.editContent;
    this.textDoc.content = this.editContent;

    await this.filesystem.syncDocument(this.textDoc);

    this.viewMode = ViewMode.TEXT_VIEW;
  }

  public dismissChanges() {
    this.editContent = '';
    this.viewMode = ViewMode.TEXT_VIEW;
  }

  public async deleteSelectedDocuments(): Promise<void> {
    const documents: Document[] = this.documents.filter(doc => doc.selected).map(doc => doc.doc);

    for (const doc of documents) {
      await this.filesystem.deleteDocument(doc);
    }

    this.folder = this._folder;
  }

  /**
   * Extracts the parent folder from a given string
   * @param path
   */
  private getPathInfo(path: string): [string, string] {
    const index: number = path.lastIndexOf('/');

    // if the path contains a '/'
    if (index < 0) {
      throw new Error('Ill-formed path');
    }

    return [path.slice(0, index), path.slice(index + 1, path.length)];
  }


}
