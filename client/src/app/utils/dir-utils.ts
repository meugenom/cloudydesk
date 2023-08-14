export class DirUtils {

  static getDirName(dirs: any) {
    //return path.split('/').pop();
    return dirs.data.dirName;
  }

  static getDir(dirs: any, id: number): any {
    if (!dirs) {
        return null;
    }

    if (dirs.data && dirs.data.id === id) {
        return dirs;
    }

    if (dirs.children && dirs.children.length > 0) {
      for (let index = 0; index < dirs.children.length; index++) {
          const dir = dirs.children[index];
          const result = this.getDir(dir, id);
          if (result) {
              return result;
          }
      }
  }
  
    return null;
}


}

