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
import { DirUtils } from '../utils/dir-utils';
import { ModService } from '../mod/mod.service';
import { FinderState } from '../desktop/store/models/finder.state.model';
import { AddFinder } from '../desktop/store/actions/finder.action';

@Component({
	selector: 'app-desktop-file-list',
	templateUrl: './desktop-file-list.component.html',
	styleUrls: ['./desktop-file-list.component.sass']
})

export class DesktopFileListComponent implements OnInit  {

	@ViewChild('container') input: ElementRef | undefined;
	
	allFiles: any;
	files: any

	dirs: any;
	allDirs: any;

	items: any;

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
		private store: Store<{files: FileState, dirs: DirState, finder: FinderState}>,
		private http: HttpClient,
		private modService: ModService,
		private viewContainerRef: ViewContainerRef
	) {
		//by default is 'Desktop'
		this.currentFolderPath = 'Desktop';
		this.currentFolderId = '';
		
		this.allFiles = [];
		this.files = [];

		this.allDirs = [];

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
			this.allDirs = data.dirs;

			this.allDirs?.children?.forEach((dir: any) => {
				//console.log(dir.data.dirName);
				if(dir.data.dirName == this.currentFolderPath){					
					this.currentFolderId = dir.data.id;
				}
			});

			this.allFiles = data.files;
			this.files = data.files.filter((file: any) => file.dirId == this.currentFolderId);
			
			//need rerender dirs list where dir.parentId == dirId						
				//find dirs by id
				if(this.currentFolderId != undefined || this.allDirs != undefined || this,this.currentFolderId != null) {				
					const currentDir = DirUtils.getDir(this.allDirs, Number.parseInt(this.currentFolderId.toString()));
					console.log(currentDir)
					if(currentDir && currentDir.children && currentDir.children.length != 0){
						this.dirs = currentDir.children;
					}else{
						this.dirs = [];
					}
				}

			this.items = this.files;
			this.items = this.items.concat(this.dirs);
			console.log(this.items);

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
		//this.subs.unsubscribe();
	}
	
	ngOnInit(): void {

	}

	ngAfterViewInit() {
		//if (this.element.nativeElement.attributes.childToMaster == 'Desktop') {
			//console.log('childToMaster = ' + this.element.nativeElement.attributes.childToMaster)
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
	
	//open dir in the finder
	openFinder(e: MouseEvent, id: String, name: String, item: any) {
		e.preventDefault();
		
		//if finder is not opened
		if(!this.modService.isModalExists('finder')){

			//console.log(item);
			
			// set store finder
			let breadcrumbs : any  = [];
			breadcrumbs.push({name: 'Desktop', id: item.data.parentId});
			breadcrumbs = [...breadcrumbs];
			breadcrumbs.push({name: item.data.dirName, id: item.data.id});

			//console.log(breadcrumbs);
			
			//set store for finder
			const finder: { currentDir: any, currentDirId: any, breadcrumbs: any, items: number, selectedItems: number } = {
				currentDir : item.data.dirName,
				currentDirId : item.data.id,
				breadcrumbs: breadcrumbs,
				items: 0,
				selectedItems: 0
				}

			// add to the store
			this.store.dispatch( AddFinder(finder));
			
			// open dir in the finder
			this.modService.setRootViewContainerRef(this.viewContainerRef);
			this.modService.addDynamicComponent(id.toString(), name.toString());
		}
	}

}
