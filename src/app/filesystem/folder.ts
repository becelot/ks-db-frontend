import {Document} from './document';

export class Folder extends Document {
  private _children: Document[] = [];

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
}
