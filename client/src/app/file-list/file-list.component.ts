import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Globals } from '../global';
import { DragulaService } from 'ng2-dragula';
import {AuthService} from '../auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.sass']
})
export class FileListComponent implements OnInit, OnDestroy {

	@ViewChild('container') input: ElementRef | undefined;

	files: any[]
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
		private authService: AuthService,
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

	}

	ngOnDestroy() {

	}

	ngAfterViewInit() {

		if (this.element.nativeElement.attributes.childToMaster == 'Desktop') {
			console.log('childToMaster = ' + this.element.nativeElement.attributes.childToMaster)
		}


		this.authService.ls().subscribe(data=>{
			const arr = data.files;
			arr.forEach((elem: any) => {
				//console.log(JSON.stringify(elem))
			});

			this.files = data.files;
		});

	}



}
