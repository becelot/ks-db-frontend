import {Document} from './document';

export class Folder extends Document {
  private _children: Document[] = [];

  constructor(name?: string, parent?: Folder) {
    super(name, parent);
    this.icon = 'folder.svg';
  }

  public get content(): Document[] {
    return [...this._children];
  }

  public addDocument(document: Document) {
    this._children.push(document);
  }

  public deleteDocument(document: Document): boolean {
    const index = this._children.indexOf(document);
    if (index > -1) {
      this._children.splice(index, 1);
      return true;
    }

    return false;
  }

  public getFile(name: string): Document {
    return this._children.find(c => c.name === name);
  }

  public containsFile(name: string): boolean {
    return this._children.find(c => c.name === name) !== undefined;
  }
}
