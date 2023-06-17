import { Component, ElementRef, Input, OnDestroy, OnInit, 
	DoCheck, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FileService } from '../services/file.service';
import { FileState } from '../desktop/store/models/file.state.model';
import { Store } from '@ngrx/store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { DirState } from '../desktop/store/models/dir.state.model';
import { Dir } from '../desktop/store/models/dir.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-desktop-file-list',
	templateUrl: './desktop-file-list.component.html',
	styleUrls: ['./desktop-file-list.component.sass']
})

export class DesktopFileListComponent implements OnInit  {

	@ViewChild('container') input: ElementRef | undefined;
	
	allFiles: any;
	files: any
	dirs: Dir | undefined;

	currentFolderPath: String | undefined;
	currentFolderId: String | undefined;
	
	@Input() style: string | undefined;


	// declare for dragula service
	BAG = "DRAGULA_FILE_LIST";
  	subs = new Subscription();

	constructor(
		private dragulaService: DragulaService,
		private element: ElementRef,
		private fileService: FileService,
		private store: Store<{files: FileState, dirs: DirState}>,
		private http: HttpClient,
	) {
		//by default is 'Desktop'
		this.currentFolderPath = 'Desktop';
		this.currentFolderId = '';
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
					this.currentFolderId = dir.data.id;
				}
			});

			this.allFiles = data.files;
			this.files = data.files.filter((file: any) => file.dirId == dirId);
			
		})

		//dragula subscription
		/*
		this.subs.add(dragulaService.drag(this.BAG)
		.subscribe(({ el }) => {
		  this.removeClass(el, 'ex-moved');
		})
	  );
	  this.subs.add(dragulaService.drop(this.BAG)
		.subscribe(({ el }) => {
		  this.addClass(el, 'ex-moved');
		})
	  );
	  
	  this.subs.add(dragulaService.over(this.BAG)
		.subscribe(({ el, container }) => {
		  console.log('over', container);
		  this.addClass(container, 'ex-over');
		})
	  );
	  this.subs.add(dragulaService.out(this.BAG)
		.subscribe(({ el, container }) => {
		  console.log('out', container);
		  this.removeClass(container, 'ex-over');
		})
	  );
	  */
	}

	ngOnDestroy() {
		// destroy dragula subscription
		this.subs.unsubscribe();
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
