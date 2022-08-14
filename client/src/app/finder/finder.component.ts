import { Component, Input, OnInit , ElementRef} from '@angular/core';
import { Globals } from '../global';

@Component({
	selector: 'app-finder',
	templateUrl: './finder.component.html',
	styleUrls: ['./finder.component.sass']
})
export class FinderComponent implements OnInit {

	showFolder: any = { path: 'Desktop' }
	folders: any[]
	activeFolderName: String ;

	constructor(
		private globals: Globals,
		private element : ElementRef
	) {
		this.folders = this.getFolders();
		this.activeFolderName = 'Desktop'
		this.setActiveFolder(this.activeFolderName);
	}

	ngOnInit(): void {

	}

	changeFileList(name : String){
		//console.log(name.toLowerCase());
		
		//set active state for item
		this.setActiveFolder(name);


	}

	setActiveFolder(name : String) {
		console.log(document.getElementById(name.toLowerCase() + '-sidebar'))
		document.getElementById(this.activeFolderName.toLowerCase() + '-sidebar')?.classList.remove('window-sidebar-item-active');
		document.getElementById(name.toLowerCase() + '-sidebar')?.classList.add('window-sidebar-item-active');
		this.activeFolderName = name;
		this.showFolder.path = name;
		//console.log('activeFolderName = '+this.activeFolderName )
		//console.log('showFolder.path = '+this.showFolder.path )
	}


	getFolders() {
		return Object.keys(this.globals.files[0])
	}

}
