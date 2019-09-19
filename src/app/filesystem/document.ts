import {Folder} from './folder';


export class Document {
  private _loaded = false;
  private _name: string;
  private _parent: Folder;

  constructor(name?: string, parent?: Folder) {
    this._name = name;
    this._parent = parent;
  }

  get name(): string {
    return this._name;
  }

  get loaded(): boolean {
    return this._loaded;
  }

  public markLoaded(): void {
    this._loaded = true;
  }

  get Path(): string {
    if (!!this._parent) {
      return `${this._parent.Path}/${this._name}`;
    } else {
      return this._name;
    }
  }
}
