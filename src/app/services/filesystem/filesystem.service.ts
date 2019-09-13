import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  private currentPath = [];

  constructor() { }
}
