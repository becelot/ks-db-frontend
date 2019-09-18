import {Folder} from './folder';
import {Document} from './document';

export class Filesystem {
  public root: Folder = new Folder();

  public resolveOrCreateDocument(path: string): Document {
    const childs: string[] = path.split('/');

    let last: Folder = this.root;
    let current: Document = this.root;
    for (const child in childs) {
      if (current instanceof Folder) {
        last = current;
        const tmp = current.getFile(child);

        if (!!tmp) {
          current = tmp;
        } else {
          current = new Folder(child);
          last.addDocument(current);
        }
      } else {
        throw new Error('Path is invalid');
      }
    }

    return current;
  }
}
