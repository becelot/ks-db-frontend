import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Filesystem} from '../../filesystem/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  private _fileSystem: Filesystem = new Filesystem();

  private _currentPath: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  get currentPath(): Observable<string[]> {
    return this._currentPath.asObservable();
  }

  public navigateChild(document: string) {
    const current = this._currentPath.getValue();
    current.push(document)
    this._currentPath.next(current);
  }
}
