import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import SelectionArea from "@viselect/vanilla";
import { Globals } from '../global';
import { DragulaService } from 'ng2-dragula';

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
		private element: ElementRef
	) {
		//by default is 'Desktop'
		this.currentFolder = this.globals.currentDesktopFolder;
		this.files = this.globals.files[0].Desktop;
	}

	ngOnInit(): void {

		if (this.showFolder?.path) {
			console.log('change paths from default ')
			console.log('from Desktop to ' + this.showFolder.path)
			const path = this.showFolder.path;
			this.files = this.globals.files[0][path];
		}

	}

	ngOnDestroy() {

	}

	//begin select cells
	ngAfterViewInit() {

		if (this.element.nativeElement.attributes.childToMaster == 'Desktop') {
			console.log('childToMaster = ' + this.element.nativeElement.attributes.childToMaster)
		}

		//viselect

		const selection = new SelectionArea({
			selectables: [".item-container > div"],
			boundaries: [".item-container"]

		})
			.on("start", ({ store, event, selection }) => {

				console.log(event)

				if (!(event as MouseEvent).ctrlKey && !(event as MouseEvent).metaKey) {
					for (const el of store.stored) {
						el.classList.remove("selected");

						//console.log(el.children[1].attributes[2])
						//el.children[1].attributes[2].value = " drop-shadow(1px 1px 1px rgba(102, 102, 102, 0.5))"

					}
					selection.clearSelection();
				}
			})
			.on(
				"move",
				({
					store: {
						changed: { added, removed },

					},
					event,
					selection
				}) => {


					for (const el of added) {

						el.classList.add("selected");
						//console.log(el)
						//el.children[1].children[0].attributes[2].value = "background-color: #cdcdcd30; border-radius: 3px ; filter: drop-shadow(0 0 1px rgba(102, 102, 102, 1))"

					}

					for (const el of removed) {

						el.classList.remove("selected");
						//el.children[1].attributes[2].value = " drop-shadow(1px 1px 1px rgba(102, 102, 102, 0.5))"
					}
				}
			)
			.on("stop", ({ store: { stored } }) => console.log(stored.length));

		//this.globals.selection = selection;

	}



}
