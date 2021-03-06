import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Filesystem} from '../../types/filesystem';
import {Folder} from '../../types/folder';
import {Document} from '../../types/document';
import {Router} from '@angular/router';
import {AuthGuard} from '../../../../components/auth/auth.guard';
import {TextDocument} from '../../types/TextDocument';
import {ApiService} from '../../../../services/apiservice/api.service';

export enum DocType {
  DOC_FOLDER,
  DOC_FILE
}

interface IListDocumentsResp {
  successful: boolean;
  documents: Array<{
    name: string;
    type: DocType;
  }>;
  error?: string;
}

interface IGetDocumentResp {
  successful: boolean;
  type?: DocType;
  error?: string;
}

interface IGetDocumentFolderResponse extends IGetDocumentResp {
  documents: Array<{
    name: string;
    type: DocType;
  }>;
}

interface IGetDocumentTextResponse extends IGetDocumentResp {
  content: string;
}

interface IGetDocumentResponse {
  data: IGetDocumentFolderResponse | IGetDocumentTextResponse;
}

@Injectable()
export class FilesystemService {

  private _fileSystem: Filesystem = new Filesystem();
  private _currentPath: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private router: Router, private auth: AuthGuard, private apiService: ApiService) {
  }



  get currentPath(): Observable<string[]> {
    return this._currentPath.asObservable();
  }

  public navigateChild(document: string) {
    const current = this._currentPath.getValue();
    current.push(document);
    this._currentPath.next(current);
  }

  public async createFolder(folder: Folder, name: string): Promise<Document> {
    const path = folder.Path;

    const response = await this.apiService.API.post('LocalEndpoint', 'files/create', {
      response: true,
      body: {
        documentName: name,
        parentFolder: path,
        type: 0,
        date: 0
      }
    });

    const doc = new Folder(name, folder);
    folder.addDocument(doc);

    return doc;
  }

  public async createDocument(folder: Folder, name: string): Promise<Document> {
    const path = folder.Path;

    const response = await this.apiService.API.post('LocalEndpoint', 'files/create', {
      response: true,
      body: {
        documentName: name,
        parentFolder: path,
        type: 1,
        date: 0
      }
    });

    const doc = new TextDocument(name, folder);
    folder.addDocument(doc);

    return doc;
  }

  public async syncDocument(doc: TextDocument): Promise<TextDocument> {
    const path = doc.Path;

    const response = await this.apiService.API.post('LocalEndpoint', 'files/update', {
      response: true,
      body: {
        path: doc.Path,
        content: doc.content
      }
    });

    return doc;
  }

  public async resolveDocument(path: string): Promise<Document> {
    let doc: Document = this._fileSystem.resolveOrFail(path);

    // if the document was not yet created, retrieve it from the server
    if (doc === undefined || !doc.loaded) {

      // try to resolve from backend
      let result: IGetDocumentResponse;
      try {
        result = await this.apiService.API.post('LocalEndpoint', 'files/content', {
          response: true,
          body: {
            path: !!doc ? doc.Path : (path !== '' ? `/${path}` : '')
          }
        });

      } catch (e) {
        throw new Error(`Error: Could not resolve path`);
      }

      if (!result.data.successful) {
        throw new Error(result.data.error);
      }

      // if the document was a folder
      if (result.data.type === DocType.DOC_FOLDER) {
        doc = this._fileSystem.resolveOrMkDir(path);
        doc.markLoaded();
        if (doc instanceof Folder) {
          const response: IGetDocumentFolderResponse = result.data as IGetDocumentFolderResponse;

          // add all contained documents to the virtual filesystem
          for (const d of response.documents) {
            if (!doc.containsFile(d.name)) {
              const dd = d.type === DocType.DOC_FOLDER ? new Folder(d.name, doc) : new TextDocument(d.name, doc);
              doc.addDocument(dd);
            }
          }
        }
      } else if (result.data.type === DocType.DOC_FILE) {
        doc = this._fileSystem.resolveOrTouch(path);
        doc.markLoaded();
        if (doc instanceof TextDocument) {
          const response: IGetDocumentTextResponse = result.data as IGetDocumentTextResponse;
          doc.content = response.content;
        }
      }
    }

    return doc;
  }

  public async deleteDocument(doc: Document): Promise<void> {
    const path: string = doc.Path;

    // try to delete the resource
    try {
      await this.apiService.API.post('LocalEndpoint', 'files/delete', {
        response: true,
        body: {
          path
        }
      });
    } catch (e) {
      throw new Error('Remote file could not be deleted: ' + e.message);
    }

    // if the resource was deleted successfully, remove it locally
    doc.parent.deleteDocument(doc);
  }
}
