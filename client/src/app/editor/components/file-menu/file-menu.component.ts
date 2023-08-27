import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'editor-file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.sass']
})
export class FileMenuComponent implements OnInit {

	fileName: string;

	showFileMenu = false;
	showEditMenu = false;
	showViewMenu = false;
	showHelpMenu = false;

	constructor() {
		this.fileName = 'Untitled';
	}

	ngOnInit(): void {
	}

	togleMenu(param: string) {
		if(param == "file"){
			this.showFileMenu = !this.showFileMenu;
			this.showEditMenu = false;
			this.showViewMenu = false;
			this.showHelpMenu = false;	
		}
		if(param == "edit"){
			this.showEditMenu = !this.showEditMenu;
			this.showFileMenu = false;
			this.showViewMenu = false;
			this.showHelpMenu = false;	
		}

		if(param == "view"){
			this.showViewMenu = !this.showViewMenu;
			this.showFileMenu = false;
			this.showEditMenu = false;
			this.showHelpMenu = false;	
		}

		if(param == "help"){
			this.showHelpMenu = !this.showHelpMenu;
			this.showFileMenu = false;
			this.showEditMenu = false;
			this.showViewMenu = false;	
		}
	}

	//TODO: need to implement these functions and add them to the html
	openFile() {
	}

	editFile() {
	}

	saveFile() {
	}
	
}
