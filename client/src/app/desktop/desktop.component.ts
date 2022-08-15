import { Component, HostListener, OnInit, ElementRef, Renderer2, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import SelectionArea from "@viselect/vanilla";
import { Globals } from '../global';
import { ModService } from '../mod/mod.service';

@Component({
	selector: 'app-desktop',
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.sass'],
})
export class DesktopComponent {

	fullScreen: boolean;
	showFolder: any = { path: 'Desktop' }
	@ViewChild('container') input: ElementRef | undefined;
	dragDrop: boolean = false;

	constructor(
		private modService: ModService,
		private viewContainerRef: ViewContainerRef,
		private globals: Globals,
		private element: ElementRef
	) {

		this.fullScreen = this.globals.fullScreen;
	}

	getFullScreen() {
		this.fullScreen = this.globals.fullScreen
	}

	//for modal windows
	openMod(e: MouseEvent, id: String, name: String) {
		e.preventDefault();
		this.modService.setRootViewContainerRef(this.viewContainerRef);
		this.modService.addDynamicComponent(id.toString(), name.toString());
	}

	//begin select cells
	ngAfterViewInit() {

		//viselect

		const selection = new SelectionArea({
			selectables: [".item-container > div"],
			boundaries: [".item-container"]

		}).on("beforestart", ({ store: { stored }, event, selection }) => {

			//if we need stop to move select area
			//console.log('before start')
			
			// in js we have event.target.tagName 
			//but ts needs default handler, so !important
			if (event != null) {
				if (event.target instanceof Element) { 
					
					//console.log(event.target.classList)
					
					if(event.target.classList.contains('item-icon-icon') || 
					event.target.classList.contains('item-badges') ||
					event.target.classList.contains('item-name')
					){
						this.dragDrop = true;
					}else{
						this.dragDrop = false;
					}
				}
			}

		})
			.on("start", ({ store, event, selection }) => {

				//hardcore
				if (this.dragDrop == true) {
					selection.cancel()
				}

				//console.log(event)
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
					
					//hardcore
					if (this.dragDrop == true) {
						selection.cancel()
					}

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
			.on("stop", ({ store: { stored } }) => {
				console.log('stored length = ' + stored.length);
			});

		//this.globals.selection = selection;

	}


}

