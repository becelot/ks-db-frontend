import {Folder} from './folder';
import {Document} from './document';
import {TextDocument} from './TextDocument';

export class Filesystem {
  public root: Folder = new Folder();

  /**
   * Returns a document if it exists, or otherwise undefined if the document was not yet created
   * @param path The path of the document
   */
  public resolveOrFail(path: string): Document | undefined {
    // root folder case
    if (path === '') {
      return this.root;
    }

    const childs: string[] = path.split('/');

    let last: Folder = this.root;
    let current: Document = this.root;
    for (const child of childs) {
      if (current instanceof Folder) {
        last = current;
        const tmp = current.getFile(child);

        if (!!tmp) {
          current = tmp;
        } else {
          return undefined;
        }
      } else {
        throw new Error('Path is invalid');
      }
    }

    return current;
  }

  /**
   * Resolve the folder from the given path. If the path does not exist, create it.
   * @param path The path to be resolved
   */
  public resolveOrMkDir(path: string): Folder {
    const childs: string[] = path.split('/');

    let last: Folder = this.root;
    let current: Folder = this.root;
    for (const child of childs) {
      if (current instanceof Folder) {
        last = current;
        const tmp = current.getFile(child);

        if (tmp instanceof Folder) {
          current = tmp;
        } else if (tmp instanceof TextDocument) {
          throw new Error('Path cannot be created. The path contains a document name!');
        } else {
          current = new Folder(child, last);
          last.addDocument(current);
        }
      }
    }

    return current;
  }

  public resolveOrTouch(path: string): TextDocument {
    const childs: string[] = path.split('/');

    let last: Folder = this.root;
    let current: Document = this.root;
    for (const child of childs) {
      if (current instanceof Folder) {
        last = current;
        const tmp = current.getFile(child);

        if (!!tmp) {
          current = tmp;
        } else {
          current = new TextDocument(child, last);
          last.addDocument(current);
        }
      } else {
        throw new Error('Path cannot be created. The path contains a document name!');
      }
    }

    if (!(current instanceof TextDocument)) {
      throw new Error('Path cannot be created. The path contains a document name!');
    }

    return current;
  }
}
