export class DirUtils {

  static getDirName(dirs: any): string {
    //return path.split('/').pop();
    return dirs.data.dirName;
  }

  static getDir(dirs: any, id: number): any {
    
    //private case
    if (dirs != null && dirs.data.id == id)
      return dirs;

    if(dirs == null)
      return;

    //recursive case
    for (let index = 0; index < dirs.children.length; index++) {
      const dir = dirs.children[index];
      if (dir.data.id == id)
        return dir;
      else {
        let result = this.getDir(dir, id);
        if (result != null)
          return result;
      }
    }
  }

}

