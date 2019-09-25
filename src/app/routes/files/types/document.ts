import {Folder} from './folder';


export class Document {
  private _loaded = false;
  private _name: string;
  private _parent: Folder;
  private _icon: string;

  constructor(name?: string, parent?: Folder) {
    this._name = name;
    this._parent = parent;
    this.icon = 'document.svg';
  }

  get name(): string {
    return this._name;
  }

  get loaded(): boolean {
    return this._loaded;
  }

  get parent(): Folder {
    return this._parent;
  }

  public markLoaded(): void {
    this._loaded = true;
  }

  get Path(): string {
    if (!!this._parent) {
      return `${this._parent.Path}/${this._name}`;
    } else {
      return '';
    }
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }
}
