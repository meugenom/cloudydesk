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
import { DirService } from '../services/dir.service';
import { clone, cloneDeep } from 'lodash';

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
		private fileService: FileService,
		private dirService: DirService
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
						if(currentDir.data.dirName != '/'){
							this.dirs = currentDir.children;
						}						
					}else{
						this.dirs = [];
					}
				}

				//add editable prop to files uses lodash clone
				this.files = this.files.map((file: any) => {
					const newFile = clone(file);
					newFile.editable = false;
					return newFile;
				  });

				//add editable prop to dirs uses lodash clone
				this.dirs = this.dirs.map((dir: any) => {
					const newDir = cloneDeep(dir);
					newDir.data.editable = false;
					return newDir;
				});

				

				console.log(this.dirs)

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
				if(currentDir.children.length != 0 || currentDir.data.dirName != '/'){
					this.dirs = currentDir.children;
				}
			}

				//add editable prop to files uses lodash clone
				if(this.files.length != 0){
					this.files = this.files.map((file: any) => {
						const newFile = clone(file);
						newFile.editable = false;
						return newFile;
					  });
	
				}

				//add editable prop to dirs uses lodash clone								
				if(this.dirs.length != 0){
					console.log('dirs',this.dirs)
					this.dirs = this.dirs.map((dir: any) => {
						const newDir = cloneDeep(dir);
						newDir.data.editable = false;
						return newDir;
					});
				}
				console.log(this.dirs)

			
			//need merge files and dirs to items list
			this.items = this.files;
			this.items = this.items.concat(this.dirs);
			
		})

		/**
		 * subscribe on dragula events when file is moved or directory is moved
		 */
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

					console.log('file or dir: ', el.children[0].getAttribute('data-isDirectory'));
					console.log(el.children[0]);

					//call api to edit file settings
					let fileId = el.children[0].getAttribute('data-id');
					let dirId = container.getAttribute('dirId');
					
					//need to know file or dir what we move 
						//file
						//console.log(fileId);
						//console.log(this.allFiles)

					if(el.children[0].getAttribute('data-isDirectory')== 'false'){

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

								
								this.fileService.updateFile(payload).subscribe((data: any) => {
									// when success
									
									this.fileService.ls("").subscribe((res: any) => {                                        										
										console.log(res);
										//add to the store files and dirs
										//this.store.dispatch(setFiles(res));										
										this.store.dispatch(loadFiles());
										//next for store files
										
										
									}, (error) => {
										console.error('Error listing files and dirs: ', error);
									});
									

	  
								}, (error) => {
									// when error
									console.error('Error updating file:', error);
								});		

							}
						}
					};
					
				} else {
					//dir move to another dir

					console.log(el.children[0]);					

					const folderName = el.children[0].getAttribute('data-name');
					const currentDirId = el.children[0].getAttribute('data-id');
					const payload = {
						id: currentDirId?.toString(),
						dirName: folderName,
						parentId: dirId?.toString()
					}

					this.dirService.updateDir(payload).subscribe((data: any) => {
						// when success
						
						this.fileService.ls("").subscribe((res: any) => {                                        																								
							this.store.dispatch(loadFiles());							
						}, (error) => {
							console.error('Error listing dirs and files:', error);
						});
						
					}, (error) => {
						// when error
						console.error('Error updating dir:', error);
					});


				}
				

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

	saveDirChanges(item: any) {
		item.data.editable = false;
		//console.log('save changes');
		//console.log(item);
		
		let newName = item.data.dirName;		

		//if name is empty
		if(newName.length == 0){
			newName = 'New Folder';
		}

		//remove from the name all symbols sql injection and html injection and stay - _, space, +, =, ( , )
		newName = newName.replace(/[^a-zA-Z0-9-_+=()., ]/g, '');

		//remove symbols when length > 50
		if(newName.length > 50){
			newName = newName.substring(0, 50);
		}		

		item.data.dirName = newName;
		
		//need to save changes in the store but before need to know similar dir or file and add to the new name (1) or (2) or (3) etc
		const similarItems = this.items.filter((i: any) => i?.data?.dirName == newName);
		//console.log(similarItems);
		if(similarItems.length > 1){
			//need to add (1) or (2) or (3) etc
			const newSimilarName = newName + '(' + similarItems.length + ')';
			console.log(newSimilarName);
			item.data.dirName = newSimilarName;
		}

		//need save changes in the store and in the server
		this.dirService.updateDir(item.data).subscribe((data: any) => {
			//if res is true need to update store
			if(data){				
				//update store and ls
				this.store.dispatch((loadFiles()))				
			}
		});
	}

	saveFileChanges(item: any) {
		let newName = item.name;		

		//if name is empty
		if(newName.length == 0){
			newName = 'New File';
		}

		//remove from the name all symbols sql injection and html injection and stay - _, space, +, =, ( , )
		newName = newName.replace(/[^a-zA-Z0-9-_+=()., ]/g, '');

		//remove symbols when length > 50
		if(newName.length > 50){
			newName = newName.substring(0, 50);
		}		

		item.name = newName;
		
		//need to save changes in the store but before need to know similar dir or file and add to the new name (1) or (2) or (3) etc
		const similarItems = this.items.filter((i: any) => i?.name == newName);
		//console.log(similarItems);
		if(similarItems.length > 1){
			//need to add (1) or (2) or (3) etc
			const newSimilarName = newName + '(' + similarItems.length + ')';
			console.log(newSimilarName);
			item.name = newSimilarName;
		}

		//need save changes in the store and in the server
		this.fileService.updateFile(item).subscribe((data: any) => {
			//if res is true need to update store
			if(data){				
				//update store and ls
				this.store.dispatch((loadFiles()))		
			}
		});
	}

}
