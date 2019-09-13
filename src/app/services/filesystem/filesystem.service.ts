import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  private _currentPath: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  get currentPath(): Observable<string[]> {
    return this._currentPath.asObservable();
  }

  public navigateNext(document: string) {
    const current = this._currentPath.getValue();
    current.push(document)
    this._currentPath.next(current);
  }
}
