import { Component, Input, OnInit , ElementRef} from '@angular/core';
import { FileState } from '../desktop/store/models/file.state.model';
import { DirState } from '../desktop/store/models/dir.state.model';
import { Store, select } from '@ngrx/store';

@Component({
	selector: 'app-finder',
	templateUrl: './finder.component.html',
	styleUrls: ['./finder.component.sass']
})
export class FinderComponent implements OnInit {

	showFolderPath: string | undefined;
	showFolderId: string | undefined;

	folders: any[]
	activeFolderName: String ;

	files: any;
	dirs: any;


	constructor(
		private element : ElementRef,
		private store: Store<{files: FileState, dirs: DirState}>,
	) {

		// Subscribe to the store and get the files and dirs
		this.store.select('files').subscribe((data: any) => {
			//console.log(data.files);
			this.files = data.files;
			//console.log(data.dirs);
			this.dirs = data.dirs;
		})

		this.folders = this.getFolders();
		this.activeFolderName = 'Desktop' //by default the desktop folder is active on startup
		this.setActiveFolder(this.activeFolderName);

	}

	ngOnInit(): void {

	}

	changeFileList(name : String){
		//console.log(name.toLowerCase());
		
		//set active state for item
		this.setActiveFolder(name);


	}

	/**
	 * @description sets the active folder and changes the active state of the folder in the sidebar
	 * @param name 
	 */
	setActiveFolder(name : String) {
		//console.log(document.getElementById(name.toLowerCase() + '-sidebar'))
		document.getElementById(this.activeFolderName + '-sidebar')?.classList.remove('window-sidebar-item-active');
		document.getElementById(name + '-sidebar')?.classList.add('window-sidebar-item-active');
		this.activeFolderName = name;
		this.showFolderPath = name.toString();
		//console.log('activeFolderName = '+this.activeFolderName )
		//console.log('showFolder.path = '+this.showFolder.path )
	}

	getFolders() {
		if (this.dirs)
			return this.dirs.children;
		else
			return [];
	}
}
