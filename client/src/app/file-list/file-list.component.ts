import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Globals } from '../global';
import { DragulaService } from 'ng2-dragula';
import { FileService } from './services/file.service';
import { loadFiles } from '../desktop/store/actions/file.actions';
import { FileState } from '../desktop/store/models/file.state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.sass']
})
export class FileListComponent implements OnInit, OnDestroy {

	@ViewChild('container') input: ElementRef | undefined;
	files: any;
	//files$: Observable<File[]> = this.store.select(state => state);

	currentFolder: String;

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

	@Input() showFolder: { path: string; } | undefined;

	constructor(
		public globals: Globals,
		private dragulaService: DragulaService,
		private element: ElementRef,
		private fileService: FileService,
		private store: Store<FileState>,
	) {
		//by default is 'Desktop'
		this.currentFolder = this.globals.currentDesktopFolder;
		this.files = [];
	}


	ngOnInit(): void {

		if (this.showFolder?.path) {
			console.log('change paths from default ')
			console.log('from Desktop to ' + this.showFolder.path)
			const path = this.showFolder.path;
		}

		//subscribe on events for store 'files'
		this.store.select('files').subscribe((data: any) => {
			//console.log(data.files)
			//add list of files to the template
			this.files = data.files
		})

		//start reducer for loading files
		this.store.dispatch(loadFiles())

	}

	ngOnDestroy() {

	}

	ngAfterViewInit() {

		if (this.element.nativeElement.attributes.childToMaster == 'Desktop') {
			console.log('childToMaster = ' + this.element.nativeElement.attributes.childToMaster)
		}
	}



}
