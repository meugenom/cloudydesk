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

	items: number = 0;
	selectedItems: number = 0;

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

				this.breadcrumbs = [];
				this.breadcrumbs.push({name: this.activeFolderName, id: this.activeFolderId});
				
				//set store for finder
				const finder: { currentDir: any, currentDirId: any, breadcrumbs: any, items: number, selectedItems: number } = {
					currentDir : this.activeFolderName,
					currentDirId : this.activeFolderId,
					breadcrumbs: this.breadcrumbs,
					items: this.items,
					selectedItems: this.selectedItems
				  }
	  
				  // add to the store
				  this.store.dispatch( AddFinder(finder));
				

			}else{			
				this.activeFolderId = data.currentDirId;
				this.activeFolderName = data.currentDir;
				
				//need breadcrumbs to be set here
				//console.log('need breadcrumbs to be set here')
				this.breadcrumbs = data.breadcrumbs;
				this.items = data.items;
				this.selectedItems = data.selectedItems;
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

		console.log(name, id);
		
		//remove old active folder by css
		document.getElementById(this.activeFolderName + '-sidebar')?.classList.remove('window-sidebar-item-active');
		
		//set new active folder by css
		document.getElementById(name + '-sidebar')?.classList.add('window-sidebar-item-active');
		
		if(id == this.activeFolderId){
			
			//make nothing active

		}else{
			let trigger = false;
			//check if the folder is already in the breadcrumbs array
			//if it is then remove all the breadcrumbs after that folder
			this.breadcrumbs.forEach((crumb, index) => {
				console.log(crumb.id, id);
				if(crumb.id == id){					
					this.breadcrumbs = [...this.breadcrumbs]
					this.breadcrumbs.splice(index + 1, this.breadcrumbs.length - index);
					trigger = true;
				}
			});

			if(!trigger){
				//add to new breadcrumbs
				this.breadcrumbs = [];
				this.breadcrumbs.push({name : name, id: id });
			}
		
			//put active folder name in to this.activeFolderName
			this.activeFolderName = name;
			this.activeFolderId = id;

		
		  	//set store for finder
		  	const finder: { currentDir: any, currentDirId: any, breadcrumbs: any, items: number, selectedItems: number } = {
            	currentDir : name,
				currentDirId : id,
				breadcrumbs: this.breadcrumbs,
				items: this.items,
				selectedItems: this.selectedItems
          	}
  
      		// add to the store
      		this.store.dispatch( AddFinder(finder));
		}
		
	}

	getFolders() {
		if (this.dirs)
			return this.dirs.children;
		else
			return [];
	}
}
