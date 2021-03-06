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
    // root folder case
    if (path === '') {
      return this.root;
    }

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

    if (!childs[childs.length - 1]) {
      throw new Error('Document name is invalid');
    }

    let last: Folder = this.root;
    let current: Document = this.root;
    for (const child of childs.slice(0, childs.length - 1)) {
      if (current instanceof Folder) {
        last = current;
        const tmp = current.getFile(child);

        if (!!tmp) {
          current = tmp;
        } else {
          current = new Folder(child, last);
          last.addDocument(current);
        }
      } else {
        throw new Error('Path cannot be created. The path contains a document name!');
      }
    }

    const targetName = childs[childs.length - 1];
    if (current instanceof Folder) {
      last = current;
      const tmp = current.getFile(targetName);

      if (!!tmp) {
        current = tmp;
      } else {
        current = new TextDocument(targetName, last);
        last.addDocument(current);
      }
    } else {
      throw new Error('Path cannot be created. The path contains a document name!');
    }

    if (current instanceof TextDocument) {
      return current;
    } else {
      throw new Error('Path cannot be created. The path references a directory!');
    }
  }
}
