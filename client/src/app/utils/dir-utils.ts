class Dir {
    id: string;
    dirName: string;
    children: Dir[];
    constructor(id: string, dirName: string, children: Dir[]) {
        this.id = id;
        this.dirName = dirName;
        this.children = children;
    }
}

class DirUtils {
  static getDirName(dirs: any): string {
    return path.split('/').pop();
  }
}