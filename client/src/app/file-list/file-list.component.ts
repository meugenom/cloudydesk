import { Component, ElementRef, Input, OnDestroy, OnInit, 
	DoCheck, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FileService } from './services/file.service';
import { FileState } from '../desktop/store/models/file.state.model';
import { Store } from '@ngrx/store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { DirState } from '../desktop/store/models/dir.state.model';
import { Dir } from '../desktop/store/models/dir.model';
import { File } from '../desktop/store/models/file.model';

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.sass']
})
export class FileListComponent implements DoCheck  {

	@ViewChild('container') input: ElementRef | undefined;
	
	allFiles: any;
	files: any
	dirs: Dir | undefined;

	currentFolder: String;
	@Input() showFolder: { path: string; } | undefined;

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
		private fileService: FileService,
		private store: Store<{files: FileState, dirs: DirState}>,
		private http: HttpClient
	) {
		//by default is 'Desktop'
		this.currentFolder = 'Desktop';
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
				if(dir.data.dirName == this.currentFolder){
					dirId = dir.data.id;
				}
			});

			this.allFiles = data.files;
			this.files = data.files.filter((file: any) => file.dirId == dirId);
			
		})
	}


	ngDoCheck() {
		if(this.showFolder?.path != this.currentFolder){ 
			this.currentFolder = this.showFolder?.path!;
			
			let dirId: null = null;
			this.dirs?.children?.forEach((dir: any) => {
				//console.log(dir.data.dirName);
				if(dir.data.dirName == this.currentFolder){
					dirId = dir.data.id;
				}
			});

			//console.log('dirId = ' + dirId);
			
			//need rerender files list where file.dirId == dirId
			this.files = this.allFiles.filter((file: any) => file.dirId == dirId);
		}
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
