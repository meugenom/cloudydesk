import {
	Component, ElementRef, Input, OnInit,
	DoCheck, ViewChild
} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { FileState } from '../desktop/store/models/file.state.model';
import { Store } from '@ngrx/store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from '../../environments/environment';
import { DirState } from '../desktop/store/models/dir.state.model';
import { Subscription, catchError, map, of } from 'rxjs';
import { FileService } from '../services/file.service';
import { loadFiles } from '../desktop/store/actions/file.actions';
import { DirUtils} from '../utils/dir-utils';
import { FinderState } from '../desktop/store/models/finder.state.model';
import { AddFinder } from '../desktop/store/actions/finder.action';

@Component({
	selector: 'app-finder-file-list',
	templateUrl: './finder-file-list.component.html',
	styleUrls: ['./finder-file-list.component.sass']
})

export class FinderFileListComponent {

	@ViewChild('container') input: ElementRef | undefined;

	// declare for dragula service
	BAG = "DRAGULA_FILE_LIST";
	subs = new Subscription();

	allFiles: any[];
	files: any[];
	allDirs: any| null;
	dirs: any | null;

	items: any[];

	currentDir: any | null;
	currentDirId: any | null;
	breadcrumbs: any[] = [];

	// set input props for file-list component
	@Input() style: string | undefined;
	

