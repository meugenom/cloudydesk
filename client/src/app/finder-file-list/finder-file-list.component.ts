import { Component, ElementRef, Input, OnDestroy, OnInit, 
	DoCheck, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FileState } from '../desktop/store/models/file.state.model';
import { Store } from '@ngrx/store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from '../../environments/environment';
import { DirState } from '../desktop/store/models/dir.state.model';
import { Dir } from '../desktop/store/models/dir.model';
import { File } from '../desktop/store/models/file.model';

@Component({
	selector: 'app-finder-file-list',
	templateUrl: './finder-file-list.component.html',
	styleUrls: ['./finder-file-list.component.sass']
})

export class FinderFileListComponent implements DoCheck, OnInit  {

	@ViewChild('container') input: ElementRef | undefined;
	
	allFiles: any;
	files: any
	dirs: Dir | undefined;

	currentFolderPath: String | undefined;
	currentFolderId: String | undefined;
	
	//input props for file-list component
	@Input() showFolderPath: string | undefined;
	@Input() showFolderId: string | undefined;


	@Input() path: String | undefined;
	@Input() id: number | undefined;
	@Input() name: String | undefined;
	@Input() type: String | undefined;
	@Input() uid: number | undefined;
	@Input() size: number | undefined;
	@Input() created: string | undefined;
	@Input() modified: string | undefined;
	@Input() charset: string | undefined;
	@Input() style: string | undefined;
	@Input() item: string | undefined;
	@Input() dragstart: boolean | undefined;

	constructor(
		private dragulaService: DragulaService,
		private element: ElementRef,
		private store: Store<{files: FileState, dirs: DirState}>,
		private http: HttpClient
	) {
		//by default is 'Desktop'
		this.currentFolderPath = 'Desktop';
		this.currentFolderId = '';
		this.showFolderPath = 'Desktop';
		this.allFiles = [];
		this.files = [];

		//add dblclk event listeenr for every item
		const items = document.getElementsByClassName("item");
		for (let index = 0; index < items.length; index++) {
			
			items[index].addEventListener('dblclick', (event) => {
				console.log('double clicked')
			});
		}

		//subscribe on events for store 'files'
		this.store.select('files').subscribe((data: any) => {			
			//console.log(data.files);
			this.dirs = data.dirs;

			let dirId: null = null;
			this.dirs?.children?.forEach((dir: any) => {
				//console.log(dir.data.dirName);
				if(dir.data.dirName == this.currentFolderPath){
					dirId = dir.data.id;
					this.showFolderId = dir.data.id;				
				}
			});

			this.allFiles = data.files;
			this.files = data.files.filter((file: any) => file.dirId == dirId);
			
		})
	}


	ngDoCheck() {
		if(this.showFolderPath != this.currentFolderPath){ 
			this.currentFolderId = this.showFolderId;
			this.currentFolderPath = this.showFolderPath!;
			
			let dirId: null = null;
			this.dirs?.children?.forEach((dir: any) => {
				//console.log(dir.data.dirName);
				if(dir.data.dirName == this.currentFolderPath){
					dirId = dir.data.id;
					this.showFolderId = dir.data.id;
				}
			});
			//console.log('dirId = ' + dirId);
	
			//need rerender files list where file.dirId == dirId
			this.files = this.allFiles.filter((file: any) => file.dirId == dirId);
		}
	  }

	ngOnInit(): void {
		
	}

	ngAfterViewInit() {
		//if (this.element.nativeElement.attributes.childToMaster == 'Desktop') {
			console.log('childToMaster = ' + this.element.nativeElement.attributes.childToMaster)
		//}
	}

	getItem(event: any, file: any){
		//console.log(file);
		this.http.get(`${environment.apiUrl}/api/v1/files/downloadFile/${file.id}`, { responseType: 'blob' })
			.subscribe(
				(response) => {
					const blob = new Blob([response], { type: 'application/octet-stream' });
					saveAs(blob, file.name);
				}
			)
	}

}
