import { Component, Input, OnInit , ElementRef} from '@angular/core';
import { FileState } from '../desktop/store/models/file.state.model';
import { DirState } from '../desktop/store/models/dir.state.model';
import { Store, select } from '@ngrx/store';
import { FinderState } from '../desktop/store/models/finder.state.model';
import { AddFinder } from '../desktop/store/actions/finder.action';

@Component({
	selector: 'app-finder',
	templateUrl: './finder.component.html',
	styleUrls: ['./finder.component.sass']
})
export class FinderComponent implements OnInit {

	folders: any[]

	activeFolderName: string | undefined;
	activeFolderId: string | undefined;

	files: any;
	dirs: any;

	breadcrumbs: any[] = [];

	constructor(
		private element : ElementRef,
		private store: Store<{files: FileState, dirs: DirState, finder: FinderState}>,
	) {

		// Subscribe to the store and get the files and dirs
		this.store.select('files').subscribe((data: any) => {
			//console.log(data.files);
			this.files = data.files;
			//console.log(data.dirs);
			this.dirs = data.dirs;
		})

		//get folders
		this.folders = this.getFolders();

		//set active folder from the store
		this.store.select('finder').subscribe((data: any) => {
			//console.log(data);
			if(data.currentDir == undefined || data.currentDir == ''){
				//by default set active folder to desktop
				this.activeFolderName = 'Desktop';
				
				//get id from folders array where name is desktop				
				this.folders.forEach((folder) => {
					if (folder.data.dirName?.toLowerCase() == this.activeFolderName?.toLowerCase()) {
						this.activeFolderId = folder.data.id;
						//console.log(folder.data.id);
					}				
				})
				//set active folder
				//console.log(this.activeFolderName, this.activeFolderId)
				//this.setActiveFolder(this.activeFolderName, this.activeFolderId);

			}else{			
				this.activeFolderId = data.currentDirId;
				this.activeFolderName = data.currentDir;
				//this.setActiveFolder(this.activeFolderName, this.activeFolderId);
			}
		})

		//set breadcrumbs
		this.breadcrumbs = [
			{name : this.activeFolderName,
			id: this.activeFolderId }];
		this.setActiveFolder(this.activeFolderName, this.activeFolderId);

		
	}

	ngOnInit(): void {

	}


	/**
	 * @description sets the active folder and changes the active state of the folder in the sidebar
	 * @param name 
	 */
	setActiveFolder(name : any, id: any) {

		//console.log(name, id);
		
		//remove old active folder by css
		document.getElementById(this.activeFolderName + '-sidebar')?.classList.remove('window-sidebar-item-active');
		
		//set new active folder by css
		document.getElementById(name + '-sidebar')?.classList.add('window-sidebar-item-active');
		
		//put active folder name in to this.activeFolderName
		this.activeFolderName = name;
		this.activeFolderId = id;
		
		this.breadcrumbs = [];
		this.breadcrumbs.push({name : name, id: id});
		
		  //set store for finder
		  const finder: { currentDir: any, currentDirId: any, breadcrumbs: any } = {
            currentDir : name,
			currentDirId : id,
			breadcrumbs: this.breadcrumbs
          }
  
      // add to the store
      this.store.dispatch( AddFinder(finder));
		
	}

	getFolders() {
		if (this.dirs)
			return this.dirs.children;
		else
			return [];
	}
}
