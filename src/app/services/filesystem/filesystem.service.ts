import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Filesystem} from '../../filesystem/filesystem';
import {Folder} from '../../filesystem/folder';
import {Document} from '../../filesystem/document';
import {Router} from '@angular/router';
import {AuthGuard} from '../../components/auth/auth.guard';
import {AmplifyService} from 'aws-amplify-angular';
import {APIClass} from 'aws-amplify';

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

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  private _fileSystem: Filesystem = new Filesystem();
  private _currentPath: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private router: Router, private auth: AuthGuard, private amplifyService: AmplifyService) {
    this._fileSystem.root.addDocument(new Folder('Angular'));
  }



  get currentPath(): Observable<string[]> {
    return this._currentPath.asObservable();
  }

  public navigateChild(document: string) {
    const current = this._currentPath.getValue();
    current.push(document)
    this._currentPath.next(current);
  }

  public async createFolder(folder: Folder, name: string): Promise<Document> {
    const path = folder.Path;

    const api: APIClass = this.amplifyService.api();
    const response = await api.post('LocalEndpoint', 'files/create', {
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

  public async resolveDocument(path: string): Promise<Document> {
    const doc: Document = this._fileSystem.resolveOrCreateDocument(path);

    // if document is not cached
    if (!doc.loaded) {
      doc.markLoaded();

      // if it is a folder
      if (doc instanceof Folder) {

        // retrieve the contents of the folder
        const api: APIClass = this.amplifyService.api();
        const response = await api.post('LocalEndpoint', 'files/list', {
          response: true,
          body: {
            folder: path
          }
        });

        // add all contained documents to the virtual filesystem
        for (const d of response.data.documents) {
          if (!doc.containsFile(d.name)) {
            const dd = d.type === DocType.DOC_FOLDER ? new Folder(d.name, doc) : new Document(d.name, doc);
            doc.addDocument(dd);
          }
        }
      }
    }

    return doc;
  }
}
