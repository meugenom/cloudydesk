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
import { Dir } from '../desktop/store/models/dir.model';
import { Subscription } from 'rxjs';
import { FileService } from '../services/file.service';
import { loadFiles } from '../desktop/store/actions/file.actions';

@Component({
	selector: 'app-finder-file-list',
	templateUrl: './finder-file-list.component.html',
	styleUrls: ['./finder-file-list.component.sass']
})

export class FinderFileListComponent implements DoCheck {

	@ViewChild('container') input: ElementRef | undefined;

	// declare for dragula service
	BAG = "DRAGULA_FILE_LIST";
	subs = new Subscription();

	allFiles: any;
	files: any
	dirs: Dir | undefined;

	currentFolderDir: String | undefined;
	currentFolderId: String | undefined;

	//input props for file-list component
	@Input() showFolderPath: string | undefined;
	@Input() showFolderId: string | undefined;

	// set input props for file-list component
	@Input() style: string | undefined;

	constructor(
		private dragulaService: DragulaService,
		private element: ElementRef,
		private store: Store<{ files: FileState, dirs: DirState }>,
		private http: HttpClient,
		private fileService: FileService
	) {
		//by default is 'Desktop'
		this.currentFolderDir = 'Desktop';
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
				if (dir.data.dirName == this.currentFolderDir) {
					dirId = dir.data.id;
					this.showFolderId = dir.data.id;
				}
			});

			this.allFiles = data.files;
			this.files = data.files.filter((file: any) => file.dirId == dirId);

		})


		this.subs.add(dragulaService.out(this.BAG)
			.subscribe(({ el, container, source }) => {
				if (
					this.currentFolderId != container.getAttribute('showFolderId') &&
					container.getAttribute('showFolderId') != null &&
					el.children[0].getAttribute('data-dirId') != container.getAttribute('showFolderId')

				) {
					//console.log('out to ', container.getAttribute('showFolderPath'));
					//console.log('out to ', container.getAttribute('showFolderId'));
					//console.log(el.children[0].getAttribute('data-id'));
					//console.log(el.children[0].getAttribute('data-name'));

					//call api to edit file settings
					let fileId = el.children[0].getAttribute('data-id');
					let dirId = container.getAttribute('showFolderId');
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
								console.log('test');
								this.fileService.putFile(payload).subscribe((data: any) => {

								console.log(data);

								//need update store files
								this.fileService.ls("").subscribe((data: any) => {
									//need call action to update store files
									this.store.dispatch(loadFiles());
								});
							});

							}
						}
					};

				} else (
					el.children[0].getAttribute('data-dirId') == container.getAttribute('showFolderId'))
				{
					//need delete this moving visual effect
					source.appendChild(el);
				}
			})
		);

	}

	ngDoCheck() {
		if (this.showFolderPath != this.currentFolderDir) {
			this.currentFolderId = this.showFolderId;
			this.currentFolderDir = this.showFolderPath!;

			let dirId: null = null;
			this.dirs?.children?.forEach((dir: any) => {
				//console.log(dir.data.dirName);
				if (dir.data.dirName == this.currentFolderDir) {
					dirId = dir.data.id;
					this.showFolderId = dir.data.id;
				}
			});
			//console.log('dirId = ' + dirId);

			//need rerender files list where file.dirId == dirId
			this.files = this.allFiles.filter((file: any) => file.dirId == dirId);
		}
	}

	getItem(event: any, file: any) {
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
