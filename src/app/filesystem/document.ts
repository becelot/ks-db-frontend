

export class Document {
  private _loaded = false;
  private _name: string;

  constructor(name?: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get loaded(): boolean {
    return this._loaded;
  }
}
