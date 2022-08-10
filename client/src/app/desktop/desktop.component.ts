import { AfterViewInit, Component, HostListener, OnInit, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import SelectionArea from "@viselect/vanilla";
import { Globals } from '../global';
import { ModService } from '../shared/mod.service';

@Component({
	selector: 'app-desktop',
	providers: [Globals],
	templateUrl: './desktop.component.html',
	styleUrls: ['./desktop.component.sass'],
})
export class DesktopComponent implements AfterViewInit {

	fullScreen: boolean;
	@ViewChild('container') input: ElementRef | undefined;

	constructor(
		private renderer: Renderer2,
		private modService: ModService,
		private viewContainerRef: ViewContainerRef,
		public globals: Globals) {

		this.fullScreen = this.globals.fullScreen;
	}


	//begin select cells
	ngAfterViewInit() {
		
		//viselect
		const selection = new SelectionArea({
			selectables: [".item-container > div"],
			boundaries: [".item-container"]

		})
			.on("start", ({ store, event,selection }) => {
				event?.stopPropagation();
				console.log(event)
				if (!(event as MouseEvent).ctrlKey && !(event as MouseEvent).metaKey) {
					for (const el of store.stored) {
						el.classList.remove("selected");

						//console.log(el.children[1].attributes[2])
						el.children[1].attributes[2].value = " drop-shadow(1px 1px 1px rgba(102, 102, 102, 0.5))"
						
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
							
							//cancel selecton when we drag-drop files
							//console.log(el.attributes)
							//.selection-area
  							//	background-color: #afafaf36
  							//	border: 1px solid #ccc							

							if(el.attributes[12].value){
								
								//selection.getSelectionArea().style.backgroundColor = 'rgba(243, 156, 18, 0.2)'
								//selection.getSelectionArea().style.border = '0px solid #ccc'

							}else{

								//selection.getSelectionArea().style.backgroundColor = '#afafaf36'
								//selection.getSelectionArea().style.border = '1px solid #ccc'
							}

							el.classList.add("selected");
							el.children[1].attributes[2].value = "background-color: #cdcdcd30; border-radius: 3px ; filter: drop-shadow(0 0 1px rgba(102, 102, 102, 1))"

						}
	
						for (const el of removed) {

							el.classList.remove("selected");
							el.children[1].attributes[2].value = " drop-shadow(1px 1px 1px rgba(102, 102, 102, 0.5))"
						}
					
			
				}
			)
			.on("stop", ({ store: { stored } }) => console.log(stored.length));
	}


	openMod(e: MouseEvent, modTitle: String, modText: String) {
		e.preventDefault();
		this.modService.setRootViewContainerRef(this.viewContainerRef);
		this.modService.addDynamicComponent(modTitle.toString(), modText.toString());
	}


}

