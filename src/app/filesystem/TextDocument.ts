import {Document} from './document';


export class TextDocument extends Document {
  private _content = '';

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }
}