	constructor(
		private dragulaService: DragulaService,
		private element: ElementRef,
		private store: Store<{ files: FileState, dirs: DirState, finder: FinderState }>,
		private http: HttpClient,
		private fileService: FileService
	) {
		
		this.allFiles = [];
		this.files = [];
		this.allDirs = [];
		this.dirs = [];
		this.items = [];
		this.breadcrumbs = [];

		this.store.select('finder').subscribe((data: any) => {
			
			console.log('finder store call');
			

				this.currentDir = data.currentDir;
				this.currentDirId = data.currentDirId;
				this.breadcrumbs = data.breadcrumbs;
			
				console.log('-------finder store changes------------')
				console.log('files before')
				console.dir(this.files);
				console.log('files after')
			
				//need rerender files list where file.dirId == dirId
				this.files = this.allFiles.filter((file: any) => file.dirId == this.currentDirId);												
				console.dir(this.files);
				console.log('-------------------')

				//need rerender dirs list where dir.parentId == dirId						
				//find dirs by id
				if(this.currentDirId != undefined || this.allDirs != undefined || this,this.currentDirId != null) {				
					const currentDir = DirUtils.getDir(this.allDirs, Number.parseInt(this.currentDirId.toString()));
					console.log(currentDir)
					if(currentDir && currentDir.children && currentDir.children.length != 0){
						this.dirs = currentDir.children;
					}else{
						this.dirs = [];
					}
				}

				//need merge files and dirs to items list
				this.items = this.files;
				this.items = this.items.concat(this.dirs);
			
		});



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

			//let dirId: null = null;
			this.dirs?.children?.forEach((dir: any) => {
				//console.log(dir.data.dirName);
				if (dir.data.dirName == this.currentDir) {
					//dirId = dir.data.id;
					this.currentDirId = dir.data.id;
				}
			});

			this.allFiles = data.files;	
			this.allDirs  = data.dirs;
			
			console.log('-------files store changes------------')
			console.log('files before')
			console.dir(this.files);
			console.log('files after')

			this.files = data.files.filter((file: any) => file.dirId == this.currentDirId);									
			console.dir(this.files);
			console.log('-------------------')			
			
			//find dirs by id
			if(this.currentDirId != undefined) {				
				const currentDir = DirUtils.getDir(this.allDirs, Number.parseInt(this.currentDirId.toString()));
				//console.log(currentDir)
				if(currentDir.children.length != 0){
					this.dirs = currentDir.children;
				}
			}
			
			//need merge files and dirs to items list
			this.items = this.files;
			this.items = this.items.concat(this.dirs);
			
		})

		this.subs.add(dragulaService.out(this.BAG)
			.subscribe(({ el, container, source }) => {

				if (					
					container.getAttribute('dirId') != null &&
					el.children[0].getAttribute('data-dirId') != container.getAttribute('dirId') &&
					source.getAttribute('dirId') != container.getAttribute('dirId')
				) {
					
					//info about file transfer from to
					console.log('from ',source.id)
					console.log('from dirName ', source.getAttribute('dirName'))
					console.log('form dirId ', source.getAttribute('dirId'))
					
					console.log('to ', container.id)
					console.log('to dirName ', container.getAttribute('dirName'))
					console.log('to dirId ', container.getAttribute('dirId'))
					
					console.log(el.children[0].getAttribute('data-id'));
					console.log(el.children[0].getAttribute('data-name'));


					//call api to edit file settings
					let fileId = el.children[0].getAttribute('data-id');
					let dirId = container.getAttribute('dirId');
					
					//console.log(fileId);
					console.log(this.allFiles)

					for (let key in this.allFiles) {
						const file: any = this.allFiles[key];
						if (file.id == fileId) {
							if(file.dirId != dirId && dirId != null) {
								const payload = {
									id: file.id.toString(),
									name: file.name,
									type: file.type,
									size: file.size,
									dirId: dirId.toString(),
									createdUserId: file.createdUserId.toString(),
									modifiedUserId: file.modifiedUserId.toString(),
									createdDate: file.createdDate,
									modifiedDate: file.modifiedDate
								}								

								
								this.fileService.putFile(payload).subscribe((data: any) => {
									// when success
									
									this.fileService.ls("").subscribe((res: any) => {                                        										
										console.log(res);
										//add to the store files and dirs
										//this.store.dispatch(setFiles(res));										
										this.store.dispatch(loadFiles());
										//next for store files
										
										
									}, (error) => {
										console.error('Error listing files:', error);
									});
									

	  
								}, (error) => {
									// when error
									console.error('Error updating file:', error);
								});																
								

							}
						}
					};

				} else (
					source.getAttribute('dirId') === container.getAttribute('dirId')
					)
				{									
									
					//need delete this moving visual effect
					source.appendChild(el);
					//container.removeChild(el);
					
					

				}
				
			})
		);

	}
	ngOnDestroy() {
		// destroy dragula subscription
		this.subs.unsubscribe();
	}

	//when click on dir in the list, need change currentFolderDir and open new file list
	//save old dir in the linked list for bread crumbs
	openDir(event: any, dir: any) {
		
		this.currentDir = dir.data.dirName;
		this.currentDirId = dir.data.id;

		console.log(this.breadcrumbs);
		this.breadcrumbs = [...this.breadcrumbs];
		this.breadcrumbs.push({name: dir.data.dirName, id: dir.data.id});
		console.log(this.breadcrumbs);
		

		this.files = this.allFiles.filter((file: any) => file.dirId == dir.data.id);

		//find dirs by id
		if (dir && dir.data && dir.data.id != undefined) {
			const currentDir = DirUtils.getDir(this.allDirs, dir.data.id);
			//console.log(currentDir);
			if(currentDir && currentDir.children && currentDir.children.length != 0){
				this.dirs = currentDir.children;
			}else{
				this.dirs = [];
			}
		}
		//console.log(this.dirs)

		//set store for finder
		const finder: { currentDir: any, 
						currentDirId: any, 
						breadcrumbs: any,
						items: number,
						selectedItems: number
					} = {
            currentDir : this.currentDir,
			currentDirId : this.currentDirId,
			breadcrumbs: this.breadcrumbs,
			items: this.files?.length + this.dirs?.length,
			selectedItems: 0
          }
  
      	// add to the store
      	this.store.dispatch( AddFinder(finder));
	}

	getItem(event: any, file: any) {


		this.http.get(`${environment.apiUrl}/api/v1/files/downloadFile/${file.id}`, { responseType: 'blob' })
			.subscribe(
				(response) => {
					const blob = new Blob([response], { type: 'application/octet-stream' });
					saveAs(blob, file.name);
				}
			)
	}

}
