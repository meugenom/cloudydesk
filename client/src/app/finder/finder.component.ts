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

	showFolderPath: string | undefined;
	showFolderId: string | undefined;

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

			//add to the breadcrumbs
			this.breadcrumbs.push({name: 'Desktop', id: 'desktop'});
		})

		//get folders
		this.folders = this.getFolders();

		//set active folder
		
		this.activeFolderName = 'Desktop' //by default the desktop folder is active on startup
		

		//get id from folders array where name is desktop
		this.folders.forEach((folder) => {
			if (folder.name?.toLowerCase() == this.activeFolderName?.toLowerCase()) {
				this.activeFolderId = folder.id;
			}
		})
	}

	ngOnInit(): void {

	}

	changeFileList(name : string, id: string){
		//console.log(name.toLowerCase());
		
		//set active state for item
		this.setActiveFolder(name, id);


	}

	/**
	 * @description sets the active folder and changes the active state of the folder in the sidebar
	 * @param name 
	 */
	setActiveFolder(name : any, id: any) {
		
		//remove old active folder by css
		document.getElementById(this.activeFolderName + '-sidebar')?.classList.remove('window-sidebar-item-active');
		
		//set new active folder by css
		document.getElementById(name + '-sidebar')?.classList.add('window-sidebar-item-active');
		
		//put active folder name in to this.activeFolderName
		this.activeFolderName = name;
		this.activeFolderId = id;

		//set new breadcrumbs
		this.breadcrumbs.pop();
		this.breadcrumbs.push({name: name, id: id});
		
		//set store for finder
		  const finder: { currentDir: any, currentDirId: any } = {
            currentDir : name,
			currentDirId : id
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
